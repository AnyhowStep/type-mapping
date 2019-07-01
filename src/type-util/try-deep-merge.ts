import {toTypeStr} from "./to-type-str";
import {strictEqual} from "./strict-equal";
import {isPrimitive} from "./is-primitive";

type TryDeepMergeImplResult = (
    | {
        success : true,
        value : unknown,
    }
    | {
        success : false,
        path : readonly string[],
        aValue : unknown,
        bValue : unknown,
        message : string,
        //The type of `aValue`
        expected : string,
        //Synonym for `bValue`
        actualValue : unknown,
    }
);

function tryDeepMergeImpl (path : readonly string[], a : any, b : any) : TryDeepMergeImplResult {
    if (strictEqual(a, b)) {
        return {
            success : true,
            value : a,
        };
    }
    if (isPrimitive(a) || isPrimitive(b)) {
        return {
            success : false,
            path,
            aValue : a,
            bValue : b,
            message : `Cannot merge ${toTypeStr(a)} and ${toTypeStr(b)}; they are not equal`,
            expected : toTypeStr(a),
            actualValue : b,
        };
    }

    //We should have object types now.

    if ((typeof a == "function") || (typeof b == "function")) {
        return {
            success : false,
            path,
            aValue : a,
            bValue : b,
            message : `Cannot merge ${toTypeStr(a)} and ${toTypeStr(b)}; they are not equal`,
            expected : toTypeStr(a),
            actualValue : b,
        };
    }

    if ((a instanceof Date) || (b instanceof Date)) {
        if (!(a instanceof Date)) {
            return {
                success : false,
                path,
                aValue : a,
                bValue : b,
                message : `Cannot merge ${toTypeStr(a)} with Date`,
                expected : toTypeStr(a),
                actualValue : b,
            };
        }
        if (!(b instanceof Date)) {
            return {
                success : false,
                path,
                aValue : a,
                bValue : b,
                message : `Cannot merge Date with ${toTypeStr(b)}`,
                expected : toTypeStr(a),
                actualValue : b,
            };
        }
        if (a.getTime() === b.getTime()) {
            return {
                success : true,
                value : a,
            };
        } else {
            return {
                success : false,
                path,
                aValue : a,
                bValue : b,
                message : `Cannot merge dates; they must have the same value`,
                expected : toTypeStr(a),
                actualValue : b,
            };
        }
    }

    if ((a instanceof Array) || (b instanceof Array)) {
        if (!(a instanceof Array)) {
            return {
                success : false,
                path,
                aValue : a,
                bValue : b,
                message : `Cannot merge ${toTypeStr(a)} with array`,
                expected : toTypeStr(a),
                actualValue : b,
            };
        }
        if (!(b instanceof Array)) {
            return {
                success : false,
                path,
                aValue : a,
                bValue : b,
                message : `Cannot merge array with ${toTypeStr(b)}`,
                expected : toTypeStr(a),
                actualValue : b,
            };
        }
        if (a.length != b.length) {
            return {
                success : false,
                path,
                aValue : a,
                bValue : b,
                message : `Cannot merge arrays of different lengths`,
                expected : toTypeStr(a),
                actualValue : b,
            };
        }
        const newArray : any[] = [];
        for (let i=0; i<a.length; ++i) {
            const elementResult = tryDeepMergeImpl([...path, i.toString()], a[i], b[i]);
            if (elementResult.success) {
                newArray.push(elementResult.value);
            } else {
                return elementResult;
            }
        }
        return {
            success : true,
            value : newArray
        };
    }

    const aKeys = Object.keys(a);
    const bKeys = Object.keys(b);
    const mergedKeys : { [key : string] : true|undefined } = {};

    const newObj : any = {};

    for (const key of aKeys) {
        //We can skip a.hasOwnProperty() because Object.keys() ignores parent prototype
        if (mergedKeys[key] === true) {
            continue;
        }
        mergedKeys[key] = true;

        //We do not call `b.hasOwnProperty()` directly
        //because if `b = Object.create(null)`,
        //an `Error` will be thrown
        if (Object.prototype.hasOwnProperty.call(b, key)) {
            const valueResult = tryDeepMergeImpl([...path, key], a[key], b[key]);
            if (valueResult.success) {
                newObj[key] = valueResult.value;
            } else {
                return valueResult;
            }
        } else {
            newObj[key] = a[key];
        }
    }
    for (const key of bKeys) {
        //We can skip b.hasOwnProperty() because Object.keys() ignores parent prototype
        if (mergedKeys[key] === true) {
            continue;
        }
        mergedKeys[key] = true;

        //We do not call `a.hasOwnProperty()` directly
        //because if `a = Object.create(null)`,
        //an `Error` will be thrown
        if (Object.prototype.hasOwnProperty.call(a, key)) {
            const valueResult = tryDeepMergeImpl([...path, key], a[key], b[key]);
            if (valueResult.success) {
                newObj[key] = valueResult.value;
            } else {
                return valueResult;
            }
        } else {
            newObj[key] = b[key];
        }
    }

    return {
        success : true,
        value : newObj,
    };
}

export type TryDeepMergeResult = (
    | {
        success : true,
        value : unknown,
    }
    | {
        success : false,
        path : readonly string[],
        aValue : unknown,
        bValue : unknown,
        message : string,
        //The type of `aValue`
        expected : string,
        //Synonym for `bValue`
        actualValue : unknown,

        aRoot : unknown,
        bRoot : unknown,
    }
);

export function tryDeepMerge (...args : unknown[]) : TryDeepMergeResult {
    if (args.length == 0) {
        throw new Error(`Cannot deep merge zero arguments`);
    }
    let result = args[0];
    for (let i=1; i<args.length; ++i) {
        const implResult = tryDeepMergeImpl([], result, args[i])
        if (implResult.success) {
            result = implResult.value;
        } else {
            return {
                ...implResult,
                aRoot : result,
                bRoot : args[i],
            };
        }
    }
    return {
        success : true,
        value : result,
    };
}