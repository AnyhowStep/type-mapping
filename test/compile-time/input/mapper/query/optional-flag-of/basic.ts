import * as tm from "../../../../../../dist";

export const unnamed = tm.getOptionalFlagOrFalse(
    tm.unsignedInteger()
);
export const optional = tm.getOptionalFlagOrFalse(
    tm.optional(tm.unsignedInteger())
);
export const orUndefined = tm.getOptionalFlagOrFalse(
    tm.orUndefined(tm.unsignedInteger())
);
export const optionalThenOrUndefined = tm.getOptionalFlagOrFalse(
    tm.orUndefined(tm.optional(tm.unsignedInteger()))
);