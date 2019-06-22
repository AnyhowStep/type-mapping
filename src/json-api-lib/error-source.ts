import {SafeMapper, ExpectedInput} from "../mapper";
import {FluentMapper} from "../fluent-mapper";
import * as fLib from "../fluent-lib";

/**
 *  @see {@link errorSource}
 */
export interface ErrorSource {
    /**
     * a JSON Pointer [RFC6901](https://tools.ietf.org/html/rfc6901) to the associated entity in the request document
     * [e.g. "/data" for a primary data object, or "/data/attributes/title" for a specific attribute].
     */
    pointer : undefined|null|string;
    /** a string indicating which URI query parameter caused the error. */
    parameter : undefined|null|string;
}
/**
 *  @see {@link errorSource}
 */
export interface ExpectedInputErrorSource {
    /**
     * a JSON Pointer [RFC6901](https://tools.ietf.org/html/rfc6901) to the associated entity in the request document
     * [e.g. "/data" for a primary data object, or "/data/attributes/title" for a specific attribute].
     */
    pointer? : undefined|null|string;
    /** a string indicating which URI query parameter caused the error. */
    parameter? : undefined|null|string;
}
/**
 * https://jsonapi.org/format/1.0/#error-objects
 *
 * Error objects provide additional information about problems encountered while performing an operation.
 * Error objects **MUST** be returned as an array keyed by `errors` in the top level of a JSON:API document.
 *
 * An error object **MAY** have the following members:
 *
 * + `source`: an object containing references to the source of the error,
 *   optionally including any of the following members:
 *   + `pointer`: a JSON Pointer [RFC6901](https://tools.ietf.org/html/rfc6901) to the associated entity in the request document
 *     [e.g. "/data" for a primary data object, or "/data/attributes/title" for a specific attribute].
 *   + `parameter`: a string indicating which URI query parameter caused the error.
 *
 *  @see {@link errorObject}
 *  @see {@link ErrorSource}
 *  @see {@link ExpectedInputErrorSource}
 */
export const errorSource : (
    () => FluentMapper<SafeMapper<ErrorSource> & ExpectedInput<ExpectedInputErrorSource>>
) = () => fLib.object({
    pointer : fLib.string().orNull().optional(),
    parameter : fLib.string().orNull().optional(),
});
