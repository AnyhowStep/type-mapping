import {or} from "../operator";
import {ipV4String} from "./ip-v4";
import {ipV6String} from "./ip-v6";
import {ipV4MappedIpV6String} from "./ip-v4-mapped-ip-v6";
import {SafeMapper} from "../../mapper";

export function ipAddressString () : SafeMapper<string> {
    return or(
        ipV4String(),
        ipV6String(),
        ipV4MappedIpV6String()
    );
}