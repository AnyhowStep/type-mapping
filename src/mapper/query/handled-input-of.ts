import {AnyExtendedMapper} from "../extended-mapper";
import {HandledInputOfImpl} from "./handled-input-of-impl";
import {UnionToIntersection} from "../../type-util";

/**
    Derives a sane type for what a `Mapper<>`
    can handle correctly.
*/
export type HandledInputOf<F extends AnyExtendedMapper> = (
    Extract<
        UnionToIntersection<HandledInputOfImpl<F>>,
        [any]
    >[0]
);