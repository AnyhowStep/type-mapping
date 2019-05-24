import {AnyTypeMapDelegate} from "./type-map-delegate";
import {AcceptsOfImpl} from "./accepts-of-impl";
import {UnionToIntersection} from "./type-operation";

export type AcceptsOf<F extends AnyTypeMapDelegate> = (
    Extract<
        UnionToIntersection<AcceptsOfImpl<F>>,
        [any]
    >[0]
);