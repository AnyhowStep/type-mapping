import {
    SafeMapper,
    ExpectedInput,
    MappableInput
} from "../../mapper";
import {toTypeStr, isBigIntNativelySupported, isBigInt} from "../../type-util";
import {makeMappingError} from "../../error-util";

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
                    if (isBigIntNativelySupported() || !isBigInt(mixed)) {
                        return JSON.parse(str);
                    }
                }
                throw makeMappingError({
                    message : `${name} must be JSON Object; received ${toTypeStr(mixed)}`,
                    inputName : name,
                    actualValue : mixed,
                    expected : "JSON Object",
                });
            } catch (err) {
                throw makeMappingError({
                    message : `${name} must be JSON Object; ${err.message}`,
                    inputName : name,
                    actualValue : mixed,
                    expected : "JSON Object",
                });
            }
        }

        if (!/^\s*\{/.test(mixed)) {
            throw makeMappingError({
                message : `${name} must be JSON Object string`,
                inputName : name,
                actualValue : mixed,
                expected : "JSON Object string",
            });
        }

        try {
            return JSON.parse(mixed);
        } catch (err) {
            throw makeMappingError({
                message : `${name} must be valid JSON Object string; ${err.message}`,
                inputName : name,
                actualValue : mixed,
                expected : "valid JSON Object string",
            });
        }
    };
}