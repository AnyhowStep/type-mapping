import {
    SafeMapper,
    AnySafeMapper,
    OutputOf,
    ExpectedInput,
    MappableInput,
    ExpectedInputOf,
    MappableInputOf,
    ExtractNameOrUnknown,
    ExtractOptionalOrUnknown,
} from "../../../mapper";
import {pipe} from "../../operator";
import {arrayLike} from "../../array-like";

export type ArrayLikeToArrayMapper<
    F extends AnySafeMapper
> = (
    & SafeMapper<OutputOf<F>[]>
    & ExpectedInput<ExpectedInputOf<F>[]>
    & MappableInput<ArrayLike<MappableInputOf<F>>>
    & ExtractNameOrUnknown<F>
    & ExtractOptionalOrUnknown<F>
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
