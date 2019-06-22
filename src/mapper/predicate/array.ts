import {AnyMapper} from "../mapper";

export function isEmptyArrayMappable (f : AnyMapper) : boolean {
    try {
        f("", []);
        return true;
    } catch (_err) {
        return false;
    }
}
export function canOutputEmptyArray (f : AnyMapper) : boolean {
    try {
        /*
            Using idempotent property.

            (f(blah) === []) implies (f([]) === [])
        */
        const output = f("", []);
        return (
            (output instanceof Array) &&
            (output.length == 0)
        );
    } catch (_err) {
        return false;
    }
}