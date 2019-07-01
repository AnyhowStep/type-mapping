import {
    AnySafeMapper,
    ExpectedInput,
    MappableInput,
    OutputOf,
    SafeMapper,
    ExtractRunTimeModifierOrUnknown,
    ExpectedInputOf,
    MappableInputOf,
    copyRunTimeModifier,
    tryMapHandled,
} from "../../mapper";
import {pipe, orUndefined} from "../operator";
import {instanceOfObject} from "./instance-of-object";
import {MappingError} from "../../mapping-error";
import {toPropertyAccess} from "../../string-util";
import {makeMappingError} from "../../error-util";

/**
    This is unsafe because of the following example,

    ```ts
    const obj : { [k : string] : string } = {};
    //This compiles but is actually undefined.
    const str : string = obj.doesNotExist;
    ```
*/
export type UnsafeStringIndexerMapper<F extends AnySafeMapper> = (
    & SafeMapper<{
        [k : string] : OutputOf<F>
    }>
    & ExpectedInput<{
        [k : string] : ExpectedInputOf<F>
    }>
    & MappableInput<{
        [k : string] : MappableInputOf<F>
    }>
    & ExtractRunTimeModifierOrUnknown<F>
);

export function unsafeStringIndexer<F extends AnySafeMapper> (f : F) : (
    UnsafeStringIndexerMapper<F>
) {
    const result = pipe(
        instanceOfObject(),
        (name : string, obj : Object) : { [k : string] : OutputOf<F> } => {
            const propertyErrors : MappingError[] = [];

            const result : { [k : string] : OutputOf<F> } = {};
            for (const k in obj) {
                if (!Object.prototype.hasOwnProperty.call(obj, k)) {
                    continue;
                }
                const propertyResult = tryMapHandled(
                    f,
                    `${name}${toPropertyAccess(k)}`,
                    (obj as any)[k]
                );
                if (propertyResult.success) {
                    result[k] = propertyResult.value;
                } else {
                    propertyErrors.push(propertyResult.mappingError);
                }
            }
            if (propertyErrors.length == 0) {
                return result;
            } else {
                throw makeMappingError({
                    message : `${name} must be valid object`,
                    inputName : name,
                    actualValue : obj,
                    expected : `valid object`,

                    propertyErrors,
                });
            }
        }
    );
    return copyRunTimeModifier(
        f,
        result
    ) as any;
}

export type StringIndexerMapper<F extends AnySafeMapper> = (
    & SafeMapper<{
        [k : string] : OutputOf<F>|undefined
    }>
    & ExpectedInput<{
        [k : string] : ExpectedInputOf<F>|undefined
    }>
    & MappableInput<{
        [k : string] : MappableInputOf<F>|undefined
    }>
    & ExtractRunTimeModifierOrUnknown<F>
);

export function stringIndexer<F extends AnySafeMapper> (f : F) : (
    StringIndexerMapper<F>
) {
    const fOrUndefined = orUndefined(f);
    const result = pipe(
        instanceOfObject(),
        (name : string, obj : Object) : { [k : string] : OutputOf<F>|undefined } => {
            const propertyErrors : MappingError[] = [];

            const result : { [k : string] : OutputOf<F>|undefined } = {};
            for (const k in obj) {
                if (!Object.prototype.hasOwnProperty.call(obj, k)) {
                    continue;
                }
                const propertyResult = tryMapHandled(
                    fOrUndefined,
                    `${name}${toPropertyAccess(k)}`,
                    (obj as any)[k]
                );
                if (propertyResult.success) {
                    result[k] = propertyResult.value;
                } else {
                    propertyErrors.push(propertyResult.mappingError);
                }
            }
            if (propertyErrors.length == 0) {
                return result;
            } else {
                throw makeMappingError({
                    message : `${name} must be valid object`,
                    inputName : name,
                    actualValue : obj,
                    expected : `valid object`,

                    propertyErrors,
                });
            }
        }
    );
    return copyRunTimeModifier(
        f,
        result
    ) as any;
}