import {SafeMapper} from "../../mapper";
import {toTypeStr} from "../../type-util";

export function boolean () : SafeMapper<boolean> {
    return (name : string, mixed : unknown) : boolean => {
        if (typeof mixed != "boolean") {
            throw new Error(`${name} must be boolean; received ${toTypeStr(mixed)}`);
        }
        return mixed;
    };
}