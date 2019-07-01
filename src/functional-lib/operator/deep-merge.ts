import {
    AnySafeMapper,
    SafeMapper,
    OutputOf,
    ExpectedInputOf,
    MappableInputOf,
    ExpectedInput,
    MappableInput,
    MergedOutputOf,
    ExtractRunTimeModifierOrUnknown,
    copyRunTimeModifier,
    tryMapHandled,
} from "../../mapper";
import * as TypeUtil from "../../type-util";
import {indentErrorMessage, makeMappingError} from "../../error-util";
import {MappingError} from "../../mapping-error";
import { removeDuplicateElements } from "../../array-util";
import { toPropertyAccess } from "../../string-util";
declare const console : any;
export type UnsafeDeepMergeMapper<ArrT extends AnySafeMapper[]> = (
    & SafeMapper<
        MergedOutputOf<ArrT[number]>
    >
    & ExpectedInput<
        ExpectedInputOf<ArrT[number]>
    >
    & MappableInput<
        MappableInputOf<ArrT[number]>
    >
);
export function unsafeDeepMerge<ArrT extends AnySafeMapper[]> (
    ...arr : ArrT
) : (
    UnsafeDeepMergeMapper<ArrT>
) {
    if (arr.length == 0) {
        throw new Error(`Cannot deep merge zero mappers`);
    }
    if (arr.length == 1) {
        return arr[0];
    }
    const mapper = (name : string, mixed : unknown) : any => {
        const intersectionErrors : MappingError[] = [];

        const values : OutputOf<ArrT[number]>[] = [];
        for (const f of arr) {
            const elementResult = tryMapHandled(f, name, mixed);

            if (elementResult.success) {
                values.push(elementResult.value);
            } else {
                intersectionErrors.push(elementResult.mappingError);
            }
        }
        if (intersectionErrors.length == 1) {
            throw intersectionErrors[0];
        }
        if (intersectionErrors.length > 1) {
            const errorMessages = removeDuplicateElements(
                intersectionErrors
                    .map(e => indentErrorMessage(e.message))
            );
            const expectedElements = removeDuplicateElements(
                intersectionErrors
                    .map(e => e.expected)
                    .filter((i) : i is string => typeof i == "string")
            );

            throw makeMappingError({
                message : `${name} is invalid.\n+ ${errorMessages.join("\n+ ")}`,
                inputName : name,
                actualValue : mixed,
                expected : (
                    (expectedElements.length == 0) ?
                    undefined :
                    (expectedElements.length == 1) ?
                    expectedElements[0] :
                    expectedElements
                        .map(str => `(${str})`)
                        .join(" and ")
                ),

                intersectionErrors,
            });
        }
        const deepMergeResult = TypeUtil.tryDeepMerge(...values);
        if (deepMergeResult.success) {
            return deepMergeResult.value;
        } else {
            /**
             * In general, this should not happen.
             * If we are here, our mappers may be doing something suspicious.
             */
            /**
             * If `path.length == 0`,
             * then it's a top-level value that failed to merge
             */
            if (deepMergeResult.path == undefined) {
                console.log(deepMergeResult);
            }
            if (deepMergeResult.path.length == 0) {
                throw makeMappingError({
                    message : `${name} is invalid; ${deepMergeResult.message}`,
                    inputName : name,
                    actualValue : deepMergeResult.actualValue,
                    expected : deepMergeResult.expected,
                });
            } else {
                throw makeMappingError({
                    message : `${name} is invalid; ${deepMergeResult.message}`,
                    inputName : name,
                    actualValue : deepMergeResult.bRoot,
                    expected : deepMergeResult.path.reduceRight(
                        (memo, part) => {
                            return `{ ${JSON.stringify(part)} : ${memo} }`;
                        },
                        deepMergeResult.expected
                    ),

                    propertyErrors : [
                        makeMappingError({
                            message : deepMergeResult.message,
                            inputName : deepMergeResult.path.reduce(
                                (memo, part) => {
                                    return memo + toPropertyAccess(part);
                                },
                                name
                            ),
                            actualValue : deepMergeResult.actualValue,
                            expected : deepMergeResult.expected,
                        }),
                    ],
                });
            }
        }
    };
    return copyRunTimeModifier(
        arr[0],
        mapper
    );
}
export type DeepMergeMapper<F extends AnySafeMapper, ArrT extends AnySafeMapper[]> = (
    & SafeMapper<
        MergedOutputOf<F|ArrT[number]>
    >
    & ExpectedInput<
        ExpectedInputOf<F|ArrT[number]>
    >
    & MappableInput<
        MappableInputOf<F|ArrT[number]>
    >
    & ExtractRunTimeModifierOrUnknown<F>
);
export function deepMerge<F extends AnySafeMapper, ArrT extends AnySafeMapper[]> (
    f : F,
    ...arr : ArrT
) : (
    DeepMergeMapper<F, ArrT>
) {
    return unsafeDeepMerge(f, ...arr) as any;
}

/*
import {length} from "../array-like";
import {string} from "../string";
const dm = deepMerge(
    (null as unknown as (() => { x : "test" }) & ExpectedInput<{ foo : string }> & MappableInput<{ foo? : string|Buffer }>),
    () : { x : 1 } => (null as any),
    () : { y : true } => (null as any),
    () : { y? : true } => (null as any),
    (null as unknown as (() => { z : Date }) & MappableInput<{ foo? : Buffer }>),
);
dm("", "").y

//*
const dm2 = deepMerge(
    (null as unknown as (() => number) & ExpectedInput<{ foo : string }> & MappableInput<string>),
    (null as unknown as (() => string) & MappableInput<number>),
);
const dm3 = deepMerge(
    (null as unknown as (() => number) & ExpectedInput<{ foo : string }> & MappableInput<{ foo? : string|Buffer }>),
    (null as unknown as (() => string)),
    (null as unknown as (() => { x : "test" }) & ExpectedInput<{ foo : string }> & MappableInput<{ foo? : string|Buffer }>),
);

const dm4 = deepMerge(
    length({
        min : 1
    }),
    string()
)
//*/