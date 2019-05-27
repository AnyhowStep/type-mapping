import {AnyExtendedMapper} from "../extended-mapper";
import {MappableInput} from "../mappable-input";

/**
    Attempts to extract the `MappableInput<>` of a `Mapper<>`.
    If not found, returns `unknown`.

    Mostly used by factory functions that wrap one or more
    `Mapper<>` functions.
*/
export type ExtractMappableInputOrUnknown<F extends AnyExtendedMapper> = (
    F extends MappableInput<infer T> ?
    MappableInput<T> :
    unknown
);