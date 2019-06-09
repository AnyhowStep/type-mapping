import * as tm from "../../../../../../dist";

export const a = tm.renameMap({
    isOptional : tm.orUndefined(tm.runTimeRequired(tm.withName(tm.unsignedInteger(), "foo"))),
    isNotOptional : tm.withName(tm.orUndefined(tm.string()), "bar")
});
export const b = tm.renameMap({
    isOptionalButExpectNumber : tm.withExpectedInput(
        tm.orUndefined(tm.runTimeRequired(tm.withName(tm.unsignedInteger(), "foo")))
    )<number>(),
    isNotOptional : tm.withName(tm.orUndefined(tm.string()), "bar")
});