import {
    Mapper,
    HandledInputOf,
    OutputOf,
    ExtractExpectedInputOrUnknown,
    ExtractMappableInputOrUnknown,
    ExtendedMapper,
} from "../../mapper";
import {mapper} from "../../mapper";

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
    //https://github.com/microsoft/TypeScript/issues/31602
    return mapper<CacheMapper<CachedT, F>>(
        ((name : string, mixed : HandledInputOf<F>) : OutputOf<F> => {
            return f(name, mixed, cached);
        }) as any
    );
}