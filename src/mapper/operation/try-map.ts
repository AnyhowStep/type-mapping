import {AnyMapper } from "../mapper";
import {OutputOf, ExpectedInputOf, MappableInputOf, HandledInputOf} from "../query";

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
/**
    Alias of `tryMapExpected<>()`
*/
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
export function tryMapExpected<F extends AnyMapper> (f : F, name : string, mixed : ExpectedInputOf<F>) : TryMapResult<OutputOf<F>> {
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
export function tryMapMappable<F extends AnyMapper> (f : F, name : string, mixed : MappableInputOf<F>) : TryMapResult<OutputOf<F>> {
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
export function tryMapHandled<F extends AnyMapper> (f : F, name : string, mixed : HandledInputOf<F>) : TryMapResult<OutputOf<F>> {
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