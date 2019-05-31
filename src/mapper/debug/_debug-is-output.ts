import {IsNever, IsAny, IsUnknown} from "../../type-util";
import {OutputOf} from "../query";
import {AnyExtendedMapper} from "../extended-mapper";

export type _DebugIsOutput<F extends AnyExtendedMapper, X> = (
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
);
export function _debugIsOutput<F extends AnyExtendedMapper, X>(
    this : _DebugIsOutput<F, X>,
    _f : F,
    _x : X
) : void {
}