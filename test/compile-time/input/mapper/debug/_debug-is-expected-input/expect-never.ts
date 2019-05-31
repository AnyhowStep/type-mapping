import * as tm from "../../../../../../dist";

const never = (_n : string, m : any) : never => {
    return m as never;
};

tm._debugIsExpectedInput(
    never,
    1
);
tm._debugIsExpectedInput(
    never,
    "string-allowed"
);
tm._debugIsExpectedInput(
    never,
    true
);
tm._debugIsExpectedInput(
    never,
    "any-allowed" as any
);
tm._debugIsExpectedInput(
    never,
    "unknown-allowed" as unknown
);
tm._debugIsExpectedInput(
    never,
    "never-allowed" as never
);
tm._debugIsExpectedInput(
    never,
    { "object":"allowed" }
);
tm._debugIsExpectedInput(
    never,
    new Number(2)
);