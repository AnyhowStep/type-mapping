import {SafeMapper} from "../../mapper";
import {toTypeStr, toLiteralUnionStr, strictEqual} from "../../type-util";
import {LiteralType} from "../../primitive";

export function literal<ArrT extends LiteralType[]> (...arr : ArrT) : (
    SafeMapper<ArrT[number]>
) {
    return (name : string, mixed : unknown) : ArrT[number] => {
        for (const item of arr) {
            if (strictEqual(mixed, item)) {
                return item;
            }
        }
        throw new Error(`${name} must be ${toLiteralUnionStr(arr)}; received ${toTypeStr(mixed)}`);
    };
}
