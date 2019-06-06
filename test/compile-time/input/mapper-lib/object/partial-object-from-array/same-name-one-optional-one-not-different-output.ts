import * as tm from "../../../../../../dist";

declare const stringNameFoo1 : tm.SafeMapper<number|undefined> & tm.Name<"foo"> & tm.Optional;
declare const stringNameFoo2 : tm.SafeMapper<string|undefined> & tm.Name<"foo">;

export const a = tm.partialObjectFromArray(
    stringNameFoo1,
);
export const b = tm.partialObjectFromArray(
    stringNameFoo2,
);
export const c = tm.partialObjectFromArray(
    stringNameFoo1,
    stringNameFoo2,
);