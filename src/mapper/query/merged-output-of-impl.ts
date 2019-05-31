import {AnySafeMapper} from "../safe-mapper";
import {OutputOf} from "./output-of";

export type MergedOutputOfImpl<F extends AnySafeMapper> = (
    F extends AnySafeMapper ?
    [OutputOf<F>] :
    never
);