import {Primitive} from "../primitive";
import {isBigInt} from "./is-bigint";

export function isPrimitive (x : unknown) : x is Primitive {
    if (x == undefined) {
        return true;
    }
    const t = typeof x;
    if (t != "object" && t != "function") {
        return true;
    }

    return isBigInt(x);
}