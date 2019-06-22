import {
    SafeMapper,
    ExpectedInput,
} from "../mapper";
import {FluentMapper} from "../fluent-mapper";
import * as fLib from "../fluent-lib";
import {ResourceIdentifier, ExpectedInputResourceIdentifier, resourceIdentifier} from "./resource-identifier";

/**
 *  @see {@link resourceLinkage}
 */
export type ResourceLinkage = (
    | ResourceIdentifier
    | (ResourceIdentifier[])
);
/**
 *  @see {@link resourceLinkage}
 */
export type ExpectedInputResourceLinkage = (
    | ExpectedInputResourceIdentifier
    | (ExpectedInputResourceIdentifier[])
);
/**
 * https://jsonapi.org/format/1.0/#document-resource-object-linkage
 *
 * Resource linkage in a compound document allows a client to link together
 * all of the included resource objects without having to `GET` any URLs via links.
 *
 * Resource linkage **MUST** be represented as one of the following:
 *
 * + `null` for empty to-one relationships.
 * + an empty array (`[]`) for empty to-many relationships.
 * + a single resource identifier object for non-empty to-one relationships.
 * + an array of resource identifier objects for non-empty to-many relationships.
 *
 * > Note: The spec does not impart meaning to order of resource identifier objects in linkage arrays of
 * > to-many relationships, although implementations may do that.
 * > Arrays of resource identifier objects may represent ordered or unordered relationships,
 * > and both types can be mixed in one response object.
 *
 *  @see {@link resourceIdentifier}
 */
export const resourceLinkage : (
    () => FluentMapper<SafeMapper<ResourceLinkage> & ExpectedInput<ExpectedInputResourceLinkage>>
) = () => fLib.or(
    resourceIdentifier(),
    fLib.array(resourceIdentifier())
);
