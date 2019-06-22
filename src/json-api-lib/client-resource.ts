
import {
    SafeMapper,
    ExpectedInput,
} from "../mapper";
import {FluentMapper} from "../fluent-mapper";
import * as fLib from "../fluent-lib";
import {AttributeCollection, attributeCollection} from "./attribute-collection";
import {Relationship, relationship, ExpectedInputRelationship} from "./relationship";
import {LinkCollection, linkCollection, ExpectedInputLinkCollection} from "./link-collection";
import {Meta, meta} from "./meta";

/**
 *  @see {@link clientResource}
 */
export interface ClientResource {
    id: undefined|null|string;
    type: string;

    /** an attributes object representing some of the resource’s data. */
    attributes : undefined|null|AttributeCollection;
    /** a relationships object describing relationships between the resource and other JSON:API resources. */
    relationships : undefined|null|Relationship;
    /** a links object containing links related to the resource. */
    links: undefined|null|LinkCollection;
    /**
     * a meta object containing non-standard meta-information about a resource that can not be
     * represented as an attribute or relationship.
     */
    meta: undefined|null|Meta;
}
/**
 *  @see {@link clientResource}
 */
export interface ExpectedInputClientResource {
    id?: undefined|null|string;
    type: string;

    /** an attributes object representing some of the resource’s data. */
    attributes? : undefined|null|AttributeCollection;
    /** a relationships object describing relationships between the resource and other JSON:API resources. */
    relationships? : undefined|null|ExpectedInputRelationship;
    /** a links object containing links related to the resource. */
    links?: undefined|null|ExpectedInputLinkCollection;
    /**
     * a meta object containing non-standard meta-information about a resource that can not be
     * represented as an attribute or relationship.
     */
    meta?: undefined|null|Meta;
}
/**
 * https://jsonapi.org/format/1.0/#document-resource-objects
 *
 * “Resource objects” appear in a JSON:API document to represent resources.
 *
 * A resource object **MUST** contain at least the following top-level members:
 *
 * + `id`
 * + `type`
 *
 * Exception: The `id` member is not required when the resource object originates
 * at the client and represents a new resource to be created on the server.
 *
 * In addition, a resource object **MAY** contain any of these top-level members:
 *
 * + `attributes`: an attributes object representing some of the resource’s data.
 * + `relationships`: a relationships object describing relationships between the resource and other JSON:API resources.
 * + `links`: a links object containing links related to the resource.
 * + `meta`: a meta object containing non-standard meta-information about a resource that can not be
 *   represented as an attribute or relationship.
 *
 *  @see {@link attributeCollection}
 *  @see {@link relationship}
 *  @see {@link linkCollection}
 *  @see {@link meta}
 *  @see {@link ClientResource}
 *  @see {@link ExpectedInputClientResource}
 */
export const clientResource : (
    () => FluentMapper<SafeMapper<ClientResource> & ExpectedInput<ExpectedInputClientResource>>
) = () => fLib.object({
    id : fLib.string().orNull().optional(),
    type : fLib.string(),

    attributes : attributeCollection().orNull().optional(),
    relationships : relationship().orNull().optional(),
    links : linkCollection().orNull().optional(),
    meta : meta().orNull().optional(),
});
