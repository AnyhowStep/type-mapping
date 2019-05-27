import {AnyExtendedMapper, ExtendedMapper} from "../extended-mapper";
import {ExpectedInput} from "../expected-input";
import {MappableInput} from "../mappable-input";
import {OutputOf} from "./output-of";

/**
    Implementation detail of `ExpectedInputOf<>`
*/
export type ExpectedInputOfImpl<F extends AnyExtendedMapper> = (
    F extends ExtendedMapper<infer T, any, any> ?
    (
        unknown extends T ?
        (
            F extends ExpectedInput<infer T> ?
            [T] :
            F extends MappableInput<infer T> ?
            [T] :
            [OutputOf<F>]
        ) :
        [T]
    ) :
    never
);