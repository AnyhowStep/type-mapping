import * as tm from "../../../../../../dist";

export const a = tm.partialObjectFromArray(
    tm.optional(tm.withName(tm.unsignedInteger(), "isOptional")),
    tm.withName(tm.orUndefined(tm.string()), "isNotOptional")
);
export const b = tm.partialObjectFromArray(
    tm.withExpectedInput(tm.optional(tm.withName(tm.unsignedInteger(), "isOptionalButExpectNumber")))<number>(),
    tm.withName(tm.orUndefined(tm.string()), "isNotOptional")
);