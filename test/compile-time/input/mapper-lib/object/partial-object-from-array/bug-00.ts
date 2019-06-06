import * as tm from "../../../../../../dist";

export const f = tm.partialObjectFromArray(
    tm.withName(tm.orUndefined(tm.finiteNumber()), "a"),
    tm.withName(tm.literal("a", "b"), "b"),
);