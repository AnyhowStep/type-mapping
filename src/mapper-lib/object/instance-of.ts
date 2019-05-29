import {SafeMapper} from "../../mapper/safe-mapper";
import {allowsInstanceOf, toTypeStr, getCtorName} from "../../type-util";

export function instanceOf<T> (ctor : new (...args : any[]) => T) : (
    SafeMapper<T>
) {
    if (!allowsInstanceOf(ctor)) {
        throw new Error(`instanceof check not allowed on ${getCtorName(name)}`);
    }
    return (name : string, mixed : unknown) : T => {
        if (mixed instanceof ctor) {
            return mixed;
        } else {
            throw new Error(`${name} must be instance of ${getCtorName(name)}; received ${toTypeStr(mixed)}`);
        }
    };
}
