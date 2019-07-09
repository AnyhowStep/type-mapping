import {SafeMapper} from "../../mapper";
import {toTypeStr} from "../../type-util";
import {pipe} from "../operator";
import {gtEq} from "./comparison";
import {makeMappingError} from "../../error-util";
import {ErrorCode} from "../../error-code";

//Unsafe because it allows NaN and +/-Infinity
export function unsafeNumber () : SafeMapper<number> {
    return (name : string, mixed : unknown) : number => {
        if (typeof mixed != "number") {
            throw makeMappingError({
                message : `${name} must be number; received ${toTypeStr(mixed)}`,
                inputName : name,
                actualValue : mixed,
                expected : "number",
                expectedMeta : {
                    errorCode : ErrorCode.EXPECTED_TYPE,
                },
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
                    expectedMeta : {
                        errorCode : ErrorCode.EXPECTED_TYPE,
                    },
                });
            }
            if (!isFinite(num)) {
                throw makeMappingError({
                    message : `${name} must be finite number; received ${num}`,
                    inputName : name,
                    actualValue : num,
                    expected : "finite number",
                    expectedMeta : {
                        errorCode : ErrorCode.EXPECTED_TYPE,
                    },
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
                    expectedMeta : {
                        errorCode : ErrorCode.EXPECTED_TYPE,
                    },
                });
            }
            return num;
        }
    );
}

/**
    An unsigned integer is an integer >= 0
*/
export function unsignedInteger () : SafeMapper<number> {
    return pipe(
        integer(),
        gtEq(0)
    );
}
