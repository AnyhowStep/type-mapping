import {SafeMapper} from "../../mapper";
import {toTypeStr, toLiteralUnionStr, strictEqual} from "../../type-util";
import {LiteralType} from "../../primitive";
import {makeMappingError} from "../../error-util";

export type UnsafeLiteralMapper<ArrT extends LiteralType[]> = (
    SafeMapper<ArrT[number]>
);
/**
 * Returns a mapper that validates if the input is an element of `arr`
 *
 * This function throws an error if `arr.length == 0`
 *
 * @param arr
 *  @see {@link LiteralType}
 */
export function unsafeLiteral<ArrT extends LiteralType[]> (...arr : ArrT) : (
    UnsafeLiteralMapper<ArrT>
) {
    if (arr.length == 0) {
        throw new Error(`Cannot map zero literals`);
    }
    const expected = toLiteralUnionStr(arr);
    return (name : string, mixed : unknown) : ArrT[number] => {
        for (const item of arr) {
            if (strictEqual(mixed, item)) {
                return mixed as ArrT[number];
            }
        }
        throw makeMappingError({
            message : `${name} must be ${expected}; received ${toTypeStr(mixed)}`,
            inputName : name,
            actualValue : mixed,
            expected,
            expectedMeta : {
                mappableValues : [...arr],
                outputValues : [...arr],
            },
        });
    };
}

export type LiteralMapper<Arg0 extends LiteralType, ArrT extends LiteralType[]> = (
    SafeMapper<Arg0|ArrT[number]>
);
/**
 * Returns a mapper that validates if the input is one of the arguments
 *
 * @param arg0
 * @param arr
 *  @see {@link LiteralType}
 */
export function literal<Arg0 extends LiteralType, ArrT extends LiteralType[]> (arg0 : Arg0, ...arr : ArrT) : (
    LiteralMapper<Arg0, ArrT>
) {
    return unsafeLiteral(arg0, ...arr);
}
