import * as tm from "../../../../../../dist";

declare const stringNameFoo1 : ReturnType<typeof tm.unsignedInteger> & tm.Name<"foo">;
declare const stringNameFoo2 : ReturnType<typeof tm.string> & tm.Name<"bar">;

declare const map : {
    foo : (typeof stringNameFoo1) | (typeof stringNameFoo2)
};

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
export const a = tm.partialRenameMap(
    map
);