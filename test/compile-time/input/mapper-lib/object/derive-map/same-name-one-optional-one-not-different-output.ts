import * as tm from "../../../../../../dist";

declare const stringNameFoo1 : tm.SafeMapper<number|undefined> & tm.Name<"foo"> & tm.Optional;
declare const stringNameFoo2 : tm.SafeMapper<string|undefined> & tm.Name<"foo">;

export const a = tm.deriveMap({
    x : stringNameFoo1
});
export const b = tm.deriveMap({
    x : stringNameFoo2
});
export const c = tm.deriveMap({
    x : stringNameFoo1,
    y : stringNameFoo2,
});