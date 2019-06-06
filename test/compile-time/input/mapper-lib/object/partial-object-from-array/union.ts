import * as tm from "../../../../../../dist";

/*
    This is undesirable behaviour for `ExpectedInput<>` and `MappableInput<>`.
    However, in general, we shouldn't be passing around unions of `Mapper<>`
*/
declare const u : tm.SafeMapper<number> | tm.SafeMapper<string>
export const a = tm.partialObjectFromArray(
    tm.withName(u, "foo"),
);