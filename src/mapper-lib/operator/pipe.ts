import {AnyMapper} from "../../mapper";
import {SafeMapper, AnySafeMapper} from "../../mapper";
import {OutputOf} from "../../mapper";
import {ExtractMappableInputOrUnknown} from "../../mapper";
import {ExtractExpectedInputOrUnknown} from "../../mapper";
import {ExpectedInputOf} from "../../mapper";
import {Primitive} from "../../primitive";
import {ExpectedInput} from "../../mapper";
import {AssertPipeable} from "../../mapper";

function pipeImpl<ArrT extends AnyMapper[]> (...arr : ArrT) : SafeMapper<unknown> {
    return (name : string, mixed : unknown) : unknown => {
        for (let i=0; i<arr.length; ++i) {
            const d = arr[i];
            mixed = d(`${name} |> ${i}`, mixed);
        }
        return mixed;
    };
}

export function pipe<
    F0 extends AnySafeMapper
> (
    f0 : F0
) : (
    & SafeMapper<OutputOf<F0>>
    & ExtractMappableInputOrUnknown<F0>
    & ExtractExpectedInputOrUnknown<F0>
);
export function pipe<
    F0 extends AnySafeMapper,
    F1 extends AnyMapper
> (
    f0 : F0,
    f1 : AssertPipeable<F0, F1>
) : (
    & SafeMapper<OutputOf<F1>>
    & ExtractMappableInputOrUnknown<F0>
    & (
        ExpectedInputOf<F1> extends ExpectedInputOf<F0> ?
        (
            Exclude<ExpectedInputOf<F0>, Primitive> extends Exclude<ExpectedInputOf<F1>, Primitive> ?
            ExpectedInput<ExpectedInputOf<F1>> :
            ExtractExpectedInputOrUnknown<F0>
        ) :
        ExtractExpectedInputOrUnknown<F0>
    )
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
    & SafeMapper<OutputOf<F2>>
    & ExtractMappableInputOrUnknown<F0>
    & (
        ExpectedInputOf<F2> extends ExpectedInputOf<F0> ?
        (
            Exclude<ExpectedInputOf<F0>, Primitive> extends Exclude<ExpectedInputOf<F2>, Primitive> ?
            ExpectedInput<ExpectedInputOf<F2>> :
            ExtractExpectedInputOrUnknown<F0>
        ) :
        ExtractExpectedInputOrUnknown<F0>
    )
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
    & SafeMapper<OutputOf<F3>>
    & ExtractMappableInputOrUnknown<F0>
    & (
        ExpectedInputOf<F3> extends ExpectedInputOf<F0> ?
        (
            Exclude<ExpectedInputOf<F0>, Primitive> extends Exclude<ExpectedInputOf<F3>, Primitive> ?
            ExpectedInput<ExpectedInputOf<F3>> :
            ExtractExpectedInputOrUnknown<F0>
        ) :
        ExtractExpectedInputOrUnknown<F0>
    )
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
    & SafeMapper<OutputOf<F4>>
    & ExtractMappableInputOrUnknown<F0>
    & (
        ExpectedInputOf<F4> extends ExpectedInputOf<F0> ?
        (
            Exclude<ExpectedInputOf<F0>, Primitive> extends Exclude<ExpectedInputOf<F4>, Primitive> ?
            ExpectedInput<ExpectedInputOf<F4>> :
            ExtractExpectedInputOrUnknown<F0>
        ) :
        ExtractExpectedInputOrUnknown<F0>
    )
);
//Not the best...
//export function pipe<ArrT extends AnyMapper[]> (...arr : ArrT) : SafeMapper<unknown>;
export function pipe<ArrT extends AnyMapper[]> (...arr : ArrT) : SafeMapper<unknown> {
    return pipeImpl(...arr);
}

export function unsafePipe<ArrT extends AnyMapper[]> (...arr : ArrT) : SafeMapper<unknown> {
    return pipeImpl(...arr);
}