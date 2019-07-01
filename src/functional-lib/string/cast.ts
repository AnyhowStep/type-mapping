import {cast} from "../operator";
import {finiteNumber, integer, unsignedInteger} from "../number";
import {finiteNumberString, integerString, unsignedIntegerString} from "./number-string";
import {ExpectedInput} from "../../mapper";
import {MappableInput} from "../../mapper";
import {SafeMapper} from "../../mapper";
import {toTypeStr, isBigIntNativelySupported, isBigInt} from "../../type-util";
import {makeMappingError} from "../../error-util";

export function finiteNumberToFiniteNumberString () {
    return cast(
        finiteNumber(),
        num => num.toString(),
        finiteNumberString()
    );
}

export function integerToIntegerString () {
    return cast(
        integer(),
        num => num.toString(),
        integerString()
    );
}

export function unsignedIntegerToUnsignedIntegerString () {
    return cast(
        unsignedInteger(),
        num => num.toString(),
        unsignedIntegerString()
    );
}

/**
    Calls either `JSON.stringify()` or `JSON.parse()` once.
*/
export function jsonObjectToJsonObjectString () : (
    & SafeMapper<string>
    & ExpectedInput<string>
    & MappableInput<
        | string
        | { [k: string]: unknown }
    >
) {
    return (name : string, mixed : unknown) : string => {
        if (typeof mixed == "string") {
            if (!/^\s*\{/.test(mixed)) {
                throw makeMappingError({
                    message : `${name} must be JSON Object string`,
                    inputName : name,
                    actualValue : mixed,
                    expected : "JSON Object string",
                });
            }

            try {
                JSON.parse(mixed);
            } catch (err) {
                throw makeMappingError({
                    message : `${name} must be valid JSON Object string; ${err.message}`,
                    inputName : name,
                    actualValue : mixed,
                    expected : "valid JSON Object string",
                });
            }

            return mixed;
        }
        try {
            const str : string|undefined = JSON.stringify(mixed);
            if (typeof str == "string" && str[0] == "{") {
                if (isBigIntNativelySupported() || !isBigInt(mixed)) {
                    return str;
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
    };
}