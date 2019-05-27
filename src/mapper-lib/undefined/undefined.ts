import {SafeMapper} from "../../mapper";
import {toTypeStr} from "../../type-util";

function undef () : SafeMapper<undefined> {
    return (name : string, mixed : unknown) : undefined => {
        //We do not mind === here.
        if (mixed === undefined) {
            return mixed;
        }
        throw new Error(`${name} must be undefined; received ${toTypeStr(mixed)}`);
    };
}
export {undef as undefined};