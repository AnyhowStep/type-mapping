import {AnyExtendedMapper} from "../extended-mapper";
import {Optional} from "../optional";

/**
    Attempts to extract the `Optional` of a `Mapper<>`.
    If not found, returns `unknown`.
*/
export type ExtractOptionalOrUnknown<F extends AnyExtendedMapper> = (
    F extends Optional ?
    Optional :
    unknown
);