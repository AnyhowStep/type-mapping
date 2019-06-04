import {SafeMapper} from "../../mapper";
import {allowsInstanceOf, toTypeStr, getCtorName, isInstanceOf} from "../../type-util";

/**
    If you pass in a bigint object created by
    a polyfill, it will never pass any `instanceof` checks,
    even though the polyfill could be done with an object.
*/
export function instanceOf<T> (ctor : new (...args : any[]) => T) : (
    SafeMapper<T>
) {
    if (!allowsInstanceOf(ctor)) {
        throw new Error(`instanceof check not allowed on ${getCtorName(ctor)}`);
    }
    return (name : string, mixed : unknown) : T => {
        if (isInstanceOf(mixed, ctor)) {
            return mixed;
        } else {
            throw new Error(`${name} must be instance of ${getCtorName(ctor)}; received ${toTypeStr(mixed)}`);
        }
    };
}
