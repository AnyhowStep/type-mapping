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
} from "../../mapper";
import {pipe, orUndefined} from "../operator";
import {instanceOfObject} from "./instance-of-object";

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
            const result : { [k : string] : OutputOf<F> } = {};
            for (const k in obj) {
                if (!Object.prototype.hasOwnProperty.call(obj, k)) {
                    continue;
                }
                result[k] = f(
                    `${name}[${JSON.stringify(k)}]`,
                    (obj as any)[k]
                );
            }
            return result;
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
            const result : { [k : string] : OutputOf<F>|undefined } = {};
            for (const k in obj) {
                if (!Object.prototype.hasOwnProperty.call(obj, k)) {
                    continue;
                }
                result[k] = fOrUndefined(
                    `${name}[${JSON.stringify(k)}]`,
                    (obj as any)[k]
                );
            }
            return result;
        }
    );
    return copyRunTimeModifier(
        f,
        result
    ) as any;
}