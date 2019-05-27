import {AnyExtendedMapper} from "../extended-mapper";

/**
    Gives you the return type of a `Mapper<>`
*/
export type OutputOf<F extends AnyExtendedMapper> = (
    ReturnType<F>
);