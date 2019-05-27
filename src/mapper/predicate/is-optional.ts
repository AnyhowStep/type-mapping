import {MappableInputOf, ExpectedInputOf} from "../query";
import {AnySafeMapper} from "../safe-mapper";
import {Optional} from "../optional";
import {isUndefinedMappable} from "./missing-value";

export type IsOptional<F extends AnySafeMapper> = (
    F extends Optional ?
    (
        undefined extends MappableInputOf<F> ?
        true :
        false
    ) :
    false
);

export type IsExpectedInputOptional<F extends AnySafeMapper> = (
    IsOptional<F> extends true ?
    (
        undefined extends ExpectedInputOf<F> ?
        true :
        false
    ) :
    false
);

export function isOptional (f : unknown) : f is Optional {
    if (typeof f != "function") {
        return false;
    }
    if ((f as any).__optional !== true) {
        return false;
    }
    if (!isUndefinedMappable(f as any)) {
        return false;
    }

    return true;
}