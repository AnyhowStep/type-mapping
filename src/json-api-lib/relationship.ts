import {
    SafeMapper,
    ExpectedInput,
} from "../mapper";
import {FluentMapper} from "../fluent-mapper";
import * as fLib from "../fluent-lib";
import {PartialRelationship, ExpectedInputPartialRelationship, partialRelationship} from "./partial-relationship";
import {LinkCollection, linkCollection, ExpectedInputLinkCollection} from "./link-collection";
import {ResourceLinkage, resourceLinkage, ExpectedInputResourceLinkage} from "./resource-linkage";
import {Meta, meta} from "./meta";

/**
 *  @see {@link relationship}
 */
export type Relationship = (
    & PartialRelationship
    & (
        | { links : LinkCollection }
        | { data : ResourceLinkage }
        | { meta : Meta }
    )
);
/**
 *  @see {@link relationship}
 */
export type ExpectedInputRelationship = (
    & ExpectedInputPartialRelationship
    & (
        | { links : ExpectedInputLinkCollection }
        | { data : ExpectedInputResourceLinkage }
        | { meta : Meta }
    )
);
/**
 * https://jsonapi.org/format/1.0/#document-resource-object-relationships
 *
 * The value of the `relationships` key **MUST** be an object (a “relationships object”).
 * Members of the relationships object (“relationships”) represent references from the resource object
 * in which it’s defined to other resource objects.
 *
 * Relationships may be to-one or to-many.
 *
 * A “relationship object” **MUST** contain at least one of the following:
 *
 * + `links`: a links object containing at least one of the following:
 *   + `self`: a link for the relationship itself (a “relationship link”).
 *     This link allows the client to directly manipulate the relationship.
 *     For example, removing an `author` through an `article`’s relationship URL would disconnect
 *     the person from the `article` without deleting the `people` resource itself.
 *     When fetched successfully, this link returns the linkage for the related resources as its primary data.
 *     (See Fetching Relationships.)
 *   + `related`: a related resource link
 * + `data`: resource linkage
 * + `meta`: a meta object that contains non-standard meta-information about the relationship.
 *
 * A relationship object that represents a to-many relationship **MAY** also contain pagination links
 * under the `links` member, as described below.
 * Any pagination links in a relationship object **MUST** paginate the relationship data, not the related resources.
 *
 *  @see {@link partialRelationship}
 *  @see {@link Relationship}
 *  @see {@link ExpectedInputRelationship}
 */
export const relationship : (
    () => FluentMapper<SafeMapper<Relationship> & ExpectedInput<ExpectedInputRelationship>>
) = () => fLib.deepMerge(
    partialRelationship(),
    fLib.or(
        fLib.object({ links : linkCollection() }),
        fLib.object({ data : resourceLinkage() }),
        fLib.object({ meta : meta() }),
    )
);