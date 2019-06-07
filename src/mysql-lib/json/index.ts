import {SafeMapper} from "../../mapper";
import {FluentMapper} from "../../fluent-mapper";
import {
    stringLength,
    integer,
    pipe,
    range,
} from "../../fluent-lib";
import {jsonObjectString} from "../../functional-lib";

function jsonDelegate (
    dataTypeStr : string,
    maxLength : number,
    defaultDesiredLengthMax : number,
) : {
    (desiredLengthMin : number, desiredLengthMax : number) : FluentMapper<SafeMapper<string>>,
    (desiredLengthMax : number) : FluentMapper<SafeMapper<string>>,
    () : FluentMapper<SafeMapper<string>>,
    maxLength : number,
} {
    if (maxLength < defaultDesiredLengthMax) {
        throw new Error(`maxLength must be >= defaultDesiredLengthMax`);
    }
    const result = (a? : number, b? : number) => {
        if (a == undefined) {
            return stringLength({
                max : defaultDesiredLengthMax,
            }).pipe(
                jsonObjectString()
            );
        } else if (b == undefined) {
            a = pipe(
                integer(),
                range({
                    gtEq : 1,
                    ltEq : maxLength,
                })
            )(`${dataTypeStr}.desiredLengthMax`, a);
            return stringLength({
                max : a,
            }).pipe(
                jsonObjectString()
            );
        } else {
            a = pipe(
                integer(),
                range({
                    gtEq : 0,
                    ltEq : maxLength,
                })
            )(`${dataTypeStr}.desiredLengthMin`, a);
            b = pipe(
                integer(),
                range({
                    gtEq : 1,
                    ltEq : maxLength,
                })
            )(`${dataTypeStr}.desiredLengthMax`, b);
            if (a > b) {
                throw new Error(`${dataTypeStr} minLength must be <= maxLength`);
            }
            return stringLength({
                min : a,
                max : b,
            }).pipe(
                jsonObjectString()
            );
        }
    };
    result.maxLength = maxLength;
    return result;
}

/*
    The space required to store a JSON document is roughly
    the same as for LONGBLOB or LONGTEXT.

    In addition, MySQL imposes a limit on the size of any JSON
    document stored in a JSON column such that it cannot be any
    larger than the value of max_allowed_packet.

    The default for max_allowed_packet is 4194304, 4MB.

    The maximum is 1073741824, 1GB.

    The value should be a multiple of 1024;
    nonmultiples are rounded down to the nearest multiple.

    -----

    I set the default to 1MB arbitrarily.
*/
export const json = jsonDelegate("JSON", 4294967295, 1048576);