import {SafeMapper} from "../../mapper";
import {makeMappingError} from "../../error-util";

/**
 * Use this if something is never supposed to have a value.
 * Not even `undefined`.
 *
 * For example, `never[]` can be,
 * ```ts
 * const arrayOfNever = array(never());
 * ```
 *
 * The only value that will satisfy this mapper is the empty array.
 */
export function never () : SafeMapper<never> {
    return (name : string, mixed : unknown) : never => {
        throw makeMappingError({
            message : `${name} must be never`,
            inputName : name,
            actualValue : mixed,
            expected : "never",
        });
    };
}