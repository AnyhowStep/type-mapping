import * as tm from "../../../../../../dist";

tm._debugIsExpectedInput(
    tm.unsignedInteger(),
    1
);
tm._debugIsExpectedInput(
    tm.unsignedInteger(),
    "string-not-allowed"
);
tm._debugIsExpectedInput(
    tm.unsignedInteger(),
    true
);
tm._debugIsExpectedInput(
    tm.unsignedInteger(),
    "any-not-allowed" as any
);
tm._debugIsExpectedInput(
    tm.unsignedInteger(),
    "unknown-not-allowed" as unknown
);
tm._debugIsExpectedInput(
    tm.unsignedInteger(),
    "never-not-allowed" as never
);
tm._debugIsExpectedInput(
    tm.unsignedInteger(),
    { "object":"not-allowed" }
);
tm._debugIsExpectedInput(
    tm.unsignedInteger(),
    new Number(2)
);