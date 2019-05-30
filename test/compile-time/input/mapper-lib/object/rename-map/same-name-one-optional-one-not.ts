import * as tm from "../../../../../../dist";

declare const stringNameFoo1 : tm.SafeMapper<number|undefined> & tm.Name<"foo"> & tm.Optional;
declare const stringNameFoo2 : tm.SafeMapper<number|undefined> & tm.Name<"foo">;

export const a = tm.renameMap({
    x : stringNameFoo1
});
export const b = tm.renameMap({
    x : stringNameFoo2
});
export const c = tm.renameMap({
    x : stringNameFoo1,
    y : stringNameFoo2,
});