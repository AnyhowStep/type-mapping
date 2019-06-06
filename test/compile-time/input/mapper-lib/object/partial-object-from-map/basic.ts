import * as tm from "../../../../../../dist";

export const a = tm.partialObjectFromMap({
    a : tm.withName(tm.unsignedInteger(), "foo"),
    b : tm.withName(tm.string(), "foo")
});