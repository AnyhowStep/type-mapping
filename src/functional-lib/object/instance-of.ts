import {SafeMapper} from "../../mapper";
import {allowsInstanceOf, toTypeStr, getCtorName, isInstanceOf} from "../../type-util";
import {makeMappingError} from "../../error-util";

export type InstanceOfMapper<T> = (
    SafeMapper<T>
);
/**
    If you pass in a bigint object created by
    a polyfill, it will never pass any `instanceof` checks,
    even though the polyfill could be done with an object.
*/
export function instanceOf<T> (ctor : new (...args : any[]) => T) : (
    InstanceOfMapper<T>
) {
    if (!allowsInstanceOf(ctor)) {
        throw new Error(`instanceof check not allowed on ${getCtorName(ctor)}`);
    }
    const ctorName = getCtorName(ctor);
    return (name : string, mixed : unknown) : T => {
        if (isInstanceOf(mixed, ctor)) {
            return mixed;
        } else {
            throw makeMappingError({
                message : `${name} must be instance of ${ctorName}; received ${toTypeStr(mixed)}`,
                inputName : name,
                actualValue : mixed,
                expected : ctorName,
                expectedMeta : {
                    ctor,
                },
            });
        }
    };
}
