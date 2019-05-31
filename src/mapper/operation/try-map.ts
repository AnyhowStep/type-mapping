import {AnyMapper } from "../mapper";
import {OutputOf, ExpectedInputOf} from "../query";

export type TryMapResult<T> = (
    | {
        success : true,
        value : T,
    }
    | {
        success : false,
        err : any,
    }
);
export function tryMap<F extends AnyMapper> (f : F, name : string, mixed : ExpectedInputOf<F>) : TryMapResult<OutputOf<F>> {
    try {
        return {
            success : true,
            value : f(name, mixed),
        };
    } catch (err) {
        return {
            success : false,
            err,
        };
    }
};