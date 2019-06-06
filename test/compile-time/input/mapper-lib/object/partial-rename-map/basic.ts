import * as tm from "../../../../../../dist";

export const a = tm.partialRenameMap({
    a : tm.withName(tm.unsignedInteger(), "foo"),
    b : tm.withName(tm.string(), "bar")
});