import {AnyExtendedMapper, ExtendedMapper} from "../extended-mapper";

/**
    Implementation detail of `ExtraParamsOf<>`
*/
export type ExtraParamsOfImpl<F extends AnyExtendedMapper> = (
    F extends ExtendedMapper<any, any, infer T> ?
    [T] :
    never
);