import {pipe, cache} from "../operator";
import {string} from "./string";
import {ipV4String} from "./ip-v4";
import {ipV6StringWithMaxSegmentCount} from "./ip-v6";
import {stringEndsWith} from "../../string-util";

export function ipV4MappedIpV6String () {
    return pipe(
        string(),
        cache(
            {
                ipV4StringDelegate : ipV4String(),
                ipV6PartDelegate : ipV6StringWithMaxSegmentCount(6),
            },
            (name : string, str : string, { ipV4StringDelegate, ipV6PartDelegate }) : string => {
                const ipV4Start = str.lastIndexOf(":");
                if (ipV4Start < 0) {
                    throw new Error(`Expected ${name} to have ':' symbol`);
                }
                const rawIpV4 = str.substr(ipV4Start+1);
                //Must have [1, 6] segments
                //Note : If input ends with "::", rawIpV6 becomes ":"
                const rawIpV6 = str.substr(0, ipV4Start);
                if (rawIpV6.length == 0) {
                    throw new Error(`Expected ${name} to have one to six IPv6 segments; found zero`);
                }
                const rawIpV6EndsWithDoubleColon = stringEndsWith(rawIpV6, ":");

                const ipV4 = ipV4StringDelegate(`${name} IPv4 part`, rawIpV4);
                const ipV6 = ipV6PartDelegate(
                    `${name} IPv6 part`,
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
        )
    );
}
