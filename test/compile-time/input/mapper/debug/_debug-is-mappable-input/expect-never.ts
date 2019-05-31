import * as tm from "../../../../../../dist";

const never = (_n : string, m : any) : never => {
    return m as never;
};

tm._debugIsMappableInput(
    never,
    1
);
tm._debugIsMappableInput(
    never,
    "string-allowed"
);
tm._debugIsMappableInput(
    never,
    true
);
tm._debugIsMappableInput(
    never,
    "any-allowed" as any
);
tm._debugIsMappableInput(
    never,
    "unknown-allowed" as unknown
);
tm._debugIsMappableInput(
    never,
    "never-allowed" as never
);
tm._debugIsMappableInput(
    never,
    { "object":"allowed" }
);
tm._debugIsMappableInput(
    never,
    new Number(2)
);