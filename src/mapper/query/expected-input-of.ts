import {AnyExtendedMapper} from "../extended-mapper";
import {ExpectedInputOfImpl} from "./expected-input-of-impl";
import {UnionToIntersection} from "../../type-util";

/**
    Derives a sane type for what a `Mapper<>`
    expects to map.
*/
export type ExpectedInputOf<F extends AnyExtendedMapper> = (
    Extract<
        UnionToIntersection<ExpectedInputOfImpl<F>>,
        [any]
    >[0]
);