import {
    SafeMapper,
    OutputOf,
    ExpectedInput,
    MappableInput,
    tryMapHandled,
    ExpectedInputOfImpl,
    MappableInputOfImpl,
} from "../../mapper";
import {MappingError} from "../../mapping-error";
import {makeNormalizedUnionError, makeMappingError, tryGetPropertyError} from "../../error-util";
import {unsafeOr} from "../operator";
import {toPropertyAccess} from "../../string-util";

export type UnsafeDiscriminatedUnionMapper<
    DiscriminantK extends string,
    ArrT extends readonly SafeMapper<{ [k in DiscriminantK] : unknown }>[]
> = (
    & SafeMapper<OutputOf<ArrT[number]>>
    & ExpectedInput<
        ExpectedInputOfImpl<ArrT[number]>[0]
    >
    & MappableInput<
        MappableInputOfImpl<ArrT[number]>[0]
    >
);
export function unsafeDiscriminatedUnion<
    DiscriminantK extends string,
    ArrT extends readonly SafeMapper<{ [k in DiscriminantK] : unknown }>[]
> (
    discriminantK : DiscriminantK,
    ...arr : ArrT
) : (
    UnsafeDiscriminatedUnionMapper<DiscriminantK, ArrT>
) {
    if (arr.length == 0) {
        throw new Error(`Cannot call unsafeDiscriminatedUnion() on zero mappers`);
    }
    const orDelegate = unsafeOr(...arr);
    const result : UnsafeDiscriminatedUnionMapper<DiscriminantK, ArrT> = (
        name : string,
        mixed : unknown
    ) : OutputOf<ArrT[number]> => {
        const mapResult = tryMapHandled(
            orDelegate,
            name,
            mixed
        );
        if (mapResult.success) {
            return mapResult.value;
        } else {
            const unionErrors = mapResult.mappingError.unionErrors;
            if (unionErrors == undefined) {
                throw mapResult.mappingError;
            }
            const discriminantInputName = `${name}${toPropertyAccess(discriminantK)}`;
            const discriminantErrors = unionErrors
                .map((unionError) => {
                    return tryGetPropertyError(unionError, discriminantInputName);
                })
                .filter((propertyError) : propertyError is MappingError => {
                    return propertyError != undefined;
                });
            if (discriminantErrors.length != unionErrors.length) {
                const nonDiscriminantErrors = unionErrors
                    .map((unionError) => {
                        return (tryGetPropertyError(unionError, discriminantInputName) == undefined) ?
                            //This error is not because of the discriminant
                            unionError :
                            undefined;
                    })
                    .filter((unionError) : unionError is MappingError => {
                        return unionError != undefined;
                    });
                throw makeNormalizedUnionError(
                    name,
                    mixed,
                    nonDiscriminantErrors
                );
            }

            const expectedDiscriminators = discriminantErrors.map(err => err.expected).join("|");
            throw makeMappingError({
                message : `${name} must be object with ${expectedDiscriminators} property ${JSON.stringify(discriminantK)}`,
                inputName : name,
                actualValue : mixed,
                expected : `object with ${expectedDiscriminators} property ${JSON.stringify(discriminantK)}`,
                expectedMeta : undefined,
                propertyErrors : [
                    makeNormalizedUnionError(
                        discriminantInputName,
                        (
                            mixed == undefined ?
                            undefined :
                            (mixed as any)[discriminantK]
                        ),
                        discriminantErrors
                    ),
                ],
            });
        }
    };
    return result;
}

export type DiscriminatedUnionMapper<
    DiscriminantK extends string,
    F extends SafeMapper<{ [k in DiscriminantK] : unknown }>,
    ArrT extends readonly SafeMapper<{ [k in DiscriminantK] : unknown }>[]
> = (
    & SafeMapper<OutputOf<F|ArrT[number]>>
    & ExpectedInput<
        ExpectedInputOfImpl<F|ArrT[number]>[0]
    >
    & MappableInput<
        MappableInputOfImpl<F|ArrT[number]>[0]
    >
);
export function discriminatedUnion<
    DiscriminantK extends string,
    F extends SafeMapper<{ [k in DiscriminantK] : unknown }>,
    ArrT extends readonly SafeMapper<{ [k in DiscriminantK] : unknown }>[]
> (
    discriminantK : DiscriminantK,
    f : F,
    ...arr : ArrT
) : (
    DiscriminatedUnionMapper<DiscriminantK, F, ArrT>
) {
    return unsafeDiscriminatedUnion<DiscriminantK, readonly (F|ArrT[number])[]>(
        discriminantK,
        f,
        ...arr
    );
}