import {pipe} from "../operator";
import {stringLength, hexadecimalString, string} from "./string";
import {SafeMapper} from "../../mapper";
import {arrayFill} from "../../array-util";
import {makeMappingError} from "../../error-util";

/**
    == INPUT ==
    https://tools.ietf.org/html/rfc4291#section-2.2

    Each IPv6 segment is any hexadecimal value between
    0 and ffff.

    Each segment is one to four hexadecimal digits.

    == OUTPUT ==
    https://tools.ietf.org/html/rfc5952#section-4.1
    Leading zeros MUST be suppressed.  For example, 2001:0db8::0001 is
    not acceptable and must be represented as 2001:db8::1.  A single 16-
    bit 0000 field MUST be represented as 0.

    https://tools.ietf.org/html/rfc5952#section-4.3

    The characters "a", "b", "c", "d", "e", and "f" in an IPv6 address
    MUST be represented in lowercase.
*/
export function ipV6SegmentString () : SafeMapper<string> {
    return pipe(
        stringLength({
            min : 1,
            max : 4,
        }),
        hexadecimalString(),
        (_name : string, str : string) : string => {
            if (/^0+$/.test(str)) {
                return "0";
            }

            return str.toLowerCase()
                .replace(/^0+/, "");
        }
    );
}

function consecutiveZeroCount (segments : string[], start : number) : number {
    let count = 0;
    while (segments[start] == "0") {
        ++count;
        ++start;
    }
    return count;
}
function largestConsecutiveZeroCount (segments : string[]) : (
    {
        start  : number,
        count  : number,
        before : string[],
        after  : string[],
    }
) {
    let largestStart = 0;
    let largestCount = 0;

    let curStart = 0;
    while (curStart < segments.length) {
        const curCount = consecutiveZeroCount(segments, curStart);
        if (curCount > largestCount) {
            largestStart = curStart;
            largestCount = curCount;
        }
        ++curStart;
    }

    return {
        start  : largestStart,
        count  : largestCount,
        before : segments.slice(0, largestStart),
        after  : segments.slice(largestStart+largestCount),
    };
}
/**
    https://tools.ietf.org/html/rfc5952#section-4.2.1

    The use of the symbol "::" MUST be used to its maximum capability.
    For example, 2001:db8:0:0:0:0:2:1 must be shortened to 2001:db8::2:1.
    Likewise, 2001:db8::0:1 is not acceptable, because the symbol "::"
    could have been used to produce a shorter representation 2001:db8::1.

    https://tools.ietf.org/html/rfc5952#section-4.2.2

    The symbol "::" MUST NOT be used to shorten just one 16-bit 0 field.
    For example, the representation 2001:db8:0:1:1:1:1:1 is correct, but
    2001:db8::1:1:1:1:1 is not correct.

    https://tools.ietf.org/html/rfc5952#section-4.2.3

    When there is an alternative choice in the placement of a "::", the
    longest run of consecutive 16-bit 0 fields MUST be shortened (i.e.,
    the sequence with three consecutive zero fields is shortened in 2001:
    0:0:1:0:0:0:1).  When the length of the consecutive 16-bit 0 fields
    are equal (i.e., 2001:db8:0:0:1:0:0:1), the first sequence of zero
    bits MUST be shortened.  For example, 2001:db8::1:0:0:1 is correct
    representation.
*/
function toIpV6CanonicalString (segments : string[]) {
    const result = largestConsecutiveZeroCount(segments);
    if (result.count <= 1) {
        return segments.join(":");
    } else {
        return (
            result.before.join(":") +
            "::" +
            result.after.join(":")
        );
    }
}

export function ipV6StringWithMaxSegmentCount (maxSegmentCount : number) : SafeMapper<string> {
    const ipV6SegmentStringDelegate = ipV6SegmentString();
    return pipe(
        string(),
        (name : string, str : string) : string => {
            const consecutiveNonZero = str
                .replace(/\s+/g, "")
                .split("::");
            if (consecutiveNonZero.length == 1) {
                //All non-zeroes
                const rawSegments = consecutiveNonZero[0].split(":");
                if (rawSegments.length != maxSegmentCount) {
                    throw makeMappingError({
                        message : `${name} must have ${maxSegmentCount} segments; found ${rawSegments.length}`,
                        inputName : name,
                        actualValue : str,
                        expected : `${maxSegmentCount} IPv6 segments`,
                    });
                }
                const segments = rawSegments
                    .map((rawSegment, i) => ipV6SegmentStringDelegate(
                        `${name} segment${i}`,
                        rawSegment
                    ));
                return toIpV6CanonicalString(segments);
            } else if (consecutiveNonZero.length == 2) {
                //E.g. ffff:ffff::ffff:ffff:ffff
                const rawSegmentsA = consecutiveNonZero[0].split(":").filter(s => s != "");
                const rawSegmentsB = consecutiveNonZero[1].split(":").filter(s => s != "");
                const rawSegmentCount = rawSegmentsA.length + rawSegmentsB.length;
                if (rawSegmentCount >= maxSegmentCount) {
                    throw makeMappingError({
                        message : `${name} must have up to ${maxSegmentCount-1} segments when '::' symbol is used; found ${rawSegmentCount}`,
                        inputName : name,
                        actualValue : str,
                        expected : `up to ${maxSegmentCount-1} IPv6 segments`,
                    });
                }
                const segmentsA = rawSegmentsA
                    .map((rawSegment, i) => ipV6SegmentStringDelegate(
                        `${name} segment${i}`,
                        rawSegment
                    ));
                const segmentBStart = maxSegmentCount - rawSegmentsB.length;
                const segmentsB = rawSegmentsB
                    .map((rawSegment, i) => ipV6SegmentStringDelegate(
                        `${name} segment${segmentBStart+i}`,
                        rawSegment
                    ));
                const zeroes = arrayFill(
                    Array<string>(maxSegmentCount - rawSegmentCount),
                    "0"
                );
                return toIpV6CanonicalString(
                    segmentsA
                        .concat(zeroes)
                        .concat(segmentsB)
                );
            } else {
                throw makeMappingError({
                    message : `${name} must have zero or one '::' symbol; found ${consecutiveNonZero.length-1} uses`,
                    inputName : name,
                    actualValue : str,
                    expected : `IPv6 string with zero or one '::' symbol`,
                });
            }
        }
    );
}

export function ipV6String () : SafeMapper<string> {
    return ipV6StringWithMaxSegmentCount(8);
}
