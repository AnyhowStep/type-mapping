import * as tm from "../../../../../../dist";

export const unnamed = tm.getNameOrEmptyString(
    tm.unsignedInteger()
);
export const namedWithString = tm.getNameOrEmptyString(
    tm.withName(tm.unsignedInteger(), "can't see me" as string)
);
export const namedWithStringLiteral = tm.getNameOrEmptyString(
    tm.withName(tm.unsignedInteger(), "foo")
);
