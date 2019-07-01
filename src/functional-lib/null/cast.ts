import {SafeMapper} from "../../mapper";
import {toTypeStr} from "../../type-util";
import {MappableInput} from "../../mapper";
import {ExpectedInput} from "../../mapper";
import {cast} from "../operator";
import {literal} from "../literal";
import {null as nil} from "./null";
import {match} from "../string";
import {makeMappingError} from "../../error-util";

export function undefinedToNull () : (
    & SafeMapper<null>
    & ExpectedInput<null>
    & MappableInput<null|undefined>
) {
    return (name : string, mixed : unknown) : null => {
        //We do not mind === here.
        if (mixed === undefined || mixed === null) {
            return null;
        }
        throw makeMappingError({
            message : `${name} must be null|undefined; received ${toTypeStr(mixed)}`,
            inputName : name,
            actualValue : mixed,
            expected : "null|undefined",
        });
    };
}

export function emptyStringToNull () {
    return cast(
        literal(""),
        () => null,
        nil()
    );
}

/**
    An empty string, or a string of only whitespace
*/
export function whitespaceStringToNull () {
    return cast(
        match(/^\s*$/, name => {
            return {
                message : `${name} must be a whitespace string`,
                expected : `whitespace string`,
            };
        }),
        () => null,
        nil()
    );
}