import {SafeMapper} from "../../mapper";
import {toTypeStr, isBigInt, getBigIntFactoryFunctionOrError} from "../../type-util";
import {pipe} from "../operator";
import {bigIntGtEq} from "./comparison";

export function bigInt () : SafeMapper<bigint> {
    return (name : string, mixed : unknown) : bigint => {
        if (isBigInt(mixed)) {
            return mixed;
        }
        throw new Error(`${name} must be bigint; received ${toTypeStr(mixed)}`);
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
