import * as tm from "../../../../../../dist";

const any = (_n : string, m : any) : any => {
    return m;
};

tm._debugIsHandledInput(
    any,
    1
);
tm._debugIsHandledInput(
    any,
    "string-allowed"
);
tm._debugIsHandledInput(
    any,
    true
);
tm._debugIsHandledInput(
    any,
    "any-allowed" as any
);
tm._debugIsHandledInput(
    any,
    "unknown-allowed" as unknown
);
tm._debugIsHandledInput(
    any,
    "never-allowed" as never
);
tm._debugIsHandledInput(
    any,
    { "object":"allowed" }
);
tm._debugIsHandledInput(
    any,
    new Number(2)
);