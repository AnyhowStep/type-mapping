import {
    AnySafeMapper,
    SafeMapper,
    OutputOf,
    ExpectedInput,
    ExpectedInputOfImpl,
    MappableInput,
    MappableInputOfImpl,
    ExtractRunTimeModifierOrUnknown,
    copyRunTimeModifier,
    tryMapHandled,
} from "../../mapper";
import {makeNormalizedUnionError} from "../../error-util";
import {MappingError} from "../../mapping-error";

export type UnsafeOrMapper<ArrT extends AnySafeMapper[]> = (
    & SafeMapper<OutputOf<ArrT[number]>>
    & ExpectedInput<
        ExpectedInputOfImpl<ArrT[number]>[0]
    >
    & MappableInput<
        MappableInputOfImpl<ArrT[number]>[0]
    >
);
export function unsafeOr<ArrT extends AnySafeMapper[]> (...arr : ArrT) : (
    UnsafeOrMapper<ArrT>
) {
    if (arr.length == 0) {
        throw new Error(`Cannot call unsafeOr() on zero mappers`);
    }
    return copyRunTimeModifier(
        arr[0],
        (name : string, mixed : unknown) : OutputOf<ArrT[number]> => {
            let unionErrors : MappingError[] = [];
            for (const d of arr) {
                const elementResult = tryMapHandled(d, name, mixed);
                if (elementResult.success) {
                    return elementResult.value;
                } else {
                    unionErrors.push(elementResult.mappingError);
                }
            }

            throw makeNormalizedUnionError(name, mixed, unionErrors);
        }
    );
}
export type OrMapper<F extends AnySafeMapper, ArrT extends AnySafeMapper[]> = (
    & SafeMapper<OutputOf<F|ArrT[number]>>
    & ExpectedInput<
        ExpectedInputOfImpl<F|ArrT[number]>[0]
    >
    & MappableInput<
        MappableInputOfImpl<F|ArrT[number]>[0]
    >
    & ExtractRunTimeModifierOrUnknown<F>
);
export function or<
    F extends AnySafeMapper,
    ArrT extends AnySafeMapper[]
> (
    f : F,
    ...arr : ArrT
) : (
    OrMapper<F, ArrT>
) {
    return unsafeOr(f, ...arr) as any;
}

/*
or(
    (null as unknown as ((() => 1) & ExpectedInput<number>)),
    (null as unknown as ((() => 2) & ExpectedInput<string>)),
    (null as unknown as ((() => 3) & ExpectedInput<boolean>))
).__accepts
*/