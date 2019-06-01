import {
    SafeMapper,
    ExpectedInput,
    MappableInput
} from "../../mapper";
import {toTypeStr} from "../../type-util";

/**
    Calls `JSON.parse()` once, may call `JSON.stringify()` zero or one times.
*/
export function stringToJsonObject () : (
    & SafeMapper<{ [k: string]: unknown }>
    & ExpectedInput<{ [k: string]: unknown }>
    & MappableInput<
        | string
        | { [k: string]: unknown }
    >
) {
    return (name : string, mixed : unknown) : { [k: string]: unknown } => {
        if (typeof mixed != "string") {
            try {
                const str : string|undefined = JSON.stringify(mixed);
                if (typeof str == "string" && str[0] == "{") {
                    return JSON.parse(str);
                }
                throw new Error(`${name} is invalid JSON Object; received ${toTypeStr(mixed)}`);
            } catch (err) {
                throw new Error(`${name} is invalid JSON Object; ${err.message}`);
            }
        }

        if (!/^\s*\{/.test(mixed)) {
            throw new Error(`${name} is invalid JSON Object string`);
        }

        try {
            return JSON.parse(mixed);
        } catch (err) {
            throw new Error(`${name} is invalid JSON Object string; ${err.message}`);
        }
    };
}