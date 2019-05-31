import {AnySafeMapper} from "../safe-mapper";
import {MergedOutputOfImpl} from "./merged-output-of-impl";
import {UnionToIntersection} from "../../type-util";

export type MergedOutputOf<F extends AnySafeMapper> = (
    Extract<
        UnionToIntersection<MergedOutputOfImpl<F>>,
        [any]
    >[0]
);