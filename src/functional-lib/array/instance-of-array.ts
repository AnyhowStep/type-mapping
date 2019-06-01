import {SafeMapper} from "../../mapper";
import {toTypeStr} from "../../type-util";

export function instanceOfArray () : SafeMapper<any[]> {
    return (name : string, mixed : unknown) : any[] => {
        if (!(mixed instanceof Array)) {
            throw new Error(`${name} must be instance of Array; received ${toTypeStr(mixed)}`);
        }
        return mixed;
    };
}
