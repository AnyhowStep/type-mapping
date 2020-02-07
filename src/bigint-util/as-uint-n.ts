import {getBigIntFactoryFunctionOrError} from "../type-util";
import {JSBI} from "./jsbi";

export function asUintN (n : number, x : bigint) : bigint {
    const BigInt = getBigIntFactoryFunctionOrError();
    return BigInt(
        JSBI.asUintN(
            n,
            JSBI.BigInt(x.toString())
        ).toString()
    );
}