import {AnyMapper} from "../../mapper";
import {SafeMapper, AnySafeMapper} from "../../mapper";
import {OutputOf} from "../../mapper";
import {ExtractExpectedInputOrUnknown} from "../../mapper";
import {ExpectedInputOf} from "../../mapper";
import {Primitive} from "../../primitive";
import {ExpectedInput} from "../../mapper";
import {AssertPipeable} from "../../mapper";
import {MappableInput} from "../../mapper/mappable-input";
import {MappableInputOf} from "../../mapper/query";

function pipeImpl<ArrT extends AnyMapper[]> (...arr : ArrT) : SafeMapper<unknown> {
    if (arr.length == 0) {
        throw new Error(`Cannot pipe zero mappers`);
    }
    return (name : string, mixed : unknown) : unknown => {
        for (let i=0; i<arr.length; ++i) {
            const d = arr[i];
            mixed = d(`${name} |> ${i}`, mixed);
        }
        return mixed;
    };
}

export type PipeMapper<
    SrcF extends AnySafeMapper,
    DstF extends AnyMapper
> = (
    & SafeMapper<OutputOf<DstF>>
    & MappableInput<MappableInputOf<SrcF>>
    & (
        ExpectedInputOf<DstF> extends ExpectedInputOf<SrcF> ?
        (
            Exclude<ExpectedInputOf<SrcF>, Primitive> extends Exclude<ExpectedInputOf<DstF>, Primitive> ?
            ExpectedInput<ExpectedInputOf<DstF>> :
            ExtractExpectedInputOrUnknown<SrcF>
        ) :
        ExtractExpectedInputOrUnknown<SrcF>
    )
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
//Not the best...
//export function pipe<ArrT extends AnyMapper[]> (...arr : ArrT) : SafeMapper<unknown>;
export function pipe<ArrT extends AnyMapper[]> (...arr : ArrT) : SafeMapper<unknown> {
    return pipeImpl(...arr);
}

export function unsafePipe<ArrT extends AnyMapper[]> (...arr : ArrT) : SafeMapper<unknown> {
    return pipeImpl(...arr);
}