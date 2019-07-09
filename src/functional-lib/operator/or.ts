import {
    AnySafeMapper,
    SafeMapper,
    OutputOf,
    ExpectedInput,
    ExpectedInputOfImpl,
    MappableInput,
    MappableInputOfImpl,
    ExtractRunTimeModifierOrUnknown,
    copyRunTimeModifier,
    tryMapHandled,
} from "../../mapper";
import {indentErrorMessage, makeMappingError, flattenUnionErrors} from "../../error-util";
import {MappingError} from "../../mapping-error";
import {removeDuplicateElements} from "../../array-util";
import {toTypeStr} from "../../type-util";

function everyElementHasMappableValues (arr : MappingError[]) : arr is (
    (
        & MappingError
        & {
            expectedMeta : {
                mappableValues : unknown[]
            }
        }
    )[]
) {
    return arr.every(
        err => err.expectedMeta != undefined && err.expectedMeta.mappableValues != undefined
    );
}

function everyElementHasOutputValues (arr : MappingError[]) : arr is (
    (
        & MappingError
        & {
            expectedMeta : {
                outputValues : unknown[]
            }
        }
    )[]
) {
    return arr.every(
        err => err.expectedMeta != undefined && err.expectedMeta.outputValues != undefined
    );
}

export type UnsafeOrMapper<ArrT extends AnySafeMapper[]> = (
    & SafeMapper<OutputOf<ArrT[number]>>
    & ExpectedInput<
        ExpectedInputOfImpl<ArrT[number]>[0]
    >
    & MappableInput<
        MappableInputOfImpl<ArrT[number]>[0]
    >
);
export function unsafeOr<ArrT extends AnySafeMapper[]> (...arr : ArrT) : (
    UnsafeOrMapper<ArrT>
) {
    if (arr.length == 0) {
        throw new Error(`Cannot call or() on zero mappers`);
    }
    return copyRunTimeModifier(
        arr[0],
        (name : string, mixed : unknown) : OutputOf<ArrT[number]> => {
            let unionErrors : MappingError[] = [];
            for (const d of arr) {
                const elementResult = tryMapHandled(d, name, mixed);
                if (elementResult.success) {
                    return elementResult.value;
                } else {
                    unionErrors.push(elementResult.mappingError);
                }
            }

            unionErrors = flattenUnionErrors(unionErrors);

            const rawExpectedArr = unionErrors
                .map(e => e.expected)
                .filter((i) : i is string => typeof i == "string");
            if (rawExpectedArr.length == unionErrors.length) {
                const expected = removeDuplicateElements(rawExpectedArr)
                    .map(str => `(${str})`)
                    .join(" or ");

                throw makeMappingError({
                    message : `${name} must be ${expected}; received ${toTypeStr(mixed)}`,
                    inputName : name,
                    actualValue : mixed,
                    expected,
                    expectedMeta : {
                        mappableValues : (
                            everyElementHasMappableValues(unionErrors) ?
                            unionErrors.reduce(
                                (memo, err) => {
                                    memo.push(...err.expectedMeta.mappableValues);
                                    return memo;
                                },
                                [] as unknown[]
                            ) :
                            undefined
                        ),
                        outputValues : (
                            everyElementHasOutputValues(unionErrors) ?
                            unionErrors.reduce(
                                (memo, err) => {
                                    memo.push(...err.expectedMeta.outputValues);
                                    return memo;
                                },
                                [] as unknown[]
                            ) :
                            undefined
                        ),
                    },

                    unionErrors,
                });
            } else {
                /**
                 * At least one of our mappers did not throw
                 * a `MappingError`
                 */
                const errorMessages = removeDuplicateElements(
                    unionErrors
                        .map(e => indentErrorMessage(e.message))
                ).map(str => `(${str})`);

                const expected = removeDuplicateElements([...rawExpectedArr, "valid value"])
                    .map(str => `(${str})`)
                    .join(" or ");

                throw makeMappingError({
                    message : `${name} is invalid.\n${errorMessages.join(" or\n")}`,
                    inputName : name,
                    actualValue : mixed,
                    expected,

                    unionErrors,
                });
            }
        }
    );
}
export type OrMapper<F extends AnySafeMapper, ArrT extends AnySafeMapper[]> = (
    & SafeMapper<OutputOf<F|ArrT[number]>>
    & ExpectedInput<
        ExpectedInputOfImpl<F|ArrT[number]>[0]
    >
    & MappableInput<
        MappableInputOfImpl<F|ArrT[number]>[0]
    >
    & ExtractRunTimeModifierOrUnknown<F>
);
export function or<
    F extends AnySafeMapper,
    ArrT extends AnySafeMapper[]
> (
    f : F,
    ...arr : ArrT
) : (
    OrMapper<F, ArrT>
) {
    return unsafeOr(f, ...arr) as any;
}

/*
or(
    (null as unknown as ((() => 1) & ExpectedInput<number>)),
    (null as unknown as ((() => 2) & ExpectedInput<string>)),
    (null as unknown as ((() => 3) & ExpectedInput<boolean>))
).__accepts
*/