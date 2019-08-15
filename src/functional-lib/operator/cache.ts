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
    /**
     * This type,
     * ```ts
     * Extract<F, (name: string, mixed: any, ...args: any[]) => any>
     * ```
     *
     * is necessary because of this bug,
     * https://github.com/microsoft/TypeScript/pull/32924#issuecomment-521826091
     */
    & Mapper<
        HandledInputOf<Extract<F, (name: string, mixed: any, ...args: any[]) => any>>,
        OutputOf<Extract<F, (name: string, mixed: any, ...args: any[]) => any>>
    >
    & ExtractExpectedInputOrUnknown<Extract<F, (name: string, mixed: any, ...args: any[]) => any>>
    & ExtractMappableInputOrUnknown<Extract<F, (name: string, mixed: any, ...args: any[]) => any>>
    & ExtractRunTimeModifierOrUnknown<Extract<F, (name: string, mixed: any, ...args: any[]) => any>>
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
        f as Extract<F, (name: string, mixed: any, ...args: any[]) => any>,
        (name : string, mixed : HandledInputOf<Extract<F, (name: string, mixed: any, ...args: any[]) => any>>) : OutputOf<Extract<F, (name: string, mixed: any, ...args: any[]) => any>> => {
            return f(name, mixed, cached);
        }
    )
    //https://github.com/microsoft/TypeScript/issues/31602
    return result as any;
}