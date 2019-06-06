import * as tm from "../../../../../../dist";
/**
    The current `OutputOf<>` is undesirable,
    ```ts
    {
        foo: undefined;
    }
    ```

    It should be,
    ```ts
    {
        foo : number|string|undefined
    }
    ```
*/
export declare const a: tm.Mapper<unknown, {
    foo: undefined;
}> & tm.ExpectedInput<{
    foo?: undefined;
}> & tm.MappableInput<{
    foo?: undefined;
} | {
    foo?: undefined;
}>;
