import {
    SafeMapper,
    ExpectedInput,
} from "../mapper";
import {FluentMapper} from "../fluent-mapper";
import * as fLib from "../fluent-lib";
import * as metaLib from "./meta";

/**
 *  @see {@link linkObject}
 */
export interface LinkObject {
    /** a string containing the link’s URL. */
    href : string,
    /** a meta object containing non-standard meta-information about the link. */
    meta : undefined|null|metaLib.Meta,
}
/**
 *  @see {@link linkObject}
 */
export interface ExpectedInputLinkObject {
    /** a string containing the link’s URL. */
    href : string,
    /** a meta object containing non-standard meta-information about the link. */
    meta? : undefined|null|metaLib.Meta,
}

/**
 * http://jsonapi.org/format/1.0/#document-links
 *
 * A link MUST be represented as either:
 *
 * + a string containing the link’s URL.
 * + an object (“link object”) which can contain the following members:
 *     + `href`: a string containing the link’s URL.
 *     + `meta`: a meta object containing non-standard meta-information about the link.
 *
 * The following self link is simply a URL:
 *
 * ```ts
 * "links": {
 *     "self": "http://example.com/posts"
 * }
 * ```
 *
 * The following related link includes a URL as well as meta-information about a related resource collection:
 *
 * ```ts
 * "links": {
 *     "related": {
 *         "href": "http://example.com/articles/1/comments",
 *         "meta": {
 *             "count": 10
 *         }
 *     }
 * }
 * ```
 *
 *  @see {@link meta}
 *  @see {@link LinkObject}
 *  @see {@link ExpectedInputLinkObject}
 */
export const linkObject : (
    () => FluentMapper<SafeMapper<LinkObject> & ExpectedInput<ExpectedInputLinkObject>>
) = () => fLib.object({
    /** a string containing the link’s URL. */
    href : fLib.string(),
    /** a meta object containing non-standard meta-information about the link. */
    meta : metaLib.meta().orNull().optional(),
});

/**
 *  @see {@link link}
 */
export type Link = string|LinkObject;
/**
 *  @see {@link link}
 */
export type ExpectedInputLink = string|ExpectedInputLinkObject;

/**
 * Some description
 *
 * http://jsonapi.org/format/1.0/#document-links
 *
 * A link MUST be represented as either:
 *
 * + a string containing the link’s URL.
 * + an object (“link object”) which can contain the following members:
 *   + `href`: a string containing the link’s URL.
 *   + `meta`: a meta object containing non-standard meta-information about the link.
 *
 * The following self link is simply a URL:
 *
 * ```ts
 * "links": {
 *     "self": "http://example.com/posts"
 * }
 * ```
 *
 * The following related link includes a URL as well as meta-information about a related resource collection:
 *
 * ```ts
 * "links": {
 *     "related": {
 *         "href": "http://example.com/articles/1/comments",
 *         "meta": {
 *             "count": 10
 *         }
 *     }
 * }
 * ```
 *
 *  @see {@link meta}
 *  @see {@link linkObject}
 *  @see {@link Link}
 *  @see {@link ExpectedInputLink}
 */
export const link : (
    () => FluentMapper<SafeMapper<Link> & ExpectedInput<ExpectedInputLink>>
) = () => fLib.or(
    fLib.string(),
    linkObject()
);
