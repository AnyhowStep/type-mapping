import {MappingError} from "../mapping-error";
import {flattenUnionErrors} from "./flatten-union-errors";
import {removeDuplicateElements} from "../array-util";
import {makeMappingError} from "./make-mapping-error";
import {toTypeStr} from "../type-util";
import {indentErrorMessage} from "./indent-error-message";

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

export function makeNormalizedUnionError (name : string, mixed : unknown, unionErrors : MappingError[]) : MappingError {
    unionErrors = flattenUnionErrors(unionErrors);

    const rawExpectedArr = unionErrors
        .map(e => e.expected)
        .filter((i) : i is string => typeof i == "string");
    if (rawExpectedArr.length == unionErrors.length) {
        const expected = removeDuplicateElements(rawExpectedArr)
            .map(str => `(${str})`)
            .join(" or ");

        return makeMappingError({
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

        return makeMappingError({
            message : `${name} is invalid.\n${errorMessages.join(" or\n")}`,
            inputName : name,
            actualValue : mixed,
            expected,

            unionErrors,
        });
    }
}