import * as tm from "../../../../../../dist";

const any = (_n : string, m : any) : any => {
    return m;
};

tm._debugIsOutput(
    any,
    1
);
tm._debugIsOutput(
    any,
    "string-allowed"
);
tm._debugIsOutput(
    any,
    true
);
tm._debugIsOutput(
    any,
    "any-allowed" as any
);
tm._debugIsOutput(
    any,
    "unknown-allowed" as unknown
);
tm._debugIsOutput(
    any,
    "never-allowed" as never
);
tm._debugIsOutput(
    any,
    { "object":"allowed" }
);
tm._debugIsOutput(
    any,
    new Number(2)
);