import * as tm from "../../../../../../dist";

tm._debugIsHandledInput(
    tm.unknown(),
    1
);
tm._debugIsHandledInput(
    tm.unknown(),
    "string-allowed"
);
tm._debugIsHandledInput(
    tm.unknown(),
    true
);
tm._debugIsHandledInput(
    tm.unknown(),
    "any-allowed" as any
);
tm._debugIsHandledInput(
    tm.unknown(),
    "unknown-allowed" as unknown
);
tm._debugIsHandledInput(
    tm.unknown(),
    "never-allowed" as never
);
tm._debugIsHandledInput(
    tm.unknown(),
    { "object":"allowed" }
);
tm._debugIsHandledInput(
    tm.unknown(),
    new Number(2)
);