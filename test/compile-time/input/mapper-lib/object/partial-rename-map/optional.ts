import * as tm from "../../../../../../dist";

export const a = tm.partialRenameMap({
    isOptional : tm.optional(tm.withName(tm.unsignedInteger(), "foo")),
    isNotOptional : tm.withName(tm.orUndefined(tm.string()), "bar")
});
export const b = tm.partialRenameMap({
    isOptionalButExpectNumber : tm.withExpectedInput(
        tm.optional(tm.withName(tm.unsignedInteger(), "foo"))
    )<number>(),
    isNotOptional : tm.withName(tm.orUndefined(tm.string()), "bar")
});