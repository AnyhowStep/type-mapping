import {
    AnySafeMapper,
    SafeMapper,
    OutputOf,
    ExpectedInputOf,
    MappableInputOf,
    ExpectedInput,
    MappableInput,
    MergedOutputOf,
    copyRunTimeModifier,
} from "../../mapper";
import * as TypeUtil from "../../type-util";
import {indentErrorMessage} from "../../error-util";
import { ExtractNameOrUnknown, ExtractOptionalOrUnknown } from "../../mapper/operation";

export type UnsafeDeepMergeMapper<ArrT extends AnySafeMapper[]> = (
    & SafeMapper<
        MergedOutputOf<ArrT[number]>
    >
    & ExpectedInput<
        ExpectedInputOf<ArrT[number]>
    >
    & MappableInput<
        MappableInputOf<ArrT[number]>
    >
);
export function unsafeDeepMerge<ArrT extends AnySafeMapper[]> (
    ...arr : ArrT
) : (
    UnsafeDeepMergeMapper<ArrT>
) {
    if (arr.length == 0) {
        throw new Error(`Cannot deep merge zero mappers`);
    }
    const result = (name : string, mixed : unknown) : any => {
        const messages : string[] = [];
        const result : OutputOf<ArrT[number]>[] = [];
        for (const f of arr) {
            try {
                result.push(f(name, mixed) as any);
            } catch (err) {
                messages.push(indentErrorMessage(err.message));
            }
        }
        if (messages.length > 0) {
            throw new Error(`${name} is invalid.\n+ ${messages.join("\n+ ")}`);
        }
        try {
            return TypeUtil.deepMerge(...result) as any;
        } catch (err) {
            throw new Error(`${name} is invalid; ${err.message}`);
        }
    };
    return copyRunTimeModifier(
        arr[0],
        result
    );
}
export type DeepMergeMapper<F extends AnySafeMapper, ArrT extends AnySafeMapper[]> = (
    & SafeMapper<
        MergedOutputOf<F|ArrT[number]>
    >
    & ExpectedInput<
        ExpectedInputOf<F|ArrT[number]>
    >
    & MappableInput<
        MappableInputOf<F|ArrT[number]>
    >
    & ExtractNameOrUnknown<F>
    & ExtractOptionalOrUnknown<F>
);
export function deepMerge<F extends AnySafeMapper, ArrT extends AnySafeMapper[]> (
    f : F,
    ...arr : ArrT
) : (
    DeepMergeMapper<F, ArrT>
) {
    return unsafeDeepMerge(f, ...arr) as any;
}

/*
import { length } from "../array-like";
import { string } from "../string";
const dm = deepMerge(
    (null as unknown as (() => { x : "test" }) & ExpectedInput<{ foo : string }> & MappableInput<{ foo? : string|Buffer }>),
    () : { x : 1 } => (null as any),
    () : { y : true } => (null as any),
    () : { y? : true } => (null as any),
    (null as unknown as (() => { z : Date }) & MappableInput<{ foo? : Buffer }>),
);
dm("", "").y

//*
const dm2 = deepMerge(
    (null as unknown as (() => number) & ExpectedInput<{ foo : string }> & MappableInput<string>),
    (null as unknown as (() => string) & MappableInput<number>),
);
const dm3 = deepMerge(
    (null as unknown as (() => number) & ExpectedInput<{ foo : string }> & MappableInput<{ foo? : string|Buffer }>),
    (null as unknown as (() => string)),
    (null as unknown as (() => { x : "test" }) & ExpectedInput<{ foo : string }> & MappableInput<{ foo? : string|Buffer }>),
);

const dm4 = deepMerge(
    length({
        min : 1
    }),
    string()
)
//*/