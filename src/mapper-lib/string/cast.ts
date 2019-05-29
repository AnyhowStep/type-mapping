import {cast} from "../operator";
import {finiteNumber, integer, unsignedInteger} from "../number";
import {finiteNumberString, integerString, unsignedIntegerString} from "./number-string";
import {ExpectedInput} from "../../mapper/expected-input";
import {MappableInput} from "../../mapper/mappable-input";
import {SafeMapper} from "../../mapper/safe-mapper";
import {toTypeStr} from "../../type-util";

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
                throw new Error(`${name} is invalid JSON Object string`);
            }

            try {
                JSON.parse(mixed);
            } catch (err) {
                throw new Error(`${name} is invalid JSON Object string; ${err.message}`);
            }

            return mixed;
        }

        try {
            const str : string|undefined = JSON.stringify(mixed);
            if (typeof str == "string" && str[0] == "{") {
                return str;
            }
            throw new Error(`${name} is invalid JSON Object; received ${toTypeStr(mixed)}`);
        } catch (err) {
            throw new Error(`${name} is invalid JSON Object; ${err.message}`);
        }
    };
}