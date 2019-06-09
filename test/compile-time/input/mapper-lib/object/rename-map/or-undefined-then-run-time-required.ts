import * as tm from "../../../../../../dist";

export const a = tm.renameMap({
    isOptional : tm.runTimeRequired(tm.orUndefined(tm.withName(tm.unsignedInteger(), "foo"))),
    isNotOptional : tm.withName(tm.orUndefined(tm.string()), "bar")
});
export const b = tm.renameMap({
    isOptionalButExpectNumber : tm.withExpectedInput(
        tm.runTimeRequired(tm.orUndefined(tm.withName(tm.unsignedInteger(), "foo")))
    )<number>(),
    isNotOptional : tm.withName(tm.orUndefined(tm.string()), "bar")
});