import * as tm from "../../../../../../dist";

tm._debugIsOutput(
    tm.unknown(),
    1
);
tm._debugIsOutput(
    tm.unknown(),
    "string-allowed"
);
tm._debugIsOutput(
    tm.unknown(),
    true
);
tm._debugIsOutput(
    tm.unknown(),
    "any-allowed" as any
);
tm._debugIsOutput(
    tm.unknown(),
    "unknown-allowed" as unknown
);
tm._debugIsOutput(
    tm.unknown(),
    "never-allowed" as never
);
tm._debugIsOutput(
    tm.unknown(),
    { "object":"allowed" }
);
tm._debugIsOutput(
    tm.unknown(),
    new Number(2)
);