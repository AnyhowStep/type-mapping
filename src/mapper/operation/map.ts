import {AnyMapper } from "../mapper";
import {OutputOf, ExpectedInputOf} from "../query";

export function map<F extends AnyMapper> (f : F, name : string, mixed : ExpectedInputOf<F>) : OutputOf<F> {
    return f(name, mixed);
};