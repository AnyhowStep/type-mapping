import * as tm from "../../../../../../dist";

declare function extractExpectedInputOrUnknown<F extends tm.AnyExtendedMapper> (f : F) : tm.ExtractExpectedInputOrUnknown<F>;

export const expectNumber_mapNumberOrUndefined = extractExpectedInputOrUnknown(
    tm.withExpectedInput(
        tm.orUndefined(tm.naturalNumber())
    )<number>()
);
export const expectUndefined_mapNumberOrUndefined = extractExpectedInputOrUnknown(
    tm.withExpectedInput(
        tm.orUndefined(tm.naturalNumber())
    )<undefined>()
);

export const optional_expectNumber_mapNumberOrUndefined = extractExpectedInputOrUnknown(
    tm.withExpectedInput(
        tm.optional(tm.naturalNumber())
    )<number>()
);
export const optional_expectUndefined_mapNumberOrUndefined = extractExpectedInputOrUnknown(
    tm.withExpectedInput(
        tm.optional(tm.naturalNumber())
    )<undefined>()
);

export const expectNumber_mapNumberOrUndefined2 = extractExpectedInputOrUnknown(
    tm.withExpectedInput(
        tm.withExpectedInput(
            tm.orUndefined(tm.naturalNumber())
        )<undefined>()
    )<number>()
);
export const expectUndefined_mapNumberOrUndefined2 = extractExpectedInputOrUnknown(
    tm.withExpectedInput(
        tm.withExpectedInput(
            tm.orUndefined(tm.naturalNumber())
        )<number>()
    )<undefined>()
);

export const optional_expectNumber_mapNumberOrUndefined2 = extractExpectedInputOrUnknown(
    tm.withExpectedInput(
        tm.withExpectedInput(
            tm.optional(tm.naturalNumber())
        )<undefined>()
    )<number>()
);
export const optional_expectUndefined_mapNumberOrUndefined2 = extractExpectedInputOrUnknown(
    tm.withExpectedInput(
        tm.withExpectedInput(
            tm.optional(tm.naturalNumber())
        )<number>()
    )<undefined>()
);

export const number_noExpectedInputSet = extractExpectedInputOrUnknown(
    tm.naturalNumber()
);
export const number_notUndefined = extractExpectedInputOrUnknown(
    tm.notUndefined(
        tm.orUndefined(tm.naturalNumber())
    )
);