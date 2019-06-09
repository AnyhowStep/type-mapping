import * as tm from "../../../../../../dist";

export const a = tm.partialRenameMap({
    a : tm.runTimeRequired(tm.orUndefined(tm.withName(tm.unsignedInteger(), "foo"))),
    b : tm.runTimeRequired(tm.orUndefined(tm.withName(tm.string(), "bar")))
});