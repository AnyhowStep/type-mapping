import {SafeMapper} from "../../mapper";
import {toTypeStr, isInstanceOf} from "../../type-util";
import {makeMappingError} from "../../error-util";

/**
    If you pass in a bigint object created by
    a polyfill, it will be rejected,
    even though it is technically an instance of `Object`.
*/
export function instanceOfObject () : SafeMapper<Object> {
    return (name : string, mixed : unknown) : Object => {
        if (isInstanceOf(mixed, Object)) {
            return mixed;
        } else {
            throw makeMappingError({
                message : `${name} must be instance of Object; received ${toTypeStr(mixed)}`,
                inputName : name,
                actualValue : mixed,
                expected : "Object",
            });
        }
    };
}