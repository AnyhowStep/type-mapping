import {SafeMapper} from "../../mapper";
import {toTypeStr} from "../../type-util";
import {mapper} from "../../mapper";
import {MappableInput} from "../../mapper";
import {ExpectedInput} from "../../mapper";
import {cast} from "../operator";
import {literal} from "../literal";
import {null as nil} from "./null";
import {match} from "../string";

export function undefinedToNull () {
    return mapper<
        SafeMapper<null> &
        ExpectedInput<null> &
        MappableInput<null|undefined>
    >((name : string, mixed : unknown) : null => {
        //We do not mind === here.
        if (mixed === undefined || mixed === null) {
            return null;
        }
        throw new Error(`${name} must be null|undefined; received ${toTypeStr(mixed)}`);
    });
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
        match(/^\s*$/, name => `${name} must be a whitespace string`),
        () => null,
        nil()
    );
}