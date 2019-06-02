import {tryGetBigIntFactoryFunction, isBigIntNativelySupported} from "./try-get-bigint-factory-function";
import { isInstanceOfBuffer } from "./buffer-ctor";

function isBigIntNative (x : unknown) : x is bigint {
    return (typeof x == "bigint");
}
function isBigIntPolyfill (x : unknown) : x is bigint {
    if (typeof x == "bigint") {
        return true;
    }
    if (!(x instanceof Object)) {
        //It is a primitive type and not a bigint
        return false;
    }

    if (
        (x instanceof Number) ||
        (x instanceof String) ||
        isInstanceOfBuffer(x)
    ) {
        //Sanity check.
        //These objects are most likely to pass the
        //numeric `.toString()` check below.
        return false;
    }

    if (
        (x instanceof Array) ||
        (x instanceof Date) ||
        (x instanceof Function)
    ) {
        //Sanity check.
        //These objects are commonly used.
        return false;
    }

    const bigIntFactory = tryGetBigIntFactoryFunction();
    if (bigIntFactory == undefined) {
        //No BigInt polyfill detected
        return false;
    }

    if (!bigIntFactory.possiblyInstanceOfBigInt(x)) {
        //Definitely not BigInt polyfilled object
        return false;
    }

    /*
        We now have,

        + An object
        + A BigInt factory
        + The object was possibly created by the BigInt factory
    */

    const xStr = String(x);
    if (!/^\-?\d+$/.test(xStr)) {
        //This object's string representation is not valid.
        return false;
    }

    //High confidence that this is a polyfilled BigInt object
    return true;
}
export function isBigInt (x : unknown) : x is bigint {
    if (isBigIntNativelySupported()) {
        return isBigIntNative(x);
    } else {
        return isBigIntPolyfill(x);
    }
}