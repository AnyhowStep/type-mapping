import {
    AnySafeMapper,
    SafeMapper,
    OutputOf,
    ExpectedInput,
    ExpectedInputOfImpl,
    MappableInput,
    MappableInputOfImpl,
    ExtractNameOrUnknown,
    ExtractOptionalOrUnknown,
    copyRunTimeModifier,
} from "../../mapper";
import {indentErrorMessage} from "../../error-util";

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
        throw new Error(`Cannot call or() on zero mappers`);
    }
    return copyRunTimeModifier(
        arr[0],
        (name : string, mixed : unknown) : OutputOf<ArrT[number]> => {
            const messages : string[] = [];
            for (const d of arr) {
                try {
                    return d(name, mixed);
                } catch (err) {
                    messages.push(indentErrorMessage(err.message));
                }
            }
            throw new Error(`${name} is invalid.\n${messages.join(" or\n")}`);
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
    & ExtractNameOrUnknown<F>
    & ExtractOptionalOrUnknown<F>
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