import {SafeMapper} from "../../mapper";
import {toTypeStr, toLiteralUnionStr, strictEqual} from "../../type-util";
import {LiteralType} from "../../primitive";

export type LiteralMapper<ArrT extends LiteralType[]> = (
    SafeMapper<ArrT[number]>
);
export function literal<ArrT extends LiteralType[]> (...arr : ArrT) : (
    LiteralMapper<ArrT>
) {
    return (name : string, mixed : unknown) : ArrT[number] => {
        for (const item of arr) {
            if (strictEqual(mixed, item)) {
                return mixed as ArrT[number];
            }
        }
        throw new Error(`${name} must be ${toLiteralUnionStr(arr)}; received ${toTypeStr(mixed)}`);
    };
}
