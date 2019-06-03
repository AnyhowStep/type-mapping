import * as tm from "../../../../../../dist";

export const f = tm.objectFromArray(
    tm.withName(tm.orUndefined(tm.finiteNumber()), "a"),
    tm.withName(tm.literal("a", "b"), "b"),
);