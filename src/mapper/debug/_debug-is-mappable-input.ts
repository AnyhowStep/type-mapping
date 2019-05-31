import {IsNever, IsAny, IsUnknown} from "../../type-util";
import {MappableInputOf} from "../query";
import {AnyExtendedMapper} from "../extended-mapper";

export type _DebugIsMappableInput<F extends AnyExtendedMapper, X> = (
    IsAny<MappableInputOf<F>> extends true ?
    unknown :
    IsUnknown<MappableInputOf<F>> extends true ?
    unknown :
    IsNever<MappableInputOf<F>> extends true ?
    ["mappable input is never"] :
    IsAny<X> extends true ?
    [X, "is not mappable input", MappableInputOf<F>] :
    IsNever<X> extends true ?
    [X, "is not mappable input", MappableInputOf<F>] :
    X extends MappableInputOf<F> ?
    unknown :
    [X, "is not mappable input", MappableInputOf<F>]
);
export function _debugIsMappableInput<F extends AnyExtendedMapper, X>(
    this : _DebugIsMappableInput<F, X>,
    _f : F,
    _x : X
) : void {
}