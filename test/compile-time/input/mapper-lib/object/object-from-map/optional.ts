import * as tm from "../../../../../../dist";

export const a = tm.objectFromMap({
    isOptional : tm.optional(tm.withName(tm.unsignedInteger(), "foo")),
    isNotOptional : tm.withName(tm.orUndefined(tm.string()), "foo")
});
export const b = tm.objectFromMap({
    isOptionalButExpectNumber : tm.withExpectedInput(
        tm.optional(tm.withName(tm.unsignedInteger(), "foo"))
    )<number>(),
    isNotOptional : tm.withName(tm.orUndefined(tm.string()), "foo")
});