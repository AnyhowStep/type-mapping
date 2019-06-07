import {AnyMapper } from "../mapper";
import {OutputOf, ExpectedInputOf, MappableInputOf, HandledInputOf} from "../query";

/**
    Alias of `mapExpected<>()`
*/
export function map<F extends AnyMapper> (f : F, name : string, mixed : ExpectedInputOf<F>) : OutputOf<F> {
    return f(name, mixed);
};
export function mapExpected<F extends AnyMapper> (f : F, name : string, mixed : ExpectedInputOf<F>) : OutputOf<F> {
    return f(name, mixed);
};
export function mapMappable<F extends AnyMapper> (f : F, name : string, mixed : MappableInputOf<F>) : OutputOf<F> {
    return f(name, mixed);
};
/**
    You can just call `f(name, mixed)` directly.
    This is only provided for completeness.
*/
export function mapHandled<F extends AnyMapper> (f : F, name : string, mixed : HandledInputOf<F>) : OutputOf<F> {
    return f(name, mixed);
};