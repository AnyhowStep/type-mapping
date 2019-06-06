import * as tm from "../../../../../../dist";

export const a = tm.partialDeriveMap({
    isOptional : tm.optional(tm.withName(tm.unsignedInteger(), "foo")),
    isNotOptional : tm.withName(tm.orUndefined(tm.string()), "bar")
});
export const b = tm.partialDeriveMap({
    isOptionalButExpectNumber : tm.withExpectedInput(
        tm.optional(tm.withName(tm.unsignedInteger(), "foo"))
    )<number>(),
    isNotOptional : tm.withName(tm.orUndefined(tm.string()), "bar")
});