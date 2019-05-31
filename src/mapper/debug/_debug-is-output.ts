import {IsNever, IsAny, IsUnknown} from "../../type-util";
import {OutputOf} from "../query";
import {AnyExtendedMapper} from "../extended-mapper";

export function _debugIsOutput<F extends AnyExtendedMapper, X>(
    this : (
        IsAny<OutputOf<F>> extends true ?
        unknown :
        IsUnknown<OutputOf<F>> extends true ?
        unknown :
        IsNever<OutputOf<F>> extends true ?
        ["output is never"] :
        IsAny<X> extends true ?
        [X, "is not output", OutputOf<F>] :
        IsNever<X> extends true ?
        [X, "is not output", OutputOf<F>] :
        X extends OutputOf<F> ?
        unknown :
        [X, "is not output", OutputOf<F>]
    ),
    _f : F,
    _x : X
) : void {
}