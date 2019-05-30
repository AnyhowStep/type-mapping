import * as tm from "../../../../../../dist";

declare const stringNameFoo1 : ReturnType<typeof tm.unsignedInteger> & tm.Name<"foo">;
declare const stringNameFoo2 : ReturnType<typeof tm.boolean> & tm.Name<"foo">;

export const a = tm.objectFromArray(
    stringNameFoo1,
    stringNameFoo2,
    tm.withName(tm.orUndefined(tm.string()), "isNotOptional")
);