import {AnyExtendedMapper} from "../extended-mapper";
import {RunTimeRequired} from "../run-time-required";

/**
    Attempts to extract the `RunTimeRequired` of a `Mapper<>`.
    If not found, returns `unknown`.
*/
export type ExtractRunTimeRequiredOrUnknown<F extends AnyExtendedMapper> = (
    F extends RunTimeRequired ?
    RunTimeRequired :
    unknown
);