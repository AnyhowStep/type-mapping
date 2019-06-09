import {
    AnySafeMapper,
    SafeMapper,
    OutputOf,
    ExpectedInput,
    ExpectedInputOf,
    MappableInput,
    MappableInputOf,
    Optional,
    ExtractNameOrUnknown,
    ExtractOptionalOrUnknown,
    ExtractRunTimeModifierOrUnknown,
    ExtractRunTimeRequiredOrUnknown,
    RunTimeRequired,
    copyName,
    copyOptional,
} from "../../mapper";
import {or} from "./or";
import {literal} from "../literal";
import {excludeLiteral} from "./exclude-literal";

export type OrUndefinedMapper<F extends AnySafeMapper> = (
    & SafeMapper<OutputOf<F>|undefined>
    & ExpectedInput<ExpectedInputOf<F>|undefined>
    & MappableInput<MappableInputOf<F>|undefined>
    & ExtractRunTimeModifierOrUnknown<F>
);
export function orUndefined<F extends AnySafeMapper> (f : F) : OrUndefinedMapper<F> {
    return or(
        f,
        literal(undefined)
    );
}
export type OrNullMapper<F extends AnySafeMapper> = (
    & SafeMapper<OutputOf<F>|null>
    & ExpectedInput<ExpectedInputOf<F>|null>
    & MappableInput<MappableInputOf<F>|null>
    & ExtractRunTimeModifierOrUnknown<F>
);
export function orNull<F extends AnySafeMapper> (f : F) : OrNullMapper<F> {
    return or(
        f,
        literal(null)
    );
}
export type OrMaybeMapper<F extends AnySafeMapper> = (
    & SafeMapper<OutputOf<F>|null|undefined>
    & ExpectedInput<ExpectedInputOf<F>|null|undefined>
    & MappableInput<MappableInputOf<F>|null|undefined>
    & ExtractRunTimeModifierOrUnknown<F>
);
export function orMaybe<F extends AnySafeMapper> (f : F) : OrMaybeMapper<F> {
    return or(
        f,
        literal(undefined, null)
    );
}

export type NotUndefinedMapper<F extends AnySafeMapper> = (
    & SafeMapper<Exclude<OutputOf<F>, undefined>>
    & ExpectedInput<Exclude<ExpectedInputOf<F>, undefined>>
    & MappableInput<Exclude<MappableInputOf<F>, undefined>>
    & ExtractRunTimeModifierOrUnknown<F>
);
export function notUndefined<F extends AnySafeMapper> (f : F) : NotUndefinedMapper<F> {
    return excludeLiteral(f, undefined);
}
export type NotNullMapper<F extends AnySafeMapper> = (
    & SafeMapper<Exclude<OutputOf<F>, null>>
    & ExpectedInput<Exclude<ExpectedInputOf<F>, null>>
    & MappableInput<Exclude<MappableInputOf<F>, null>>
    & ExtractRunTimeModifierOrUnknown<F>
);
export function notNull<F extends AnySafeMapper> (f : F) : NotNullMapper<F> {
    return excludeLiteral(f, null);
}
export type NotMaybeMapper<F extends AnySafeMapper> = (
    & SafeMapper<Exclude<OutputOf<F>, null|undefined>>
    & ExpectedInput<Exclude<ExpectedInputOf<F>, null|undefined>>
    & MappableInput<Exclude<MappableInputOf<F>, null|undefined>>
    & ExtractRunTimeModifierOrUnknown<F>
);
export function notMaybe<F extends AnySafeMapper> (assert : F) : NotMaybeMapper<F> {
    return excludeLiteral(assert, null, undefined);
}

/**
    Does not make sense to keep the `RunTimeRequired` flag
    if it is optional during compile-time
*/
export type OptionalMapper<F extends AnySafeMapper> = (
    & SafeMapper<OutputOf<F>|undefined>
    & ExpectedInput<ExpectedInputOf<F>|undefined>
    & MappableInput<MappableInputOf<F>|undefined>
    & ExtractNameOrUnknown<F>
    & Optional
);
export function optional<F extends AnySafeMapper> (
    f : F
) : (
    OptionalMapper<F>
) {
    const g : OrUndefinedMapper<F> = orUndefined(f);
    (g as any).__optional = true;
    (g as any).__runTimeRequired = false;
    return g as OrUndefinedMapper<F> & Optional;
};
export type NotOptionalMapper<F extends AnySafeMapper> = (
    & SafeMapper<Exclude<OutputOf<F>, undefined>>
    & ExpectedInput<Exclude<ExpectedInputOf<F>, undefined>>
    & MappableInput<Exclude<MappableInputOf<F>, undefined>>
    & ExtractNameOrUnknown<F>
    & ExtractRunTimeRequiredOrUnknown<F>
);
export function notOptional<F extends AnySafeMapper> (
    f : F
) : (
    NotOptionalMapper<F>
) {
    const g : NotUndefinedMapper<F> = notUndefined(f);
    (g as any).__optional = false;
    return g;
};

/**
    Does not make sense to keep the `Optional` compile-time flag
    if it is required during run-time.
*/
export type RunTimeRequiredMapper<F extends AnySafeMapper> = (
    & SafeMapper<OutputOf<F>>
    & ExpectedInput<ExpectedInputOf<F>>
    & MappableInput<MappableInputOf<F>>
    & ExtractNameOrUnknown<F>
    & RunTimeRequired
);
export function runTimeRequired<F extends AnySafeMapper> (
    f : F
) : (
    RunTimeRequiredMapper<F>
) {
    const g = (name : string, mixed : unknown) => {
        return f(name, mixed);
    };
    g.__runTimeRequired = true as const;
    g.__optional = false as const;
    return copyName(
        f,
        g
    );
};
export type NotRunTimeRequiredMapper<F extends AnySafeMapper> = (
    & SafeMapper<OutputOf<F>>
    & ExpectedInput<ExpectedInputOf<F>>
    & MappableInput<MappableInputOf<F>>
    & ExtractNameOrUnknown<F>
    & ExtractOptionalOrUnknown<F>
);
export function notRunTimeRequired<F extends AnySafeMapper> (
    f : F
) : (
    NotRunTimeRequiredMapper<F>
) {
    const g = (name : string, mixed : unknown) => {
        return f(name, mixed);
    };
    g.__runTimeRequired = false as const;
    return copyName(
        f,
        copyOptional(
            f,
            g
        )
    );
};