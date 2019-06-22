import {
    SafeMapper,
    ExpectedInput,
} from "../mapper";
import {FluentMapper} from "../fluent-mapper";
import * as fLib from "../fluent-lib";
import {Link, link, ExpectedInputLink} from "./link";

/**
 *  @see {@link linkCollection}
*/
export interface LinkCollection {
    [field : string] : undefined|null|Link,
    //MAY have
    /** the link that generated the current response document. */
    self?    : undefined|null|Link,
    /** a related resource link when the primary data represents a resource relationship. */
    related? : undefined|null|Link,
    //MAY provide links to traverse a paginated data set (“pagination links”).
    /** the first page of data */
    first? : undefined|null|Link,
    /** the last page of data */
    last?  : undefined|null|Link,
    /** the previous page of data */
    prev?  : undefined|null|Link,
    /** the next page of data */
    next?  : undefined|null|Link,
}
/**
 *  @see {@link linkCollection}
*/
export interface ExpectedInputLinkCollection {
    [field : string] : undefined|null|ExpectedInputLink,
    //MAY have
    /** the link that generated the current response document. */
    self?    : undefined|null|ExpectedInputLink,
    /** a related resource link when the primary data represents a resource relationship. */
    related? : undefined|null|ExpectedInputLink,
    //MAY provide links to traverse a paginated data set (“pagination links”).
    /** the first page of data */
    first? : undefined|null|ExpectedInputLink,
    /** the last page of data */
    last?  : undefined|null|ExpectedInputLink,
    /** the previous page of data */
    prev?  : undefined|null|ExpectedInputLink,
    /** the next page of data */
    next?  : undefined|null|ExpectedInputLink,
}
/**
 * https://jsonapi.org/format/1.0/#document-links
 *
 * Where specified, a `links` member can be used to represent links.
 * The value of each `links` member **MUST** be an object (a “links object”).
 *
 * Each member of a links object is a “link”.
 *
 * -----
 *
 * https://jsonapi.org/format/1.0/#document-top-level
 *
 * The top-level links object **MAY** contain the following members:
 *
 * + `self`: the link that generated the current response document.
 * + `related`: a related resource link when the primary data represents a resource relationship.
 * + pagination links for the primary data.
 *
 * -----
 *
 * https://jsonapi.org/format/1.0/#fetching-pagination
 *
 * A server **MAY** choose to limit the number of resources returned in a
 * response to a subset (“page”) of the whole set available.
 *
 * A server **MAY** provide links to traverse a paginated data set (“pagination links”).
 *
 * Pagination links **MUST** appear in the links object that corresponds to a collection.
 * To paginate the primary data, supply pagination links in the top-level `links` object.
 * To paginate an included collection returned in a compound document,
 * supply pagination links in the corresponding links object.
 *
 * The following keys **MUST** be used for pagination links:
 *
 * + `first`: the first page of data
 * + `last`: the last page of data
 * + `prev`: the previous page of data
 * + `next`: the next page of data
 *
 * Keys **MUST** either be omitted or have a `null` value to indicate that a particular link is unavailable.
 *
 * Concepts of order, as expressed in the naming of pagination links,
 * **MUST** remain consistent with JSON:API’s sorting rules.
 *
 * The `page` query parameter is reserved for pagination.
 * Servers and clients **SHOULD** use this key for pagination operations.
 *
 * -----
 *
 *  @see {@link link}
 *  @see {@link LinkCollection}
 *  @see {@link ExpectedInputLinkCollection}
 */
export const linkCollection : (
    () => FluentMapper<SafeMapper<LinkCollection> & ExpectedInput<ExpectedInputLinkCollection>>
) = () => fLib.stringIndexer(
    link().orNull()
);
