import {SafeMapper} from "../../mapper";

/**
 * Prefer to use `unknown()` instead.
 */
export function unsafeAny () : SafeMapper<any> {
    return (_name : string, mixed : unknown) : any => {
        return mixed;
    };
}