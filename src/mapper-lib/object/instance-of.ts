import {SafeMapper} from "../../mapper/safe-mapper";
import {allowsInstanceOf, toTypeStr} from "../../type-util";

export function instanceOf<T> (ctor : new (...args : any[]) => T) : (
    SafeMapper<T>
) {
    if (!allowsInstanceOf(ctor)) {
        throw new Error(`instanceof check not allowed on ${(ctor as any).name}`);
    }
    return (name : string, mixed : unknown) : T => {
        if (mixed instanceof ctor) {
            return mixed;
        } else {
            throw new Error(`${name} must be instance of ${(ctor as any).name}; received ${toTypeStr(mixed)}`);
        }
    };
}
