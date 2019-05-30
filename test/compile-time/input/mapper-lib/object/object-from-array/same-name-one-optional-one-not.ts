import * as tm from "../../../../../../dist";

declare const stringNameFoo1 : tm.SafeMapper<number|undefined> & tm.Name<"foo"> & tm.Optional;
declare const stringNameFoo2 : tm.SafeMapper<number|undefined> & tm.Name<"foo">;

export const a = tm.objectFromArray(
    stringNameFoo1,
);
export const b = tm.objectFromArray(
    stringNameFoo2,
);
export const c = tm.objectFromArray(
    stringNameFoo1,
    stringNameFoo2,
);