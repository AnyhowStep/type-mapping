import {SafeMapper, ExpectedInput} from "../mapper";
import {FluentMapper} from "../fluent-mapper";
import * as fLib from "../fluent-lib";
import {ErrorLinkCollection, ExpectedInputErrorLinkCollection, errorLinkCollection} from "./error-link-collection";
import {ErrorSource, ExpectedInputErrorSource, errorSource} from "./error-source";
import {Meta, meta} from "./meta";

/**
 *  @see {@link errorObject}
 */
export interface ErrorObject {
    /** a unique identifier for this particular occurrence of the problem. */
    id : undefined|null|string;
    /**
     * a links object containing the following members:
     * + `about`: a link that leads to further details about this particular occurrence of the problem.
     */
    links: undefined|null|ErrorLinkCollection;
    /** the HTTP status code applicable to this problem, expressed as a string value. */
    status: undefined|null|string;
    /** an application-specific error code, expressed as a string value. */
    code: undefined|null|string;
    /**
     * a short, human-readable summary of the problem that **SHOULD NOT**
     * change from occurrence to occurrence of the problem, except for purposes of localization.
     */
    title : undefined|null|string;
    /**
     * a human-readable explanation specific to this occurrence of the problem.
     * Like `title`, this field’s value can be localized.
     */
    detail : undefined|null|string;
    /**
     * an object containing references to the source of the error,
     * optionally including any of the following members:
     * + `pointer`: a JSON Pointer [RFC6901](https://tools.ietf.org/html/rfc6901) to the associated entity in the request document
     *   [e.g. "/data" for a primary data object, or "/data/attributes/title" for a specific attribute].
     * + `parameter`: a string indicating which URI query parameter caused the error.
     */
    source : undefined|null|ErrorSource;
    /** a meta object containing non-standard meta-information about the error. */
    meta : undefined|null|Meta;
}
/**
 *  @see {@link errorObject}
 */
export interface ExpectedInputErrorObject {
    /** a unique identifier for this particular occurrence of the problem. */
    id? : undefined|null|string;
    /**
     * a links object containing the following members:
     * + `about`: a link that leads to further details about this particular occurrence of the problem.
     */
    links?: undefined|null|ExpectedInputErrorLinkCollection;
    /** the HTTP status code applicable to this problem, expressed as a string value. */
    status?: undefined|null|string;
    /** an application-specific error code, expressed as a string value. */
    code?: undefined|null|string;
    /**
     * a short, human-readable summary of the problem that **SHOULD NOT**
     * change from occurrence to occurrence of the problem, except for purposes of localization.
     */
    title? : undefined|null|string;
    /**
     * a human-readable explanation specific to this occurrence of the problem.
     * Like `title`, this field’s value can be localized.
     */
    detail? : undefined|null|string;
    /**
     * an object containing references to the source of the error,
     * optionally including any of the following members:
     * + `pointer`: a JSON Pointer [RFC6901](https://tools.ietf.org/html/rfc6901) to the associated entity in the request document
     *   [e.g. "/data" for a primary data object, or "/data/attributes/title" for a specific attribute].
     * + `parameter`: a string indicating which URI query parameter caused the error.
     */
    source? : undefined|null|ExpectedInputErrorSource;
    /** a meta object containing non-standard meta-information about the error. */
    meta? : undefined|null|Meta;
}
/**
 * https://jsonapi.org/format/1.0/#error-objects
 *
 * Error objects provide additional information about problems encountered while performing an operation.
 * Error objects **MUST** be returned as an array keyed by `errors` in the top level of a JSON:API document.
 *
 * An error object **MAY** have the following members:
 *
 * + `id`: a unique identifier for this particular occurrence of the problem.
 * + `links`: a links object containing the following members:
 *   + `about`: a link that leads to further details about this particular occurrence of the problem.
 * + `status`: the HTTP status code applicable to this problem, expressed as a string value.
 * + `code`: an application-specific error code, expressed as a string value.
 * + `title`: a short, human-readable summary of the problem that **SHOULD NOT**
 *   change from occurrence to occurrence of the problem, except for purposes of localization.
 * + `detail`: a human-readable explanation specific to this occurrence of the problem.
 *   Like `title`, this field’s value can be localized.
 * + `source`: an object containing references to the source of the error,
 *   optionally including any of the following members:
 *   + `pointer`: a JSON Pointer [RFC6901](https://tools.ietf.org/html/rfc6901) to the associated entity in the request document
 *     [e.g. "/data" for a primary data object, or "/data/attributes/title" for a specific attribute].
 *   + `parameter`: a string indicating which URI query parameter caused the error.
 * + `meta`: a meta object containing non-standard meta-information about the error.
 *
 *  @see {@link errorLinkCollection}
 *  @see {@link errorSource}
 *  @see {@link meta}
 *  @see {@link ErrorObject}
 *  @see {@link ExpectedInputErrorObject}
 */
export const errorObject : (
    () => FluentMapper<SafeMapper<ErrorObject> & ExpectedInput<ExpectedInputErrorObject>>
) = () => fLib.object({
    id : fLib.string().orNull().optional(),
    links : errorLinkCollection().orNull().optional(),
    status : fLib.string().orNull().optional(),
    code : fLib.string().orNull().optional(),
    title : fLib.string().orNull().optional(),
    detail : fLib.string().orNull().optional(),
    source : errorSource().orNull().optional(),
    meta : meta().orNull().optional(),
});
