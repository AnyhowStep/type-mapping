import * as tm from "../../../../../../dist";

declare const stringNameFoo1 : tm.SafeMapper<number|undefined> & tm.Name<"foo"> & tm.Optional;
declare const stringNameFoo2 : tm.SafeMapper<string|undefined> & tm.Name<"foo">;

export const a = tm.renameMap({
    x : stringNameFoo1
});
export const b = tm.renameMap({
    x : stringNameFoo2
});
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
export const c = tm.renameMap({
    x : stringNameFoo1,
    y : stringNameFoo2,
});