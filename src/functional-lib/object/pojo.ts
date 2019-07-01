import {SafeMapper} from "../../mapper";
import {toTypeStr, isPojo} from "../../type-util";
import {makeMappingError} from "../../error-util";

/**
 * Abbreviation for "Plain old JavasScript object".
 *
 * Meaning, an Object that isn't,
 *
 * + Date
 * + Array
 * + Function
 * + An instance of some other class
 */
export function pojo () : SafeMapper<{ [k : string] : unknown }> {
    return (name : string, mixed : unknown) : { [k : string] : unknown } => {
        if (!isPojo(mixed)) {
            throw makeMappingError({
                message : `${name} must be plain old JavaScript object; received ${toTypeStr(mixed)}`,
                inputName : name,
                actualValue : mixed,
                expected : "plain old JavaScript object",
            });
        }
        return mixed;
    };
}