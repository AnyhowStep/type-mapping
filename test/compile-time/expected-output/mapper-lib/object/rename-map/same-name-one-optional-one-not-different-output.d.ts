import * as tm from "../../../../../../dist";
export declare const a: tm.Mapper<unknown, {
    foo: number | undefined;
}> & tm.ExpectedInput<{} & {
    x?: number | undefined;
}> & tm.MappableInput<{} & {
    x?: number | undefined;
}>;
export declare const b: tm.Mapper<unknown, {
    foo: string | undefined;
}> & tm.ExpectedInput<{
    x: string | undefined;
} & {}> & tm.MappableInput<{
    x: string | undefined;
} & {}>;
/**
    The current `ExpectedInputOf<>` and `MappableInputOf<>` are undesirable.
    ```ts
    {
        y: string | undefined;
    } & {
        x?: number | undefined;
    }
    ```

    It should be,
    ```ts
    {
        y: undefined;
    } & {
        x?: undefined;
    }
    ```

    Because `undefined` is the only thing that will fit both `Mapper<>`s.

    -----

    The fix isn't too hard but, in general, you shouldn't be
    mapping multiple input names to one output name.

    The fix would also make the type even more complex.
*/
export declare const c: tm.Mapper<unknown, {
    foo: undefined;
}> & tm.ExpectedInput<{
    y: string | undefined;
} & {
    x?: number | undefined;
}> & tm.MappableInput<{
    y: string | undefined;
} & {
    x?: number | undefined;
}>;
