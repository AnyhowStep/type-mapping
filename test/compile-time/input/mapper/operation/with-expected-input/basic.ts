import * as tm from "../../../../../../dist";

export const expectNumber_mapNumberOrUndefined = tm.withExpectedInput(
    tm.orUndefined(tm.unsignedInteger())
)<number>();
export const expectUndefined_mapNumberOrUndefined = tm.withExpectedInput(
    tm.orUndefined(tm.unsignedInteger())
)<undefined>();

export const optional_expectNumber_mapNumberOrUndefined = tm.withExpectedInput(
    tm.optional(tm.unsignedInteger())
)<number>();
export const optional_expectUndefined_mapNumberOrUndefined = tm.withExpectedInput(
    tm.optional(tm.unsignedInteger())
)<undefined>();

export const expectNumber_mapNumberOrUndefined2 = tm.withExpectedInput(
    tm.withExpectedInput(
        tm.orUndefined(tm.unsignedInteger())
    )<undefined>()
)<number>();
export const expectUndefined_mapNumberOrUndefined2 = tm.withExpectedInput(
    tm.withExpectedInput(
        tm.orUndefined(tm.unsignedInteger())
    )<number>()
)<undefined>();

export const optional_expectNumber_mapNumberOrUndefined2 = tm.withExpectedInput(
    tm.withExpectedInput(
        tm.optional(tm.unsignedInteger())
    )<undefined>()
)<number>();
export const optional_expectUndefined_mapNumberOrUndefined2 = tm.withExpectedInput(
    tm.withExpectedInput(
        tm.optional(tm.unsignedInteger())
    )<number>()
)<undefined>();
