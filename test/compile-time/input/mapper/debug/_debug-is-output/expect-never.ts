import * as tm from "../../../../../../dist";

const never = (_n : string, m : any) : never => {
    return m as never;
};

tm._debugIsOutput(
    never,
    1
);
tm._debugIsOutput(
    never,
    "string-allowed"
);
tm._debugIsOutput(
    never,
    true
);
tm._debugIsOutput(
    never,
    "any-allowed" as any
);
tm._debugIsOutput(
    never,
    "unknown-allowed" as unknown
);
tm._debugIsOutput(
    never,
    "never-allowed" as never
);
tm._debugIsOutput(
    never,
    { "object":"allowed" }
);
tm._debugIsOutput(
    never,
    new Number(2)
);