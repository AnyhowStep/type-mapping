import {LiteralType} from "../primitive";
import {isBigInt} from "./is-bigint";

/**
    Intended to work better than `String(mixed)`.
*/
export function toLiteralStr (mixed : LiteralType) {
    //We do not mind === here.
    if (mixed === null) {
        return "null";
    //We do not mind === here.
    } else if (mixed === undefined) {
        return "undefined";
    } else if (isBigInt(typeof mixed)) {
        return mixed.toString() + "n";
    } else if (typeof mixed == "string") {
        return JSON.stringify(mixed);
    } else {
        return mixed.toString();
    }
}
export function toLiteralUnionStr (arr : any[]) : string {
    return arr
        .map(toLiteralStr)
        .join("|");
}

export function getCtorName (ctor : unknown) : string {
    if (!(ctor instanceof Object)) {
        return "[Not Ctor]";
    }
    const name : unknown = (ctor as any).name;
    if (typeof name == "string") {
        return name;
    }
    return "[Unknown Name]";
}

/**
    Intended to work better than `typeof mixed`.
*/
export function toTypeStr (mixed : unknown) : string {
    //We do not mind === here.
    if (mixed === null) {
        return "null";
    }
    //We do not mind === here.
    if (mixed === undefined) {
        return "undefined"
    }
    const str = (typeof mixed);
    if (str !== "object") {
        return str;
    }
    if (isBigInt(mixed)) {
        return "bigint";
    }
    const prototype = Object.getPrototypeOf(mixed);
    if (prototype == undefined) {
        return "[Unknown Type]";
    }
    const constructor = prototype.constructor;
    if (constructor == undefined) {
        return "[Unknown Prototype]";
    }
    return getCtorName(constructor);
}
