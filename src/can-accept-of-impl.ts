import {AnyTypeMapDelegate, TypeMapDelegate} from "./type-map-delegate";
import {Accepts} from "./accepts";
import {CanAccept} from "./can-accept";

export type CanAcceptOfImpl<F extends AnyTypeMapDelegate> = (
    F extends TypeMapDelegate<infer T, any> ?
    (
        unknown extends T ?
        (
            F extends CanAccept<infer T> ?
            [T] :
            F extends Accepts<infer T> ?
            [T] :
            [unknown]
        ) :
        [T]
    ) :
    never
);