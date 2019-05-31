import * as tm from "../../../../../../dist";

export const unnamed = tm.getOptionalFlagOrFalse(
    tm.unsignedInteger()
);

export const optional = tm.getOptionalFlagOrFalse(
    tm.optional(tm.unsignedInteger())
);
export const optionalThenOrUndefined = tm.getOptionalFlagOrFalse(
    tm.orUndefined(tm.optional(tm.unsignedInteger()))
);
export const optionalThenNotUndefined = tm.getOptionalFlagOrFalse(
    tm.notUndefined(tm.optional(tm.unsignedInteger()))
);
export const optionalThenNotOptional = tm.getOptionalFlagOrFalse(
    tm.notOptional(tm.optional(tm.unsignedInteger()))
);

export const orUndefined = tm.getOptionalFlagOrFalse(
    tm.orUndefined(tm.unsignedInteger())
);
export const orUndefinedThenOptional = tm.getOptionalFlagOrFalse(
    tm.optional(tm.orUndefined(tm.unsignedInteger()))
);
export const orUndefinedThenNotUndefined = tm.getOptionalFlagOrFalse(
    tm.notUndefined(tm.orUndefined(tm.unsignedInteger()))
);
export const orUndefinedThenNotOptional = tm.getOptionalFlagOrFalse(
    tm.notOptional(tm.orUndefined(tm.unsignedInteger()))
);