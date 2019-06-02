import {SafeMapper} from "../../mapper";
import {toTypeStr, isPojo} from "../../type-util";

/**
    Abbreviation for "Plain old JavasScript object".

    Meaning, an Object that isn't,

    + Date
    + Array
    + Function
    + An instance of some other class
*/
export function pojo () : SafeMapper<{ [k : string] : unknown }> {
    return (name : string, mixed : unknown) : { [k : string] : unknown } => {
        if (!isPojo(mixed)) {
            throw new Error(`${name} must be plain old JavaScript object; received ${toTypeStr(mixed)}`);
        }
        return mixed;
    };
}