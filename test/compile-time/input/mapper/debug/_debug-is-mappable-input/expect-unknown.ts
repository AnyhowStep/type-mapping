import * as tm from "../../../../../../dist";

tm._debugIsMappableInput(
    tm.unknown(),
    1
);
tm._debugIsMappableInput(
    tm.unknown(),
    "string-allowed"
);
tm._debugIsMappableInput(
    tm.unknown(),
    true
);
tm._debugIsMappableInput(
    tm.unknown(),
    "any-allowed" as any
);
tm._debugIsMappableInput(
    tm.unknown(),
    "unknown-allowed" as unknown
);
tm._debugIsMappableInput(
    tm.unknown(),
    "never-allowed" as never
);
tm._debugIsMappableInput(
    tm.unknown(),
    { "object":"allowed" }
);
tm._debugIsMappableInput(
    tm.unknown(),
    new Number(2)
);