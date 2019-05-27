import {AnyExtendedMapper} from "../extended-mapper";
import {ExtraParamsOfImpl} from "./extra-params-of-impl";
import {UnionToIntersection} from "../../type-util";

/**
    Derives a sane type for what a `Mapper<>`
    has for extra parameters.
*/
export type ExtraParamsOf<F extends AnyExtendedMapper> = (
    Extract<
        UnionToIntersection<ExtraParamsOfImpl<F>>,
        [any]
    >[0]
);