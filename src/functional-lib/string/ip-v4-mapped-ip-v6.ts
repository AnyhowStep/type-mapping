import {pipe} from "../operator";
import {string} from "./string";
import {ipV4String} from "./ip-v4";
import {ipV6StringWithMaxSegmentCount} from "./ip-v6";
import {stringEndsWith} from "../../string-util";
import {SafeMapper} from "../../mapper";
import {makeMappingError} from "../../error-util";

export function ipV4MappedIpV6String () : SafeMapper<string> {
    const ipV4StringDelegate = ipV4String();
    const ipV6PartDelegate = ipV6StringWithMaxSegmentCount(6);
    return pipe(
        string(),
        (name : string, str : string) : string => {
            const ipV4Start = str.lastIndexOf(":");
            if (ipV4Start < 0) {
                throw makeMappingError({
                    message : `Expected ${name} to have ':' symbol`,
                    inputName : name,
                    actualValue : str,
                    expected : `IPv4-mapped IPv6 string with ':' symbol`,
                });
            }
            const rawIpV4 = str.substr(ipV4Start+1);
            //Must have [1, 6] segments
            //Note : If input ends with "::", rawIpV6 becomes ":"
            const rawIpV6 = str.substr(0, ipV4Start);
            if (rawIpV6.length == 0) {
                throw makeMappingError({
                    message : `Expected ${name} to have one to six IPv6 segments; found zero`,
                    inputName : name,
                    actualValue : str,
                    expected : `IPv4-mapped IPv6 string with one to six IPv6 segments`,
                });
            }
            const rawIpV6EndsWithDoubleColon = stringEndsWith(rawIpV6, ":");

            const ipV4 = ipV4StringDelegate(`${name}.IPv4Part`, rawIpV4);
            const ipV6 = ipV6PartDelegate(
                `${name}.IPv6Part`,
                rawIpV6EndsWithDoubleColon ?
                    rawIpV6 + ":" :
                    rawIpV6
            );

            if (stringEndsWith(ipV6, "::")) {
                return ipV6 + ipV4;
            } else if (stringEndsWith(ipV6, ":")) {
                return ipV6 + ipV4;
            } else {
                return ipV6 + ":" + ipV4;
            }
        }
    );
}
