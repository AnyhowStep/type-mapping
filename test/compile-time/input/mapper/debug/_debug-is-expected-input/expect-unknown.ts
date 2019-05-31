import * as tm from "../../../../../../dist";

tm._debugIsExpectedInput(
    tm.unknown(),
    1
);
tm._debugIsExpectedInput(
    tm.unknown(),
    "string-allowed"
);
tm._debugIsExpectedInput(
    tm.unknown(),
    true
);
tm._debugIsExpectedInput(
    tm.unknown(),
    "any-allowed" as any
);
tm._debugIsExpectedInput(
    tm.unknown(),
    "unknown-allowed" as unknown
);
tm._debugIsExpectedInput(
    tm.unknown(),
    "never-allowed" as never
);
tm._debugIsExpectedInput(
    tm.unknown(),
    { "object":"allowed" }
);
tm._debugIsExpectedInput(
    tm.unknown(),
    new Number(2)
);