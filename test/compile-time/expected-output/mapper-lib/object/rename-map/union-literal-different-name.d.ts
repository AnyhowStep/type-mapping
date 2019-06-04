import * as tm from "../../../../../../dist";
/**
    The current `OutputOf<>` is undesirable,
    ```ts
    {
        foo: number;
        bar: string;
    }
    ```

    It should be,
    ```ts
    {
        foo : number
    } |
    {
        bar : string
    }
    ```
*/
export declare const a: tm.Mapper<unknown, {
    foo: number;
    bar: string;
}> & tm.ExpectedInput<{
    foo: number;
    bar: string;
}> & tm.MappableInput<{
    foo: number & string;
} | {
    foo: number;
    bar: string;
}>;
