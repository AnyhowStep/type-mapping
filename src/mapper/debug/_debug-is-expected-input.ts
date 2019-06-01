import {IsNever, IsAny, IsUnknown} from "../../type-util";
import {ExpectedInputOf} from "../query";
import {AnyExtendedMapper} from "../extended-mapper";

export type _DebugIsExpectedInput<F extends AnyExtendedMapper, X> = (
    IsAny<ExpectedInputOf<F>> extends true ?
    unknown :
    IsUnknown<ExpectedInputOf<F>> extends true ?
    unknown :
    IsNever<ExpectedInputOf<F>> extends true ?
    ["expected input is never"] :
    IsAny<X> extends true ?
    [X, "is not expected input", ExpectedInputOf<F>] :
    IsNever<X> extends true ?
    [X, "is not expected input", ExpectedInputOf<F>] :
    X extends ExpectedInputOf<F> ?
    unknown :
    [X, "is not expected input", ExpectedInputOf<F>]
);
export function _debugIsExpectedInput<F extends AnyExtendedMapper, X> (
    this : _DebugIsExpectedInput<F, X>,
    _f : F,
    _x : X
) : void {
}

/*
import {unknown, optional} from "../../functional-lib";
import {withExpectedInput} from "../operation";
_debugIsExpectedInput(
    withExpectedInput(optional(unknown()))<number>(),
    {x : 2} as unknown
);
//*/