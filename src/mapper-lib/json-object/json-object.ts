import {SafeMapper} from "../../mapper";
import {toTypeStr} from "../../type-util";

/**
    Calls `JSON.stringify()` and `JSON.parse()` once.
*/
export function jsonObject () : SafeMapper<{ [k : string] : unknown }> {
    return (name : string, mixed : unknown) : { [k : string] : unknown } => {
        try {
            const str : string|undefined = JSON.stringify(mixed);
            if (typeof str == "string" && str[0] == "{") {
                return JSON.parse(str);
            }
            throw new Error(`${name} must be JSON Object; received ${toTypeStr(mixed)}`);
        } catch (err) {
            throw new Error(`${name} must be JSON Object; ${err.message}`);
        }
    };
}