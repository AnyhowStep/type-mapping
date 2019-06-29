import {MappingError} from "../mapping-error";

export function isMappingErrorArray (x : unknown) : x is MappingError[] {
    if (!(x instanceof Array)) {
        return false;
    }
    for (const i of x) {
        if (!isMappingError(i)) {
            return false;
        }
    }
    return true;
}
export function isMappingError (x : unknown) : x is MappingError {
    if (!(x instanceof Error)) {
        return false;
    }
    const mixed : (
        & Error
        & { [k in Exclude<keyof MappingError, keyof Error>]? : unknown }
    ) = x;
    if (typeof mixed.inputName != "string") {
        return false;
    }
    if (mixed.expected != undefined && typeof mixed.expected != "string") {
        return false;
    }
    if (
        mixed.propertyErrors != undefined &&
        !isMappingErrorArray(mixed.propertyErrors)
    ) {
        return false;
    }
    if (
        mixed.unionErrors != undefined &&
        !isMappingErrorArray(mixed.unionErrors)
    ) {
        return false;
    }
    if (
        mixed.intersectionErrors != undefined &&
        !isMappingErrorArray(mixed.intersectionErrors)
    ) {
        return false;
    }
    return true;
}