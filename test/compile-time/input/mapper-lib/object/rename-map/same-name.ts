import * as tm from "../../../../../../dist";

export const a = tm.renameMap({
    a : tm.withName(tm.unsignedInteger(), "foo"),
    b : tm.withName(tm.string(), "foo")
});