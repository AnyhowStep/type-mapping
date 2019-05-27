import {AnyExtendedMapper} from "../extended-mapper";
import {Optional} from "../optional";

/**
    Attempts to extract the `Optional` of a `Mapper<>`.
    If not found, returns `unknown`.

    Mostly used by functions that return an
    unmodified `Mapper<>`.
*/
export type ExtractOptionalOrUnknown<F extends AnyExtendedMapper> = (
    F extends Optional ?
    Optional :
    unknown
);