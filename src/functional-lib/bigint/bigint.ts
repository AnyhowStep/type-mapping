import {SafeMapper} from "../../mapper";
import {toTypeStr, isBigInt, getBigIntFactoryFunctionOrError} from "../../type-util";
import {pipe} from "../operator";
import {bigIntGtEq} from "./comparison";
import {makeMappingError} from "../../error-util";
import {ErrorCode} from "../../error-code";

export function bigInt () : SafeMapper<bigint> {
    return (name : string, mixed : unknown) : bigint => {
        if (isBigInt(mixed)) {
            return mixed;
        }
        throw makeMappingError({
            message : `${name} must be bigint; received ${toTypeStr(mixed)}`,
            inputName : name,
            actualValue : mixed,
            expected : "bigint",
            expectedMeta : {
                errorCode : ErrorCode.EXPECTED_TYPE,
            },
        });
    };
}

/**
    bigint >= 0
*/
export function unsignedBigInt () : SafeMapper<bigint> {
    const bigIntFactory = getBigIntFactoryFunctionOrError();
    return pipe(
        bigInt(),
        bigIntGtEq(bigIntFactory(0))
    );
}
