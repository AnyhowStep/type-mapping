import {
    AnyMapper,
    SafeMapper,
    AnySafeMapper,
    OutputOf,
    ExtractExpectedInputOrUnknown,
    ExpectedInputOf,
    ExpectedInput,
    AssertPipeable,
    MappableInput,
    MappableInputOf,
    ExtractRunTimeModifierOrUnknown,
    copyRunTimeModifier,
    tryMapHandled,
} from "../../mapper";
import {Primitive} from "../../primitive";

function pipeImpl<ArrT extends AnyMapper[]> (...arr : ArrT) : SafeMapper<unknown> {
    if (arr.length == 0) {
        throw new Error(`Cannot pipe zero mappers`);
    }
    return copyRunTimeModifier(
        arr[0],
        (name : string, mixed : unknown) : unknown => {
            for (let i=0; i<arr.length; ++i) {
                const d = arr[i];
                const elementResult = tryMapHandled(d, name, mixed);
                if (elementResult.success) {
                    mixed = elementResult.value;
                } else {
                    throw elementResult.mappingError;
                }
            }
            return mixed;
        }
    );
}

export type PipeMapper<
    SrcF extends AnySafeMapper,
    DstF extends AnyMapper
> = (
    & SafeMapper<OutputOf<DstF>>
    & (
        ExpectedInputOf<DstF> extends ExpectedInputOf<SrcF> ?
        (
            Exclude<ExpectedInputOf<SrcF>, Primitive> extends Exclude<ExpectedInputOf<DstF>, Primitive> ?
            ExpectedInput<ExpectedInputOf<DstF>> :
            ExtractExpectedInputOrUnknown<SrcF>
        ) :
        ExtractExpectedInputOrUnknown<SrcF>
    )
    & MappableInput<MappableInputOf<SrcF>>
    & ExtractRunTimeModifierOrUnknown<SrcF>
);

export function pipe<
    F0 extends AnySafeMapper,
    F1 extends AnyMapper
> (
    f0 : F0,
    f1 : AssertPipeable<F0, F1>
) : (
    PipeMapper<F0, F1>
);
export function pipe<
    F0 extends AnySafeMapper,
    F1 extends AnyMapper,
    F2 extends AnyMapper
> (
    f0 : F0,
    f1 : AssertPipeable<F0, F1>,
    f2 : AssertPipeable<F1, F2>
) : (
    PipeMapper<F0, F2>
);
export function pipe<
    F0 extends AnySafeMapper,
    F1 extends AnyMapper,
    F2 extends AnyMapper,
    F3 extends AnyMapper
> (
    f0 : F0,
    f1 : AssertPipeable<F0, F1>,
    f2 : AssertPipeable<F1, F2>,
    f3 : AssertPipeable<F2, F3>
) : (
    PipeMapper<F0, F3>
);
export function pipe<
    F0 extends AnySafeMapper,
    F1 extends AnyMapper,
    F2 extends AnyMapper,
    F3 extends AnyMapper,
    F4 extends AnyMapper
> (
    f0 : F0,
    f1 : AssertPipeable<F0, F1>,
    f2 : AssertPipeable<F1, F2>,
    f3 : AssertPipeable<F2, F3>,
    f4 : AssertPipeable<F3, F4>
) : (
    PipeMapper<F0, F4>
);
export function pipe<
    F0 extends AnySafeMapper,
    F1 extends AnyMapper,
    F2 extends AnyMapper,
    F3 extends AnyMapper,
    F4 extends AnyMapper,
    F5 extends AnyMapper
> (
    f0 : F0,
    f1 : AssertPipeable<F0, F1>,
    f2 : AssertPipeable<F1, F2>,
    f3 : AssertPipeable<F2, F3>,
    f4 : AssertPipeable<F3, F4>,
    f5 : AssertPipeable<F4, F5>
) : (
    PipeMapper<F0, F5>
);
export function pipe<
    F0 extends AnySafeMapper,
    F1 extends AnyMapper,
    F2 extends AnyMapper,
    F3 extends AnyMapper,
    F4 extends AnyMapper,
    F5 extends AnyMapper,
    F6 extends AnyMapper
> (
    f0 : F0,
    f1 : AssertPipeable<F0, F1>,
    f2 : AssertPipeable<F1, F2>,
    f3 : AssertPipeable<F2, F3>,
    f4 : AssertPipeable<F3, F4>,
    f5 : AssertPipeable<F4, F5>,
    f6 : AssertPipeable<F5, F6>
) : (
    PipeMapper<F0, F6>
);
//Not the best...
//export function pipe<ArrT extends AnyMapper[]> (...arr : ArrT) : SafeMapper<unknown>;
export function pipe<ArrT extends AnyMapper[]> (...arr : ArrT) : SafeMapper<unknown> {
    return pipeImpl(...arr);
}

export type UnsafePipeMapper<
    SrcF extends AnySafeMapper
> = (
    & SafeMapper<unknown>
    & ExpectedInput<ExpectedInputOf<SrcF>>
    & MappableInput<MappableInputOf<SrcF>>
    & ExtractRunTimeModifierOrUnknown<SrcF>
);

export function unsafePipe<
    SrcF extends AnySafeMapper,
    ArrT extends AnyMapper[]
> (f : SrcF, ...arr : ArrT) : (
    UnsafePipeMapper<SrcF>
) {
    return pipeImpl(f, ...arr) as any;
}
export function reallyUnsafePipe<ArrT extends AnyMapper[]> (...arr : ArrT) : SafeMapper<unknown> {
    return pipeImpl(...arr);
}