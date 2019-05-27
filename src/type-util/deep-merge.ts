import {toTypeStr} from "./to-type-str";
import {strictEqual} from "./strict-equal";
import {isPrimitive} from "util";

function deepMergeImpl (a : any, b : any) : unknown {
    if (strictEqual(a, b)) {
        return a;
    }
    if (isPrimitive(a) || isPrimitive(b)) {
        throw new Error(`Cannot merge ${toTypeStr(a)} and ${toTypeStr(b)}; they are not equal`);
    }

    //We should have object types now.

    if ((typeof a == "function") || (typeof b == "function")) {
        throw new Error(`Cannot merge ${toTypeStr(a)} and ${toTypeStr(b)}; they are not equal`);
    }

    if ((a instanceof Date) || (b instanceof Date)) {
        if (!(a instanceof Date)) {
            throw new Error(`Cannot merge ${toTypeStr(a)} with Date`);
        }
        if (!(b instanceof Date)) {
            throw new Error(`Cannot merge Date with ${toTypeStr(b)}`);
        }
        if (a.getTime() === b.getTime()) {
            return a;
        } else {
            throw new Error(`Cannot merge dates; they must have the same value`);
        }
    }

    if ((a instanceof Array) || (b instanceof Array)) {
        if (!(a instanceof Array)) {
            throw new Error(`Cannot merge ${toTypeStr(a)} with array`);
        }
        if (!(b instanceof Array)) {
            throw new Error(`Cannot merge array with ${toTypeStr(b)}`);
        }
        if (a.length != b.length) {
            throw new Error(`Cannot merge arrays of different lengths`);
        }
        const newArray : any[] = [];
        for (let i=0; i<a.length; ++i) {
            newArray.push(deepMergeImpl(a[i], b[i]));
        }
        return newArray;
    }

    const aKeys = Object.keys(a);
    const bKeys = Object.keys(b);
    const mergedKeys : { [key : string] : true|undefined } = {};

    const result : any = {};

    for (const key of aKeys) {
        //We can skip a.hasOwnProperty() because Object.keys() ignores parent prototype
        if (mergedKeys[key] === true) {
            continue;
        }
        mergedKeys[key] = true;

        if (b.hasOwnProperty(key)) {
            result[key] = deepMergeImpl(a[key], b[key]);
        } else {
            result[key] = a[key];
        }
    }
    for (const key of bKeys) {
        //We can skip b.hasOwnProperty() because Object.keys() ignores parent prototype
        if (mergedKeys[key] === true) {
            continue;
        }
        mergedKeys[key] = true;

        if (a.hasOwnProperty(key)) {
            result[key] = deepMergeImpl(a[key], b[key]);
        } else {
            result[key] = b[key];
        }
    }

    return result;
}

export function deepMerge (...args : unknown[]) : unknown {
    if (args.length == 0) {
        throw new Error(`Cannot merge zero arguments`);
    }
    let result = args[0];
    for (let i=1; i<args.length; ++i) {
        result = deepMergeImpl(result, args[i]);
    }
    return result;
}