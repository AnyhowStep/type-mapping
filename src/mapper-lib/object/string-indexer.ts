import {
    AnySafeMapper,
    ExpectedInput,
    MappableInput,
    OutputOf,
    SafeMapper,
    ExtractNameOrUnknown,
    ExtractOptionalOrUnknown,
} from "../../mapper";
import {pipe} from "../operator";
import {instanceOfObject} from "./instance-of-object";
import { copyRunTimeModifier } from "../../mapper/operation";

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
        [k : string] : ExpectedInput<F>
    }>
    & MappableInput<{
        [k : string] : MappableInput<F>
    }>
    & ExtractNameOrUnknown<F>
    & ExtractOptionalOrUnknown<F>
);

export function unsafeStringIndexer<F extends AnySafeMapper> (f : F) : (
    UnsafeStringIndexerMapper<F>
) {
    const result = pipe(
        instanceOfObject(),
        (name : string, obj : Object) : { [k : string] : OutputOf<F> } => {
            const result : { [k : string] : OutputOf<F> } = {};
            for (const k in obj) {
                if (!obj.hasOwnProperty(k)) {
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
        [k : string] : ExpectedInput<F>|undefined
    }>
    & MappableInput<{
        [k : string] : MappableInput<F>|undefined
    }>
    & ExtractNameOrUnknown<F>
    & ExtractOptionalOrUnknown<F>
);

export function stringIndexer<F extends AnySafeMapper> (f : F) : (
    StringIndexerMapper<F>
) {
    return unsafeStringIndexer(f);
}