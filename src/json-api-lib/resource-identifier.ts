import {
    SafeMapper,
    ExpectedInput,
} from "../mapper";
import {FluentMapper} from "../fluent-mapper";
import * as fLib from "../fluent-lib";
import {Meta, meta} from "./meta";

/**
 *  @see {@link resourceIdentifier}
 */
export interface ResourceIdentifier {
    type : string;
    id   : string;
    /**
     * A “resource identifier object” **MAY** also include a `meta` member,
     * whose value is a meta object that contains non-standard meta-information.
     */
    meta : undefined|null|Meta;
}

/**
 *  @see {@link resourceIdentifier}
 */
export interface ExpectedInputResourceIdentifier {
    type : string;
    id   : string;
    /**
     * A “resource identifier object” **MAY** also include a `meta` member,
     * whose value is a meta object that contains non-standard meta-information.
     */
    meta? : undefined|null|Meta;
}

/**
 * https://jsonapi.org/format/1.0/#document-resource-identifier-objects
 *
 * A “resource identifier object” is an object that identifies an individual resource.
 *
 * A “resource identifier object” **MUST** contain `type` and `id` members.
 *
 * A “resource identifier object” **MAY** also include a `meta` member,
 * whose value is a meta object that contains non-standard meta-information.
 *
 *  @see {@link meta}
 *  @see {@link ResourceIdentifier}
 *  @see {@link ExpectedInputResourceIdentifier}
 */
export const resourceIdentifier : (
    () => FluentMapper<SafeMapper<ResourceIdentifier> & ExpectedInput<ExpectedInputResourceIdentifier>>
) = () => fLib.object({
    type : fLib.string(),
    id : fLib.string(),
    meta : meta().orNull().optional(),
});
