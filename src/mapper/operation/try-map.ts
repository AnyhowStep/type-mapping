import {AnyMapper} from "../mapper";
import {OutputOf, ExpectedInputOf, MappableInputOf, HandledInputOf} from "../query";
import {MappingError} from "../../mapping-error";
import {isMappingError, makeMappingError} from "../../error-util";

export type TryMapResult<T> = (
    | {
        success : true,
        value : T,
    }
    | {
        success : false,
        err : any,
        mappingError : MappingError,
    }
);
function tryMapImpl<F extends AnyMapper> (f : F, name : string, mixed : unknown) : TryMapResult<OutputOf<F>> {
    try {
        return {
            success : true,
            value : f(name, mixed),
        };
    } catch (err) {
        if (isMappingError(err)) {
            return {
                success : false,
                err,
                mappingError : err,
            };
        } else {
            return {
                success : false,
                err,
                mappingError : makeMappingError({
                    message : err.message,
                    inputName : name,
                    actualValue : mixed,
                    expected : undefined,

                    stack : err.stack,
                }),
            };
        }
    }
}
/**
    Alias of `tryMapExpected<>()`
*/
export function tryMap<F extends AnyMapper> (f : F, name : string, mixed : ExpectedInputOf<F>) : TryMapResult<OutputOf<F>> {
    return tryMapImpl(f, name, mixed);
};
export function tryMapExpected<F extends AnyMapper> (f : F, name : string, mixed : ExpectedInputOf<F>) : TryMapResult<OutputOf<F>> {
    return tryMapImpl(f, name, mixed);
};
export function tryMapMappable<F extends AnyMapper> (f : F, name : string, mixed : MappableInputOf<F>) : TryMapResult<OutputOf<F>> {
    return tryMapImpl(f, name, mixed);
};
export function tryMapHandled<F extends AnyMapper> (f : F, name : string, mixed : HandledInputOf<F>) : TryMapResult<OutputOf<F>> {
    return tryMapImpl(f, name, mixed);
};