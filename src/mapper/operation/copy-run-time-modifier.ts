import {AnyExtendedMapper} from "../extended-mapper";
import {ExtractNameOrUnknown} from "./extract-name-or-unknown";
import {ExtractOptionalOrUnknown} from "./extract-optional-or-unknown";
import {ExtractRunTimeRequiredOrUnknown} from "./extract-run-time-required-or-unknown";
import {ExtractRunTimeModifierOrUnknown} from "./extract-run-time-modifier-or-unknown";
import {setFunctionName} from "../../type-util";
import {getNameOrEmptyString, getOptionalFlagOrFalse, getRunTimeRequiredFlagOrFalse} from "../query";

/**
    Modifies `dst` by setting `name`, `__optional`, `__runTimeRequired`.
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
    & ExtractRunTimeModifierOrUnknown<SrcF>
) {
    setFunctionName(dst, getNameOrEmptyString(src));
    (dst as any).__optional = getOptionalFlagOrFalse(src);
    (dst as any).__runTimeRequired = getRunTimeRequiredFlagOrFalse(src);
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
/**
    Modifies `dst` by setting `__runTimeRequired`.
    You should not need to call this, in general.
*/
export function copyRunTimeRequired<
    SrcF extends AnyExtendedMapper,
    DstF extends AnyExtendedMapper
> (
    src : SrcF,
    dst : DstF
) : (
    & DstF
    & ExtractRunTimeRequiredOrUnknown<SrcF>
) {
    (dst as any).__runTimeRequired = getRunTimeRequiredFlagOrFalse(src);
    return dst as any;
}