import {AnyExtendedMapper} from "../extended-mapper";
import {ExtractNameOrUnknown} from "./extract-name-or-unknown";
import {ExtractOptionalOrUnknown} from "./extract-optional-or-unknown";
import {setFunctionName} from "../../type-util";
import {getNameOrEmptyString, getOptionalFlagOrFalse} from "../query";

/**
    Modifies `dst` by setting `name` and `__optional`.
    You should not need to call this, in general.
*/
export function copyRunTimeModifier<
    SrcF extends AnyExtendedMapper,
    DstF extends AnyExtendedMapper
> (
    src : SrcF,
    dst : DstF
) : (
    & DstF
    & ExtractNameOrUnknown<SrcF>
    & ExtractOptionalOrUnknown<SrcF>
) {
    setFunctionName(dst, getNameOrEmptyString(src));
    (dst as any).__optional = getOptionalFlagOrFalse(src);
    return dst as any;
}

/**
    Modifies `dst` by setting `name`.
    You should not need to call this, in general.
*/
export function copyName<
    SrcF extends AnyExtendedMapper,
    DstF extends AnyExtendedMapper
> (
    src : SrcF,
    dst : DstF
) : (
    & DstF
    & ExtractNameOrUnknown<SrcF>
) {
    setFunctionName(dst, getNameOrEmptyString(src));
    return dst as any;
}
/**
    Modifies `dst` by setting `__optional`.
    You should not need to call this, in general.
*/
export function copyOptional<
    SrcF extends AnyExtendedMapper,
    DstF extends AnyExtendedMapper
> (
    src : SrcF,
    dst : DstF
) : (
    & DstF
    & ExtractOptionalOrUnknown<SrcF>
) {
    (dst as any).__optional = getOptionalFlagOrFalse(src);
    return dst as any;
}