import {SafeMapper} from "../../mapper";
import {toTypeStr, toLiteralUnionStr, strictEqual} from "../../type-util";
import {LiteralType} from "../../primitive";
import {makeMappingError} from "../../error-util";

export type LiteralMapper<ArrT extends LiteralType[]> = (
    SafeMapper<ArrT[number]>
);
/**
 * Returns a mapper that validates if the input is an element of `arr`
 *
 * This function throws an error if `arr.length == 0`
 *
 * @param arr
 * @todo Rename this to `unsafeLiteral()`
 * @todo Implement proper `literal()` that requires at least one argument
 *  @see {@link LiteralType}
 */
export function literal<ArrT extends LiteralType[]> (...arr : ArrT) : (
    LiteralMapper<ArrT>
) {
    if (arr.length == 0) {
        throw new Error(`Cannot map zero literals`);
    }
    return (name : string, mixed : unknown) : ArrT[number] => {
        for (const item of arr) {
            if (strictEqual(mixed, item)) {
                return mixed as ArrT[number];
            }
        }
        throw makeMappingError({
            message : `${name} must be ${toLiteralUnionStr(arr)}; received ${toTypeStr(mixed)}`,
            inputName : name,
            actualValue : mixed,
            expected : toLiteralUnionStr(arr),
        });
    };
}
