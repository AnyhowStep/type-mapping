import * as tm from "../../../../../../dist";

declare const stringNameFoo1 : ReturnType<typeof tm.unsignedInteger> & tm.Name<string>;
declare const stringNameFoo2 : ReturnType<typeof tm.boolean> & tm.Name<string>;

export const a = tm.objectFromArray(
    stringNameFoo1,
    tm.withName(tm.orUndefined(tm.string()), "isNotOptional")
);
export const b = tm.objectFromArray(
    stringNameFoo1,
    stringNameFoo2,
    tm.withName(tm.orUndefined(tm.string()), "isNotOptional")
);