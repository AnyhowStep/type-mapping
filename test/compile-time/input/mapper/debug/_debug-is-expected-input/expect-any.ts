import * as tm from "../../../../../../dist";

const any = (_n : string, m : any) : any => {
    return m;
};

tm._debugIsExpectedInput(
    any,
    1
);
tm._debugIsExpectedInput(
    any,
    "string-allowed"
);
tm._debugIsExpectedInput(
    any,
    true
);
tm._debugIsExpectedInput(
    any,
    "any-allowed" as any
);
tm._debugIsExpectedInput(
    any,
    "unknown-allowed" as unknown
);
tm._debugIsExpectedInput(
    any,
    "never-allowed" as never
);
tm._debugIsExpectedInput(
    any,
    { "object":"allowed" }
);
tm._debugIsExpectedInput(
    any,
    new Number(2)
);