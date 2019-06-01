import {
    SafeMapper,
    AnySafeMapper,
    OutputOf,
    ExpectedInput,
    ExpectedInputOf,
    MappableInput,
    MappableInputOf,
    ExtractNameOrUnknown,
    ExtractOptionalOrUnknown,
    copyRunTimeModifier,
} from "../../mapper";
import {indentErrorMessage} from "../../error-util";
import {toTypeStr} from "../../type-util";

export type CastDelegate<SrcT, DstT> = (src : SrcT) => DstT;
export type CastMapper<
    SrcF extends AnySafeMapper,
    DstF extends AnySafeMapper
> = (
    & SafeMapper<OutputOf<DstF>>
    & ExpectedInput<ExpectedInputOf<DstF>>
    & MappableInput<MappableInputOf<SrcF>|MappableInputOf<DstF>>
    & ExtractNameOrUnknown<SrcF>
    & ExtractOptionalOrUnknown<SrcF>
);
export function cast<
    SrcF extends AnySafeMapper,
    DstF extends AnySafeMapper
> (
    srcDelegate : SrcF,
    castDelegate : CastDelegate<OutputOf<SrcF>, MappableInputOf<DstF>>,
    dstDelegate : DstF
) : (
    CastMapper<SrcF, DstF>
) {
    const result = copyRunTimeModifier(
        srcDelegate,
        (name : string, mixed : unknown) : OutputOf<DstF> => {
            try {
                //If this works, we are already the desired data type
                return dstDelegate(name, mixed);
            } catch (err) {
                try {
                    //Failed. We need to cast.
                    let src : undefined|OutputOf<SrcF> = undefined;
                    let dst : undefined|MappableInputOf<DstF> = undefined;
                    try {
                        src = srcDelegate(`${toTypeStr(mixed)}(${name})`, mixed) as OutputOf<SrcF>;
                    } catch (srcErr) {
                        throw new Error(`Cannot cast; ${srcErr.message}`);
                    }
                    try {
                        dst = castDelegate(src as any);
                    } catch (castErr) {
                        throw new Error(`Cannot cast (${toTypeStr(mixed)}(${name}) as ${toTypeStr(src)}); ${castErr.message}`);
                    }
                    try {
                        return dstDelegate(`(${toTypeStr(mixed)}(${name}) as ${toTypeStr(src)} as ${toTypeStr(dst)})`, dst);
                    } catch (dstErr) {
                        throw new Error(`Cannot cast; ${dstErr.message}`);
                    }
                } catch (err2) {
                    //Ugh, disgusting; nested try catch
                    throw new Error(`${indentErrorMessage(err.message)} and\n${indentErrorMessage(err2.message)}`);
                }
            }
        }
    )
    return result as any;
}