import {
    SafeMapper,
    AnySafeMapper,
    OutputOf,
    ExpectedInput,
    MappableInput,
    ExpectedInputOf,
    MappableInputOf,
    ExtractRunTimeModifierOrUnknown,
} from "../../../mapper";
import {pipe} from "../../operator";
import {arrayLike} from "../../array-like";

export type ArrayLikeToArrayMapper<
    F extends AnySafeMapper
> = (
    & SafeMapper<OutputOf<F>[]>
    & ExpectedInput<ExpectedInputOf<F>[]>
    & MappableInput<ArrayLike<MappableInputOf<F>>>
    & ExtractRunTimeModifierOrUnknown<F>
);

export function arrayLikeToArray<
    F extends AnySafeMapper
> (
    f : F
) : (
    ArrayLikeToArrayMapper<F>
) {
    return pipe(
        arrayLike(f),
        ((_name : string, arrayLike : ArrayLike<OutputOf<F>>) : OutputOf<F>[number][] => {
            if (arrayLike instanceof Array) {
                return arrayLike;
            }

            const result : OutputOf<F>[number][] = [];
            for (let i=0; i<arrayLike.length; ++i) {
                result.push(arrayLike[i]);
            }
            return result;
        }) as any
    ) as any;
}

export type ArrayLikeToReadOnlyArrayMapper<
    F extends AnySafeMapper
> = (
    & SafeMapper<readonly OutputOf<F>[]>
    & ExpectedInput<readonly ExpectedInputOf<F>[]>
    & MappableInput<ArrayLike<MappableInputOf<F>>>
    & ExtractRunTimeModifierOrUnknown<F>
);

export function arrayLikeToReadOnlyArray<
    F extends AnySafeMapper
> (
    f : F
) : (
    ArrayLikeToReadOnlyArrayMapper<F>
) {
    return arrayLikeToArray<F>(f);
}

