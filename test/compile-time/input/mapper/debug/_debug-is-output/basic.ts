import * as tm from "../../../../../../dist";

tm._debugIsOutput(
    tm.unsignedInteger(),
    1
);
tm._debugIsOutput(
    tm.unsignedInteger(),
    "string-not-allowed"
);
tm._debugIsOutput(
    tm.unsignedInteger(),
    true
);
tm._debugIsOutput(
    tm.unsignedInteger(),
    "any-not-allowed" as any
);
tm._debugIsOutput(
    tm.unsignedInteger(),
    "unknown-not-allowed" as unknown
);
tm._debugIsOutput(
    tm.unsignedInteger(),
    "never-not-allowed" as never
);
tm._debugIsOutput(
    tm.unsignedInteger(),
    { "object":"not-allowed" }
);
tm._debugIsOutput(
    tm.unsignedInteger(),
    new Number(2)
);