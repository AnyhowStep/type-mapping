import * as tm from "../../../../../../dist";

export const a = tm.deriveMap({
    isOptional : tm.optional(tm.withName(tm.unsignedInteger(), "foo")),
    isNotOptional : tm.withName(tm.orUndefined(tm.string()), "bar")
});
export const b = tm.deriveMap({
    isOptionalButExpectNumber : tm.withExpectedInput(
        tm.optional(tm.withName(tm.unsignedInteger(), "foo"))
    )<number>(),
    isNotOptional : tm.withName(tm.orUndefined(tm.string()), "bar")
});