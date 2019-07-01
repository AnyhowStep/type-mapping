import {
    SafeMapper,
    AnySafeMapper,
    OutputOf,
    ExpectedInput,
    ExpectedInputOf,
    MappableInput,
    MappableInputOf,
    ExtractRunTimeModifierOrUnknown,
    copyRunTimeModifier,
    tryMapHandled,
} from "../../mapper";
import {makeMappingError} from "../../error-util";

export type CastDelegate<SrcT, DstT> = (src : SrcT) => DstT;
export type CastMapper<
    SrcF extends AnySafeMapper,
    DstF extends AnySafeMapper
> = (
    & SafeMapper<OutputOf<DstF>>
    & ExpectedInput<ExpectedInputOf<DstF>>
    & MappableInput<MappableInputOf<SrcF>|MappableInputOf<DstF>>
    & ExtractRunTimeModifierOrUnknown<SrcF>
);
export function cast<
    SrcF extends AnySafeMapper,
    DstF extends AnySafeMapper
> (
    srcMapper : SrcF,
    castDelegate : CastDelegate<OutputOf<SrcF>, MappableInputOf<DstF>>,
    dstMapper : DstF
) : (
    CastMapper<SrcF, DstF>
) {
    const result = copyRunTimeModifier(
        srcMapper,
        (name : string, mixed : unknown) : OutputOf<DstF> => {
            const alreadyDstResult = tryMapHandled(dstMapper, name, mixed);
            if (alreadyDstResult.success) {
                //If this works, we are already the desired data type
                return alreadyDstResult.value;
            }
            const cannotCastPrefix = (alreadyDstResult.mappingError.expected == undefined) ?
                `Cannot cast ${name};` :
                `Cannot cast ${name} to ${alreadyDstResult.mappingError.expected};`
            //Failed. We need to cast.
            const mapSrcResult = tryMapHandled(srcMapper, name, mixed);
            if (!mapSrcResult.success) {
                throw makeMappingError({
                    message : `${cannotCastPrefix} ${mapSrcResult.mappingError.message}`,
                    inputName : name,
                    actualValue : mixed,
                    expected : (
                        mapSrcResult.mappingError.expected == alreadyDstResult.mappingError.expected ?
                        mapSrcResult.mappingError.expected :
                        `(${alreadyDstResult.mappingError.expected}) or (${mapSrcResult.mappingError.expected})`
                    ),

                    unionErrors : [
                        alreadyDstResult.mappingError,
                        mapSrcResult.mappingError,
                    ],
                });
            }

            let dst : undefined|MappableInputOf<DstF> = undefined;
            try {
                dst = castDelegate(mapSrcResult.value);
            } catch (castErr) {
                /**
                 * In general, this should never happen.
                 * If we're here, that means the `srcMapper` or `srcMapper` isn't working right.
                 */
                throw makeMappingError({
                    message : `${cannotCastPrefix} ${castErr.message}`,
                    inputName : name,
                    actualValue : mapSrcResult.value,
                    /**
                     * Since it seems like the `castDelegate` or `srcMapper` isn't working right,
                     * we should only expect whatever the `dstMapper` expects.
                     */
                    expected : alreadyDstResult.mappingError.expected,

                    stack : castErr.stack,
                });
            }

            const mapDstResult = tryMapHandled(dstMapper, name, dst);
            if (mapDstResult.success) {
                return mapDstResult.value;
            } else {
                /**
                 * In general, this should never happen.
                 * If we're here, that means the `castDelegate` or `srcMapper` isn't working right.
                 */
                throw makeMappingError({
                    message : `${cannotCastPrefix} ${mapDstResult.mappingError.message}`,
                    inputName : name,
                    actualValue : dst,
                    /**
                     * Since it seems like the `castDelegate` or `srcMapper` isn't working right,
                     * we should only expect whatever the `dstMapper` expects.
                     */
                    expected : mapDstResult.mappingError.expected,

                    unionErrors : [
                        alreadyDstResult.mappingError,
                        mapDstResult.mappingError,
                    ],
                });
            }
        }
    )
    return result as any;
}