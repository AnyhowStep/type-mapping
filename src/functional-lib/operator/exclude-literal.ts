import {
    SafeMapper,
    AnySafeMapper,
    OutputOf,
    ExpectedInput,
    MappableInput,
    ExtractRunTimeModifierOrUnknown,
    copyRunTimeModifier,
    tryMapHandled,
} from "../../mapper";
import {LiteralType} from "../../primitive";
import {toLiteralUnionStr, toLiteralStr, strictEqual, toTypeStr} from "../../type-util";
import {makeMappingError} from "../../error-util";
import {removeDuplicateElements} from "../../array-util";

export type ExcludeLiteralMapper<
    F extends AnySafeMapper,
    ArrT extends LiteralType[]
> = (
    & SafeMapper<Exclude<
        OutputOf<F>,
        ArrT[number]
    >>
    & (
        F extends ExpectedInput<infer T> ?
        ExpectedInput<Exclude<T, ArrT[number]>> :
        unknown
    )
    & (
        F extends MappableInput<infer T> ?
        MappableInput<Exclude<T, ArrT[number]>> :
        unknown
    )
    & ExtractRunTimeModifierOrUnknown<F>
);
export function excludeLiteral<
    F extends AnySafeMapper,
    ArrT extends LiteralType[]
> (f : F, ...arr : ArrT) : ExcludeLiteralMapper<F, ArrT> {
    const literalStrArr = arr.map(value => toLiteralStr(value));

    return copyRunTimeModifier(
        f,
        (name : string, mixed : unknown) => {
            const mapResult = tryMapHandled(f, name, mixed);
            if (mapResult.success) {
                const value = mapResult.value;
                for (const item of arr) {
                    if (strictEqual(value, item)) {
                        throw makeMappingError({
                            message : `${name} must not be ${toLiteralUnionStr(arr)}; received ${toLiteralStr(item)}`,
                            inputName : name,
                            actualValue : value,
                            expected : `not ${toLiteralUnionStr(arr)}`,
                        });
                    }
                }
                return value;
            }

            const rawUnionErrors = mapResult.mappingError.unionErrors;
            if (rawUnionErrors == undefined) {
                throw mapResult.mappingError;
            }

            const unionErrors = rawUnionErrors.filter(
                err => (
                    err.expected != undefined &&
                    literalStrArr.indexOf(err.expected) < 0
                )
            );

            const rawExpectedArr = unionErrors
                .map(e => e.expected)
                .filter((s) : s is string => s != undefined);
            if (rawExpectedArr.length != unionErrors.length) {
                throw mapResult.mappingError;
            }

            /**
             * @todo Add checks for zero-length errors elsewhere in the code base, too
             */
            if (rawExpectedArr.length == 0) {
                throw makeMappingError({
                    message : `${name} must be never; received ${toTypeStr(mixed)}`,
                    inputName : name,
                    actualValue : mixed,
                    expected : "never",

                    unionErrors,
                });
            } else if (rawExpectedArr.length == 1) {
                const expected = rawExpectedArr[0];

                throw makeMappingError({
                    message : `${name} must be ${expected}; received ${toTypeStr(mixed)}`,
                    inputName : name,
                    actualValue : mixed,
                    expected,
                });
            } else {
                const expected = removeDuplicateElements(rawExpectedArr)
                    .map(str => `(${str})`)
                    .join(" or ");

                throw makeMappingError({
                    message : `${name} must be ${expected}; received ${toTypeStr(mixed)}`,
                    inputName : name,
                    actualValue : mixed,
                    expected,

                    unionErrors,
                });
            }
        }
    ) as any;
}
