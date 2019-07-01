import {Primitive, LiteralType} from "../primitive";
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
export function isLiteral (x : unknown) : x is LiteralType {
    if (x == undefined) {
        return true;
    }
    const t = typeof x;
    if (t != "object" && t != "function" && t != "symbol") {
        return true;
    }

    return isBigInt(x);
}