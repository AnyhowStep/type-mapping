import {JSBI} from "./jsbi";

export function toString (x : bigint, radix? : number|undefined) : string {
    return JSBI.BigInt(x.toString()).toString(radix);
}