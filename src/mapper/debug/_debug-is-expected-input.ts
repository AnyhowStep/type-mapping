import {IsNever, IsAny, IsUnknown} from "../../type-util";
import {ExpectedInputOf} from "../query";
import {AnyExtendedMapper} from "../extended-mapper";

export function _debugIsExpectedInput<F extends AnyExtendedMapper, X>(
    this : (
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
    ),
    _f : F,
    _x : X
) : void {
}

/*
import {unknown, optional} from "../../mapper-lib";
import {withExpectedInput} from "../operation";
_debugIsExpectedInput(
    withExpectedInput(optional(unknown()))<number>(),
    {x : 2} as unknown
);
//*/