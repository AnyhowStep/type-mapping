import {AnyMapper} from "../mapper";

export function isUndefinedMappable (f : AnyMapper) : boolean {
    try {
        f("", undefined);
        return true;
    } catch (_err) {
        return false;
    }
}
export function isNullMappable (f : AnyMapper) : boolean {
    try {
        f("", null);
        return true;
    } catch (_err) {
        return false;
    }
}
export function isMaybeMappable (f : AnyMapper) : boolean {
    try {
        f("", null);
        f("", undefined);
        return true;
    } catch (_err) {
        return false;
    }
}

export function canOutputUndefined (f : AnyMapper) : boolean {
    try {
        /*
            Using idempotent property.

            (f(blah) === undefined) implies (f(undefined) === undefined)
        */
        return (f("", undefined) === undefined);
    } catch (_err) {
        return false;
    }
}
export function canOutputNull (f : AnyMapper) : boolean {
    try {
        /*
            Using idempotent property.

            (f(blah) === null) implies (f(null) === null)
        */
        return (f("", null) === null);
    } catch (_err) {
        return false;
    }
}
export function canOutputMaybe (f : AnyMapper) : boolean {
    try {
        /*
            Using idempotent property.

            (f(blah) === null) implies (f(null) === null)
            (f(blah) === undefined) implies (f(null) === undefined)
        */
        return (
            (f("", null) === null) &&
            (f("", undefined) === undefined)
        );
    } catch (_err) {
        return false;
    }
}