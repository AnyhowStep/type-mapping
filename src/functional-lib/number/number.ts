import {SafeMapper} from "../../mapper";
import {toTypeStr} from "../../type-util";
import {pipe} from "../operator";
import {gtEq} from "./comparison";
import {makeMappingError} from "../../error-util";

//Unsafe because it allows NaN and +/-Infinity
export function unsafeNumber () : SafeMapper<number> {
    return (name : string, mixed : unknown) : number => {
        if (typeof mixed != "number") {
            throw makeMappingError({
                message : `${name} must be number; received ${toTypeStr(mixed)}`,
                inputName : name,
                actualValue : mixed,
                expected : "number",
            });
        }
        return mixed;
    };
}

export function finiteNumber () : SafeMapper<number> {
    return pipe(
        unsafeNumber(),
        (name : string, num : number) : number => {
            if (isNaN(num)) {
                throw makeMappingError({
                    message : `${name} must be finite number; received NaN`,
                    inputName : name,
                    actualValue : num,
                    expected : "finite number",
                });
            }
            if (!isFinite(num)) {
                throw makeMappingError({
                    message : `${name} must be finite number; received ${num}`,
                    inputName : name,
                    actualValue : num,
                    expected : "finite number",
                });
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
                throw makeMappingError({
                    message : `${name} must be integer; received double`,
                    inputName : name,
                    actualValue : num,
                    expected : "integer",
                });
            }
            return num;
        }
    );
}

/**
    Natural number here is defined as an integer >= 0
*/
export function unsignedInteger () : SafeMapper<number> {
    return pipe(
        integer(),
        gtEq(0)
    );
}
