import {SafeMapper} from "../../mapper";
import {toTypeStr} from "../../type-util";

export function instanceOfObject () : SafeMapper<Object> {
    return (name : string, mixed : unknown) : Object => {
        if (!(mixed instanceof Object)) {
            throw new Error(`${name} must be instance of Object; received ${toTypeStr(mixed)}`);
        }
        return mixed;
    };
}