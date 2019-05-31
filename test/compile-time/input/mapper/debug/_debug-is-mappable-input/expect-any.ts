import * as tm from "../../../../../../dist";

const any = (_n : string, m : any) : any => {
    return m;
};

tm._debugIsMappableInput(
    any,
    1
);
tm._debugIsMappableInput(
    any,
    "string-allowed"
);
tm._debugIsMappableInput(
    any,
    true
);
tm._debugIsMappableInput(
    any,
    "any-allowed" as any
);
tm._debugIsMappableInput(
    any,
    "unknown-allowed" as unknown
);
tm._debugIsMappableInput(
    any,
    "never-allowed" as never
);
tm._debugIsMappableInput(
    any,
    { "object":"allowed" }
);
tm._debugIsMappableInput(
    any,
    new Number(2)
);