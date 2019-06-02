import {isBigIntNativelySupported} from "./try-get-bigint-factory-function";
import {isBigInt} from "./is-bigint";

/**
    Abbreviation for "Plain old JavasScript object".

    Meaning, an Object that isn't,

    + Date
    + Array
    + Function
    + An instance of some other class
*/
export function isPojo (mixed : unknown) : mixed is { [k : string]  : unknown} {
    if (!(mixed instanceof Object)) {
        return false;
    }
    if (Object.getPrototypeOf(mixed) !== Object.prototype) {
        return false;
    }
    //Support for bigint polyfill
    if (!isBigIntNativelySupported() && isBigInt(mixed)) {
        return false;
    }
    return true;
}