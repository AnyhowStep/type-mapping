import {IsNever, IsAny, IsUnknown} from "../../type-util";
import {HandledInputOf} from "../query";
import {AnyExtendedMapper} from "../extended-mapper";

export type _DebugIsHandledInput<F extends AnyExtendedMapper, X> = (
    IsAny<HandledInputOf<F>> extends true ?
    unknown :
    IsUnknown<HandledInputOf<F>> extends true ?
    unknown :
    IsNever<HandledInputOf<F>> extends true ?
    ["handled input is never"] :
    IsAny<X> extends true ?
    [X, "is not handled input", HandledInputOf<F>] :
    IsNever<X> extends true ?
    [X, "is not handled input", HandledInputOf<F>] :
    X extends HandledInputOf<F> ?
    unknown :
    [X, "is not handled input", HandledInputOf<F>]
);
export function _debugIsHandledInput<F extends AnyExtendedMapper, X> (
    this : _DebugIsHandledInput<F, X>,
    _f : F,
    _x : X
) : void {
}