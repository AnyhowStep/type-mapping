import {getBigIntFactoryFunctionOrError} from "../type-util";
import {JSBI} from "./jsbi";

export function asIntN (n : number, x : bigint) : bigint {
    const BigInt = getBigIntFactoryFunctionOrError();
    return BigInt(
        JSBI.asIntN(
            n,
            JSBI.BigInt(x.toString())
        ).toString()
    );
}