import {SafeMapper} from "../../mapper";
import {toTypeStr} from "../../type-util";
import {MappableInput} from "../../mapper";
import {ExpectedInput} from "../../mapper";
import {cast} from "../operator";
import {literal} from "../literal";
import {undefined as undef} from "./undefined";
import {match} from "../string";

export function nullToUndefined () : (
    & SafeMapper<undefined>
    & ExpectedInput<undefined>
    & MappableInput<null|undefined>
) {
    return (name : string, mixed : unknown) : undefined => {
        //We do not mind === here.
        if (mixed === undefined || mixed === null) {
            return undefined;
        }
        throw new Error(`${name} must be null|undefined; received ${toTypeStr(mixed)}`);
    };
}

export function emptyStringToUndefined () {
    return cast(
        literal(""),
        () => undefined,
        undef()
    );
}

/**
    An empty string, or a string of only whitespace
*/
export function whitespaceStringToUndefined () {
    return cast(
        match(/^\s*$/, name => `${name} must be a whitespace string`),
        () => undefined,
        undef()
    );
}