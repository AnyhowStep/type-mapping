import * as tm from "../../../../../../dist";
/**
    The current `OutputOf<>` is undesirable,
    ```ts
    {
        foo: number & string;
    }
    ```

    It should be,
    ```ts
    {
        foo : number|string
    }
    ```
*/
export declare const a: tm.Mapper<unknown, {
    foo: number & string;
}> & tm.ExpectedInput<{
    foo: number & string;
} & {}> & tm.MappableInput<{
    foo: number & string;
} & {}>;
