import {AnyTypeMapDelegate} from "./type-map-delegate";
import {CanAcceptOfImpl} from "./can-accept-of-impl";
import {UnionToIntersection} from "./type-operation";

export type CanAcceptOf<F extends AnyTypeMapDelegate> = (
    Extract<
        UnionToIntersection<CanAcceptOfImpl<F>>,
        [any]
    >[0]
);