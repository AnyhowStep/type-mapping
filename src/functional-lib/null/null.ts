import {SafeMapper} from "../../mapper";
import {toTypeStr} from "../../type-util";

function nil () : SafeMapper<null> {
    return (name : string, mixed : unknown) : null => {
        //We do not mind === here.
        if (mixed === null) {
            return mixed;
        }
        throw new Error(`${name} must be null; received ${toTypeStr(mixed)}`);
    };
}
export {nil as null};