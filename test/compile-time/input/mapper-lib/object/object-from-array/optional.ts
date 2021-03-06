import * as tm from "../../../../../../dist";

export const a = tm.objectFromArray(
    tm.optional(tm.withName(tm.unsignedInteger(), "isOptional")),
    tm.withName(tm.orUndefined(tm.string()), "isNotOptional")
);
export const b = tm.objectFromArray(
    tm.withExpectedInput(tm.optional(tm.withName(tm.unsignedInteger(), "isOptionalButExpectNumber")))<number>(),
    tm.withName(tm.orUndefined(tm.string()), "isNotOptional")
);