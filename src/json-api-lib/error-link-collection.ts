import {
    SafeMapper,
    ExpectedInput,
} from "../mapper";
import {FluentMapper} from "../fluent-mapper";
import * as fLib from "../fluent-lib";
import {LinkCollection, ExpectedInputLinkCollection, linkCollection} from "./link-collection";
import {Link, ExpectedInputLink, link} from "./link";

/**
 *  @see {@link errorLinkCollection}
 *  @see {@link LinkCollection}
 */
export interface ErrorLinkCollection extends LinkCollection {
    /** a link that leads to further details about this particular occurrence of the problem. */
    about : Link
}
/**
 *  @see {@link errorLinkCollection}
 *  @see {@link ExpectedInputLinkCollection}
 */
export interface ExpectedInputErrorLinkCollection extends ExpectedInputLinkCollection {
    /** a link that leads to further details about this particular occurrence of the problem. */
    about : ExpectedInputLink
}
/**
 * https://jsonapi.org/format/1.0/#error-objects
 *
 * Error objects provide additional information about problems encountered while performing an operation.
 * Error objects **MUST** be returned as an array keyed by `errors` in the top level of a JSON:API document.
 *
 * An error object **MAY** have the following members:
 *
 * + `links`: a links object containing the following members:
 *   + `about`: a link that leads to further details about this particular occurrence of the problem.
 *
 *  @see {@link errorObject}
 *  @see {@link link}
 *  @see {@link ErrorLinkCollection}
 *  @see {@link ExpectedInputErrorLinkCollection}
 */
export const errorLinkCollection : (
    () => FluentMapper<SafeMapper<ErrorLinkCollection> & ExpectedInput<ExpectedInputErrorLinkCollection>>
) = () => fLib.deepMerge(
    linkCollection(),
    fLib.object({
        about : link()
    })
);