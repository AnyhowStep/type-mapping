import * as tm from "../../../../../../dist";

export const namedWithString = tm.withName(tm.unsignedInteger(), "can't see me" as string);
export const namedWithStringLiteral = tm.withName(tm.unsignedInteger(), "foo");