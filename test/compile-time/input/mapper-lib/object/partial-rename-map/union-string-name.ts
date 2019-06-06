import * as tm from "../../../../../../dist";

declare const stringNameFoo1 : ReturnType<typeof tm.unsignedInteger> & tm.Name<string>;
declare const stringNameFoo2 : ReturnType<typeof tm.string> & tm.Name<string>;

declare const map : {
    foo : (typeof stringNameFoo1) | (typeof stringNameFoo2)
};

export const a = tm.partialRenameMap(
    map
);