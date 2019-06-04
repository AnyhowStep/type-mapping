import {isInstanceOf} from "./is-instance-of";

/**
    Abbreviation for "Plain old JavasScript object".

    Meaning, an Object that isn't,

    + Date
    + Array
    + Function
    + An instance of some other class

    -----

    Will never consider a BigInt polyfill object a Pojo
*/
export function isPojo (mixed : unknown) : mixed is { [k : string]  : unknown} {
    if (!isInstanceOf(mixed, Object)) {
        return false;
    }
    if (Object.getPrototypeOf(mixed) !== Object.prototype) {
        return false;
    }
    return true;
}