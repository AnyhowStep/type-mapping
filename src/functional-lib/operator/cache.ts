import {
    Mapper,
    HandledInputOf,
    OutputOf,
    ExtractExpectedInputOrUnknown,
    ExtractMappableInputOrUnknown,
    ExtendedMapper,
    ExtractRunTimeModifierOrUnknown,
} from "../../mapper";
import {copyRunTimeModifier} from "../../mapper/operation";

export type CacheMapper<
    CachedT,
    F extends ExtendedMapper<any, any, [CachedT]>
> = (
    & Mapper<
        HandledInputOf<F>,
        OutputOf<F>
    >
    & ExtractExpectedInputOrUnknown<F>
    & ExtractMappableInputOrUnknown<F>
    & ExtractRunTimeModifierOrUnknown<F>
);

export function cache<
    CachedT,
    F extends ExtendedMapper<any, any, [CachedT]>
> (
    cached : CachedT,
    f : F
) : (
    CacheMapper<CachedT, F>
) {
    const result = copyRunTimeModifier(
        f,
        (name : string, mixed : HandledInputOf<F>) : OutputOf<F> => {
            return f(name, mixed, cached);
        }
    )
    //https://github.com/microsoft/TypeScript/issues/31602
    return result as any;
}