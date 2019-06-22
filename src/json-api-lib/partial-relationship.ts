import {
    SafeMapper,
    ExpectedInput,
} from "../mapper";
import {FluentMapper} from "../fluent-mapper";
import * as fLib from "../fluent-lib";
import {LinkCollection, linkCollection, ExpectedInputLinkCollection} from "./link-collection";
import {ResourceLinkage, resourceLinkage, ExpectedInputResourceLinkage} from "./resource-linkage";
import {Meta, meta} from "./meta";

/**
 *  @see {@link partialRelationship}
*/
export interface PartialRelationship {
    /**
     * a links object containing at least one of the following:
     * + `self`: a link for the relationship itself (a “relationship link”).
     *   This link allows the client to directly manipulate the relationship.
     *   For example, removing an `author` through an `article`’s relationship URL would disconnect
     *   the person from the `article` without deleting the `people` resource itself.
     *   When fetched successfully, this link returns the linkage for the related resources as its primary data.
     *   (See Fetching Relationships.)
     * + `related`: a related resource link
     */
    links : undefined|null|LinkCollection;
    /** resource linkage */
    data : undefined|null|ResourceLinkage;
    /** a meta object that contains non-standard meta-information about the relationship. */
    meta : undefined|null|Meta;
}
/**
 *  @see {@link partialRelationship}
*/
export interface ExpectedInputPartialRelationship {
    /**
     * a links object containing at least one of the following:
     * + `self`: a link for the relationship itself (a “relationship link”).
     *   This link allows the client to directly manipulate the relationship.
     *   For example, removing an `author` through an `article`’s relationship URL would disconnect
     *   the person from the `article` without deleting the `people` resource itself.
     *   When fetched successfully, this link returns the linkage for the related resources as its primary data.
     *   (See Fetching Relationships.)
     * + `related`: a related resource link
     */
    links? : undefined|null|ExpectedInputLinkCollection;
    /** resource linkage */
    data? : undefined|null|ExpectedInputResourceLinkage;
    /** a meta object that contains non-standard meta-information about the relationship. */
    meta? : undefined|null|Meta;
}
/**
 * This is just a "partial" relationship because it does not
 * enforce the "at-least-one constraint"
 *
 * -----
 *
 *  @see {@link relationship}
 *  @see {@link linkCollection}
 *  @see {@link resourceLinkage}
 *  @see {@link meta}
 *  @see {@link PartialRelationship}
 *  @see {@link ExpectedInputPartialRelationship}
 */
export const partialRelationship : (
    () => FluentMapper<SafeMapper<PartialRelationship> & ExpectedInput<ExpectedInputPartialRelationship>>
) = () => fLib.object({
    links : linkCollection().orNull().optional(),
    data : resourceLinkage().orNull().optional(),
    meta : meta().orNull().optional(),
});