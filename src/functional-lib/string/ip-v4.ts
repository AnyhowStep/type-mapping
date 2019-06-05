import {pipe} from "../operator";
import {stringToUnsignedInteger, ltEq} from "../number";
import {string} from "./string";
import {SafeMapper} from "../../mapper";

/**
    https://en.wikipedia.org/wiki/Dot-decimal_notation

    An octet is 8-bits.
    In decimal, an octet can represent [0, 255].

    IPv4 strings are made of four octets (written in decimal),
    each separated by a period.

    Examples:

    127.0.0.1
    255.255.255.0
    255.255.255.255
*/
export function ipV4OctetString () : SafeMapper<string> {
    return pipe(
        stringToUnsignedInteger(),
        ltEq(255),
        (_name : string, octet : number) : string => {
            return octet.toString();
        }
    );
}
export function ipV4String () : SafeMapper<string> {
    const octetDelegate = ipV4OctetString();
    return pipe(
        string(),
        (name : string, str : string) : string => {
            const rawOctets = str
                .replace(/\s+/g, "")
                .split(".");
            if (rawOctets.length != 4) {
                throw new Error(`${name} must have four octets; found ${rawOctets.length}`);
            }
            return rawOctets
                .map((rawOctet, i) => octetDelegate(
                    `${name} octet${i}`,
                    rawOctet
                ))
                .join(".");
        }
    );
}
