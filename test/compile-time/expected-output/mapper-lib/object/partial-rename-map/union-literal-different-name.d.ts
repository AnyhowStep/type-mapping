import * as tm from "../../../../../../dist";
/**
    The current `OutputOf<>` is undesirable,
    ```ts
    {
        foo: number|undefined;
        bar: string|undefined;
    }
    ```

    It should be,
    ```ts
    {
        foo : number|undefined
    } |
    {
        bar : string|undefined
    }
    ```
*/
export declare const a: tm.Mapper<unknown, {
    foo: number | undefined;
    bar: string | undefined;
}> & tm.ExpectedInput<{
    foo?: number | undefined;
    bar?: string | undefined;
}> & tm.MappableInput<{
    foo?: undefined;
} | {
    foo?: number | undefined;
    bar?: string | undefined;
}>;
