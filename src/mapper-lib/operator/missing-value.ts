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
} from "../../mapper";
import {or} from "./or";
import {literal} from "../literal";
import {excludeLiteral} from "./exclude-literal";
import { getNameOrEmptyString } from "../../mapper/query";
import { setFunctionName } from "../../type-util";

export type OrUndefinedMapper<F extends AnySafeMapper> = (
    & SafeMapper<OutputOf<F>|undefined>
    & ExpectedInput<ExpectedInputOf<F>|undefined>
    & MappableInput<MappableInputOf<F>|undefined>
);
export function orUndefined<F extends AnySafeMapper> (f : F) : OrUndefinedMapper<F> {
    return or(
        literal(undefined),
        f
    );
}
export type OrNullMapper<F extends AnySafeMapper> = (
    & SafeMapper<OutputOf<F>|null>
    & ExpectedInput<ExpectedInputOf<F>|null>
    & MappableInput<MappableInputOf<F>|null>
);
export function orNull<F extends AnySafeMapper> (f : F) : OrNullMapper<F> {
    return or(
        literal(null),
        f
    );
}
export type OrMaybeMapper<F extends AnySafeMapper> = (
    & SafeMapper<OutputOf<F>|null|undefined>
    & ExpectedInput<ExpectedInputOf<F>|null|undefined>
    & MappableInput<MappableInputOf<F>|null|undefined>
);
export function orMaybe<F extends AnySafeMapper> (f : F) : OrMaybeMapper<F> {
    return or(
        literal(undefined, null),
        f
    );
}

export type NotUndefinedMapper<F extends AnySafeMapper> = (
    & SafeMapper<Exclude<OutputOf<F>, undefined>>
    & ExpectedInput<Exclude<ExpectedInputOf<F>, undefined>>
    & MappableInput<Exclude<MappableInputOf<F>, undefined>>
);
export function notUndefined<F extends AnySafeMapper> (f : F) : NotUndefinedMapper<F> {
    return excludeLiteral(f, undefined);
}
export type NotNullMapper<F extends AnySafeMapper> = (
    & SafeMapper<Exclude<OutputOf<F>, null>>
    & ExpectedInput<Exclude<ExpectedInputOf<F>, null>>
    & MappableInput<Exclude<MappableInputOf<F>, null>>
);
export function notNull<F extends AnySafeMapper> (f : F) : NotNullMapper<F> {
    return excludeLiteral(f, null);
}
export type NotMaybeMapper<F extends AnySafeMapper> = (
    & SafeMapper<Exclude<OutputOf<F>, null|undefined>>
    & ExpectedInput<Exclude<ExpectedInputOf<F>, null|undefined>>
    & MappableInput<Exclude<MappableInputOf<F>, null|undefined>>
);
export function notMaybe<F extends AnySafeMapper> (assert : F) : NotMaybeMapper<F> {
    return excludeLiteral(assert, null, undefined);
}

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
    const g = orUndefined(f);
    const result = (name : string, mixed : unknown) : OutputOf<F>|undefined => {
        return g(name, mixed);
    };
    result.name = getNameOrEmptyString(f);
    setFunctionName(result, result.name);
    result.__optional = true as const;
    return result as any;
};