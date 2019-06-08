import {AnyExtendedMapper, ExtendedMapper} from "./extended-mapper";
import {AnyMapper, Mapper} from "./mapper";
import {HandledInputOf, OutputOf, ExtraParamsOf} from "./query";
import {Optional} from "./optional";
import {ExtractNameOrUnknown} from "./operation";

/**
    The `ExpectedInput<>` and `MappableInput<>` parts
    of a `Mapper<>` are arbitrary metadata.

    However, they make returning `Mapper<>` functions
    with those parts difficult.

    This helper function makes it easier.

    Does not return a wrapper.

    -----

    TODO Handle `name`?
*/
export function mapper<
    OutputF extends AnyMapper & { __optional? : false }
> (
    f : (
        & Mapper<
            HandledInputOf<OutputF>,
            OutputOf<OutputF>
        >
        & ExtractNameOrUnknown<OutputF>
    )
) : (
    OutputF
);
export function mapper<
    OutputF extends AnyMapper & Optional
> (
    f : (
        & Mapper<
            HandledInputOf<OutputF>,
            OutputOf<OutputF>
        >
        & Optional
        & ExtractNameOrUnknown<OutputF>
    )
) : (
    OutputF
);
export function mapper<
    OutputF extends AnyExtendedMapper & { __optional? : false }
> (
    f : (
        & ExtendedMapper<
            HandledInputOf<OutputF>,
            OutputOf<OutputF>,
            ExtraParamsOf<OutputF>
        >
        & ExtractNameOrUnknown<OutputF>
    )
) : (
    OutputF
);
export function mapper<
    OutputF extends AnyExtendedMapper & Optional
> (
    f : (
        & ExtendedMapper<
            HandledInputOf<OutputF>,
            OutputOf<OutputF>,
            ExtraParamsOf<OutputF>
        >
        & Optional
        & ExtractNameOrUnknown<OutputF>
    )
) : (
    OutputF
);
export function mapper<
    OutputF extends AnyExtendedMapper
> (
    f : (
        ExtendedMapper<
            HandledInputOf<OutputF>,
            OutputOf<OutputF>,
            ExtraParamsOf<OutputF>
        >
    )
) : (
    OutputF
) {
    return f as any;
}