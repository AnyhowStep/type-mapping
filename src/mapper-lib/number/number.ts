import {SafeMapper} from "../../mapper";
import {toTypeStr} from "../../type-util";
import {pipe} from "../operator";
import {gtEq} from "./comparison";

//Unsafe because it allows NaN and +/-Infinity
export function unsafeNumber () : SafeMapper<number> {
    return (name : string, mixed : unknown) : number => {
        if (typeof mixed != "number") {
            throw new Error(`${name} must be number; received ${toTypeStr(mixed)}`);
        }
        return mixed;
    };
}

export function finiteNumber () : SafeMapper<number> {
    return pipe(
        unsafeNumber(),
        (name : string, num : number) : number => {
            if (isNaN(num)) {
                throw new Error(`${name} must be finite; received NaN`);
            }
            if (!isFinite(num)) {
                throw new Error(`${name} must be finite; received ${num}`);
            }
            return num;
        }
    );
}

export function integer () : SafeMapper<number> {
    return pipe(
        finiteNumber(),
        (name : string, num : number) : number => {
            if (Math.floor(num) !== num) {
                throw new Error(`${name} must be an integer; received double`);
            }
            return num;
        }
    );
}

/**
    Natural number here is defined as an integer >= 0
*/
export function naturalNumber () : SafeMapper<number> {
    return pipe(
        integer(),
        gtEq(0)
    );
}
