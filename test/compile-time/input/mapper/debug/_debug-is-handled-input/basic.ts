import * as tm from "../../../../../../dist";

const number = (_n : string, m : number) : never => {
    return m as never;
};

tm._debugIsHandledInput(
    number,
    1
);
tm._debugIsHandledInput(
    number,
    "string-not-allowed"
);
tm._debugIsHandledInput(
    number,
    true
);
tm._debugIsHandledInput(
    number,
    "any-not-allowed" as any
);
tm._debugIsHandledInput(
    number,
    "unknown-not-allowed" as unknown
);
tm._debugIsHandledInput(
    number,
    "never-not-allowed" as never
);
tm._debugIsHandledInput(
    number,
    { "object":"not-allowed" }
);
tm._debugIsHandledInput(
    number,
    new Number(2)
);