import {SafeMapper} from "../../mapper";
import {toTypeStr, isBigIntNativelySupported, isBigInt} from "../../type-util";

/**
    If you pass in a bigint object created by
    a polyfill, it will be rejected,
    even though it is technically an instance of `Object`.
*/
export function instanceOfObject () : SafeMapper<Object> {
    return (name : string, mixed : unknown) : Object => {
        if (
            !(mixed instanceof Object) ||
            (
                !isBigIntNativelySupported() &&
                isBigInt(mixed)
            )
        ) {
            throw new Error(`${name} must be instance of Object; received ${toTypeStr(mixed)}`);
        }
        return mixed;
    };
}