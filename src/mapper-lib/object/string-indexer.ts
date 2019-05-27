import {
    AnySafeMapper,
    ExpectedInput,
    MappableInput,
    OutputOf,
    SafeMapper,
    mapper,
} from "../../mapper";
import {pipe} from "../operator";
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
        [k : string] : ExpectedInput<F>
    }>
    & MappableInput<{
        [k : string] : MappableInput<F>
    }>
);

export function unsafeStringIndexer<F extends AnySafeMapper> (f : F) : (
    UnsafeStringIndexerMapper<F>
) {
    return mapper<UnsafeStringIndexerMapper<F>>(
        pipe(
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
        )
    );
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
);

export function stringIndexer<F extends AnySafeMapper> (f : F) : (
    StringIndexerMapper<F>
) {
    return unsafeStringIndexer(f);
}