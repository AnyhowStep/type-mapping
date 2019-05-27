import {AnyExtendedMapper} from "../extended-mapper";
import {ExpectedInput} from "../expected-input";

/**
    Attempts to extract the `ExpectedInput<>` of a `Mapper<>`.
    If not found, returns `unknown`.

    Mostly used by factory functions that wrap one or more
    `Mapper<>` functions.
*/
export type ExtractExpectedInputOrUnknown<F extends AnyExtendedMapper> = (
    F extends ExpectedInput<infer T> ?
    ExpectedInput<T> :
    unknown
);