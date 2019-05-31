import * as tm from "../../../../../../dist";

declare function extractNameOrUnknown<F extends tm.AnyExtendedMapper> (f : F) : tm.ExtractNameOrUnknown<F>;

export const unnamed = extractNameOrUnknown(
    tm.unsignedInteger()
);
export const namedWithString = extractNameOrUnknown(
    tm.withName(tm.unsignedInteger(), "can't see me" as string)
);
export const namedWithStringLiteral = extractNameOrUnknown(
    tm.withName(tm.unsignedInteger(), "foo")
);