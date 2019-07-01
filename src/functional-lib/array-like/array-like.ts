import {
    AnySafeMapper,
    SafeMapper,
    OutputOf,
    ExpectedInputOf,
    ExpectedInput,
    MappableInputOf,
    MappableInput,
    ExtractRunTimeModifierOrUnknown,
    copyRunTimeModifier,
} from "../../mapper";
import {pipe} from "../operator";
import {implementsArrayLike} from "./implements-array-like";
import {toPropertyAccess} from "../../string-util";

function copyArrayLike (arr : ArrayLike<any>) {
    const result : any[] = [];

    for (let i=0; i<arr.length; ++i) {
        result.push(arr[i]);
    }

    return result;
}

export type ArrayLikeMapper<
    F extends AnySafeMapper
> = (
    & SafeMapper<ArrayLike<OutputOf<F>>>
    & ExpectedInput<ArrayLike<ExpectedInputOf<F>>>
    & MappableInput<ArrayLike<MappableInputOf<F>>>
    & ExtractRunTimeModifierOrUnknown<F>
);

export function arrayLike<F extends AnySafeMapper> (f : F) : (
    ArrayLikeMapper<F>
) {
    return copyRunTimeModifier(
        f,
        pipe(
            implementsArrayLike(),
            (name : string, mixed : ArrayLike<any>) => {
                let result : {
                    readonly length : number,
                    [index : number] : any,
                } = mixed;
                let isCopy = false;

                for (let i=0; i<mixed.length; ++i) {
                    /**
                     * For now, fail quick for array-likes.
                     *
                     * @todo Should we accumulate errors like in `objectFromMap()`?
                     * The array-like might be too large. How large is too large?
                     * Should we accumulate the first `n` errors before throwing?
                     */
                    const cur = f(`${name}${toPropertyAccess(i)}`, (mixed as any)[i]);
                    //We do not mind === here.
                    //If either is a BigInt polyfill, we are okay with the copy.
                    if (cur === (mixed as any)[i]) {
                        continue
                    }
                    if (!isCopy) {
                        result = copyArrayLike(result);
                        isCopy = true;
                    }
                    result[i] = cur;
                }

                return result;
            }
        )
    );
}