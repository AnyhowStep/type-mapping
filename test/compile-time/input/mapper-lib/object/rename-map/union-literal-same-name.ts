import * as tm from "../../../../../../dist";

declare const stringNameFoo1 : ReturnType<typeof tm.unsignedInteger> & tm.Name<"foo">;
declare const stringNameFoo2 : ReturnType<typeof tm.string> & tm.Name<"foo">;

declare const map : {
    foo : (typeof stringNameFoo1) | (typeof stringNameFoo2)
};

/**
    The current `OutputOf<>` is undesirable,
    ```ts
    {
        foo: number & string;
        bar: string;
    }
    ```

    It should be,
    ```ts
    {
        foo : number|string
    }
    ```
*/
export const a = tm.renameMap(
    map
);