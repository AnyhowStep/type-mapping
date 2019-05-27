import {AnyExtendedMapper, ExtendedMapper} from "../extended-mapper";

/**
    Implementation detail of `HandledInputOf<>`
*/
export type HandledInputOfImpl<F extends AnyExtendedMapper> = (
    F extends ExtendedMapper<infer T, any, any> ?
    [T] :
    never
);