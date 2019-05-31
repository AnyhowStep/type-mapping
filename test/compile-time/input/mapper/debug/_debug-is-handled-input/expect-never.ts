import * as tm from "../../../../../../dist";

const never = (_n : string, m : never) : never => {
    return m;
};

tm._debugIsHandledInput(
    never,
    1
);
tm._debugIsHandledInput(
    never,
    "string-allowed"
);
tm._debugIsHandledInput(
    never,
    true
);
tm._debugIsHandledInput(
    never,
    "any-allowed" as any
);
tm._debugIsHandledInput(
    never,
    "unknown-allowed" as unknown
);
tm._debugIsHandledInput(
    never,
    "never-allowed" as never
);
tm._debugIsHandledInput(
    never,
    { "object":"allowed" }
);
tm._debugIsHandledInput(
    never,
    new Number(2)
);