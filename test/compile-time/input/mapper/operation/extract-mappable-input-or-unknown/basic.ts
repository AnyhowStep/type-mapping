import * as tm from "../../../../../../dist";

declare function extractMappableInputOrUnknown<F extends tm.AnyExtendedMapper> (f : F) : tm.ExtractMappableInputOrUnknown<F>;

export const expectNumber_mapNumberOrUndefined = extractMappableInputOrUnknown(
    tm.withExpectedInput(
        tm.orUndefined(tm.naturalNumber())
    )<number>()
);
export const expectUndefined_mapNumberOrUndefined = extractMappableInputOrUnknown(
    tm.withExpectedInput(
        tm.orUndefined(tm.naturalNumber())
    )<undefined>()
);

export const optional_expectNumber_mapNumberOrUndefined = extractMappableInputOrUnknown(
    tm.withExpectedInput(
        tm.optional(tm.naturalNumber())
    )<number>()
);
export const optional_expectUndefined_mapNumberOrUndefined = extractMappableInputOrUnknown(
    tm.withExpectedInput(
        tm.optional(tm.naturalNumber())
    )<undefined>()
);

export const expectNumber_mapNumberOrUndefined2 = extractMappableInputOrUnknown(
    tm.withExpectedInput(
        tm.withExpectedInput(
            tm.orUndefined(tm.naturalNumber())
        )<undefined>()
    )<number>()
);
export const expectUndefined_mapNumberOrUndefined2 = extractMappableInputOrUnknown(
    tm.withExpectedInput(
        tm.withExpectedInput(
            tm.orUndefined(tm.naturalNumber())
        )<number>()
    )<undefined>()
);

export const optional_expectNumber_mapNumberOrUndefined2 = extractMappableInputOrUnknown(
    tm.withExpectedInput(
        tm.withExpectedInput(
            tm.optional(tm.naturalNumber())
        )<undefined>()
    )<number>()
);
export const optional_expectUndefined_mapNumberOrUndefined2 = extractMappableInputOrUnknown(
    tm.withExpectedInput(
        tm.withExpectedInput(
            tm.optional(tm.naturalNumber())
        )<number>()
    )<undefined>()
);

export const number_noMappableInputSet = extractMappableInputOrUnknown(
    tm.naturalNumber()
);
export const number_notUndefined = extractMappableInputOrUnknown(
    tm.notUndefined(
        tm.orUndefined(tm.naturalNumber())
    )
);