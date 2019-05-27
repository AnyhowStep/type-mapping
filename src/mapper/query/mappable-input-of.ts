import {AnyExtendedMapper} from "../extended-mapper";
import {MappableInputOfImpl} from "./mappable-input-of-impl";
import {UnionToIntersection} from "../../type-util";

/**
    Derives a sane type for what a `Mapper<>`
    can map successfully.
*/
export type MappableInputOf<F extends AnyExtendedMapper> = (
    Extract<
        UnionToIntersection<MappableInputOfImpl<F>>,
        [any]
    >[0]
);