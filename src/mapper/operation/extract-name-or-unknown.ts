import {AnyExtendedMapper} from "../extended-mapper";
import {Name} from "../name";

/**
    Attempts to extract the `Name<>` of a `Mapper<>`.
    If not found, returns `unknown`.

    Mostly used by functions that return an
    unmodified `Mapper<>`.
*/
export type ExtractNameOrUnknown<F extends AnyExtendedMapper> = (
    F extends Name<infer NameT> ?
    (
        string extends NameT ?
        unknown :
        Name<NameT>
    ) :
    unknown
);