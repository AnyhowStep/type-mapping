import * as tm from "../../../../../../dist";

export const a = tm.partialDeriveMap({
    a : tm.withName(tm.unsignedInteger(), "foo"),
    b : tm.withName(tm.string(), "bar")
});