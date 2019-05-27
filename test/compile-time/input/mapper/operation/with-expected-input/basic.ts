import * as tm from "../../../../../../dist";

export const expectNumber_mapNumberOrUndefined = tm.withExpectedInput(
    tm.orUndefined(tm.naturalNumber())
)<number>();
export const expectUndefined_mapNumberOrUndefined = tm.withExpectedInput(
    tm.orUndefined(tm.naturalNumber())
)<undefined>();

export const optional_expectNumber_mapNumberOrUndefined = tm.withExpectedInput(
    tm.optional(tm.naturalNumber())
)<number>();
export const optional_expectUndefined_mapNumberOrUndefined = tm.withExpectedInput(
    tm.optional(tm.naturalNumber())
)<undefined>();

export const expectNumber_mapNumberOrUndefined2 = tm.withExpectedInput(
    tm.withExpectedInput(
        tm.orUndefined(tm.naturalNumber())
    )<undefined>()
)<number>();
export const expectUndefined_mapNumberOrUndefined2 = tm.withExpectedInput(
    tm.withExpectedInput(
        tm.orUndefined(tm.naturalNumber())
    )<number>()
)<undefined>();

export const optional_expectNumber_mapNumberOrUndefined2 = tm.withExpectedInput(
    tm.withExpectedInput(
        tm.optional(tm.naturalNumber())
    )<undefined>()
)<number>();
export const optional_expectUndefined_mapNumberOrUndefined2 = tm.withExpectedInput(
    tm.withExpectedInput(
        tm.optional(tm.naturalNumber())
    )<number>()
)<undefined>();
