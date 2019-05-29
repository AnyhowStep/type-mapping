import * as tm from "../../../../../../dist";

declare function extractMappableInputOrUnknown<F extends tm.AnyExtendedMapper> (f : F) : tm.ExtractMappableInputOrUnknown<F>;

export const expectNumber_mapNumberOrUndefined = extractMappableInputOrUnknown(
    tm.withExpectedInput(
        tm.orUndefined(tm.unsignedInteger())
    )<number>()
);
export const expectUndefined_mapNumberOrUndefined = extractMappableInputOrUnknown(
    tm.withExpectedInput(
        tm.orUndefined(tm.unsignedInteger())
    )<undefined>()
);

export const optional_expectNumber_mapNumberOrUndefined = extractMappableInputOrUnknown(
    tm.withExpectedInput(
        tm.optional(tm.unsignedInteger())
    )<number>()
);
export const optional_expectUndefined_mapNumberOrUndefined = extractMappableInputOrUnknown(
    tm.withExpectedInput(
        tm.optional(tm.unsignedInteger())
    )<undefined>()
);

export const expectNumber_mapNumberOrUndefined2 = extractMappableInputOrUnknown(
    tm.withExpectedInput(
        tm.withExpectedInput(
            tm.orUndefined(tm.unsignedInteger())
        )<undefined>()
    )<number>()
);
export const expectUndefined_mapNumberOrUndefined2 = extractMappableInputOrUnknown(
    tm.withExpectedInput(
        tm.withExpectedInput(
            tm.orUndefined(tm.unsignedInteger())
        )<number>()
    )<undefined>()
);

export const optional_expectNumber_mapNumberOrUndefined2 = extractMappableInputOrUnknown(
    tm.withExpectedInput(
        tm.withExpectedInput(
            tm.optional(tm.unsignedInteger())
        )<undefined>()
    )<number>()
);
export const optional_expectUndefined_mapNumberOrUndefined2 = extractMappableInputOrUnknown(
    tm.withExpectedInput(
        tm.withExpectedInput(
            tm.optional(tm.unsignedInteger())
        )<number>()
    )<undefined>()
);

export const number_noMappableInputSet = extractMappableInputOrUnknown(
    tm.unsignedInteger()
);
export const number_notUndefined = extractMappableInputOrUnknown(
    tm.notUndefined(
        tm.orUndefined(tm.unsignedInteger())
    )
);