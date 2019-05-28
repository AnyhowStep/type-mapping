import * as tm from "../../../../../../dist";

declare function extractOptionalOrUnknown<F extends tm.AnyExtendedMapper> (f : F) : tm.ExtractOptionalOrUnknown<F>;

export const expectNumber_mapNumberOrUndefined = extractOptionalOrUnknown(
    tm.withExpectedInput(
        tm.orUndefined(tm.naturalNumber())
    )<number>()
);
export const expectUndefined_mapNumberOrUndefined = extractOptionalOrUnknown(
    tm.withExpectedInput(
        tm.orUndefined(tm.naturalNumber())
    )<undefined>()
);

export const optional_expectNumber_mapNumberOrUndefined = extractOptionalOrUnknown(
    tm.withExpectedInput(
        tm.optional(tm.naturalNumber())
    )<number>()
);
export const optional_expectUndefined_mapNumberOrUndefined = extractOptionalOrUnknown(
    tm.withExpectedInput(
        tm.optional(tm.naturalNumber())
    )<undefined>()
);

export const expectNumber_mapNumberOrUndefined2 = extractOptionalOrUnknown(
    tm.withExpectedInput(
        tm.withExpectedInput(
            tm.orUndefined(tm.naturalNumber())
        )<undefined>()
    )<number>()
);
export const expectUndefined_mapNumberOrUndefined2 = extractOptionalOrUnknown(
    tm.withExpectedInput(
        tm.withExpectedInput(
            tm.orUndefined(tm.naturalNumber())
        )<number>()
    )<undefined>()
);

export const optional_expectNumber_mapNumberOrUndefined2 = extractOptionalOrUnknown(
    tm.withExpectedInput(
        tm.withExpectedInput(
            tm.optional(tm.naturalNumber())
        )<undefined>()
    )<number>()
);
export const optional_expectUndefined_mapNumberOrUndefined2 = extractOptionalOrUnknown(
    tm.withExpectedInput(
        tm.withExpectedInput(
            tm.optional(tm.naturalNumber())
        )<number>()
    )<undefined>()
);
