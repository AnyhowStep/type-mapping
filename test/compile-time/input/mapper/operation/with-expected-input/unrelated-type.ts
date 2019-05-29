import * as tm from "../../../../../../dist";

export const unrelatedType = tm.withExpectedInput(
    tm.orUndefined(tm.unsignedInteger())
)<string>();