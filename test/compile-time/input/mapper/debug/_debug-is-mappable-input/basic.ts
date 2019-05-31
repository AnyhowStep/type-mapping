import * as tm from "../../../../../../dist";

tm._debugIsMappableInput(
    tm.unsignedInteger(),
    1
);
tm._debugIsMappableInput(
    tm.unsignedInteger(),
    "string-not-allowed"
);
tm._debugIsMappableInput(
    tm.unsignedInteger(),
    true
);
tm._debugIsMappableInput(
    tm.unsignedInteger(),
    "any-not-allowed" as any
);
tm._debugIsMappableInput(
    tm.unsignedInteger(),
    "unknown-not-allowed" as unknown
);
tm._debugIsMappableInput(
    tm.unsignedInteger(),
    "never-not-allowed" as never
);
tm._debugIsMappableInput(
    tm.unsignedInteger(),
    { "object":"not-allowed" }
);
tm._debugIsMappableInput(
    tm.unsignedInteger(),
    new Number(2)
);