import {AnyExtendedMapper, ExtendedMapper} from "./extended-mapper";
import {AnyMapper, Mapper} from "./mapper";
import {HandledInputOf, OutputOf, ExtraParamsOf} from "./query";

/**
    The `ExpectedInput<>` and `MappableInput<>` parts
    of a `Mapper<>` are arbitrary metadata.

    However, they make returning `Mapper<>` functions
    with those parts difficult.

    This helper function makes it easier.
*/
export function mapper<
    OutputF extends AnyMapper
> (
    f : Mapper<
        HandledInputOf<OutputF>,
        OutputOf<OutputF>
    >
) : (
    OutputF
);
export function mapper<
    OutputF extends AnyExtendedMapper
> (
    f : ExtendedMapper<
        HandledInputOf<OutputF>,
        OutputOf<OutputF>,
        ExtraParamsOf<OutputF>
    >
) : (
    OutputF
);
export function mapper<
    OutputF extends AnyExtendedMapper
> (
    f : ExtendedMapper<
        HandledInputOf<OutputF>,
        OutputOf<OutputF>,
        ExtraParamsOf<OutputF>
    >
) : (
    OutputF
) {
    return f as any;
}