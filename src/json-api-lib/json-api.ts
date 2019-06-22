import {SafeMapper, ExpectedInput} from "../mapper";
import {FluentMapper} from "../fluent-mapper";
import * as fLib from "../fluent-lib";
import {Meta, meta} from "./meta";

/**
 *  @see {@link jsonApi}
 */
export interface JsonApi {
    /** a string indicating the highest JSON API version supported. */
    version: undefined|null|"1.0";
    /** a meta object that contains non-standard meta-information. */
    meta : undefined|null|Meta;
}
/**
 *  @see {@link jsonApi}
 */
export interface ExpectedInputJsonApi {
    /** a string indicating the highest JSON API version supported. */
    version?: undefined|null|"1.0";
    /** a meta object that contains non-standard meta-information. */
    meta? : undefined|null|Meta;
}
/**
 * https://jsonapi.org/format/1.0/#document-jsonapi-object
 *
 * A JSON:API document **MAY** include information about its implementation
 * under a top level `jsonapi` member. If present, the value of the `jsonapi`
 * member **MUST** be an object (a “jsonapi object”).
 *
 * The jsonapi object **MAY** contain a `version` member whose value
 * is a string indicating the highest JSON API version supported.
 * This object **MAY** also contain a `meta` member,
 * whose value is a meta object that contains non-standard meta-information.
 *
 * ```ts
 * {
 *   "jsonapi": {
 *     "version": "1.0"
 *   }
 * }
 * ```
 *
 * If the `version` member is not present,
 * clients should assume the server implements at least version 1.0 of the specification.
 *
 * > Note: Because JSON:API is committed to making additive changes only,
 * > the version string primarily indicates which new features a server may support.
 *
 *  @see {@link meta}
 *  @see {@link JsonApi}
 *  @see {@link ExpectedInputJsonApi}
 */
export const jsonApi : (
    () => FluentMapper<SafeMapper<JsonApi> & ExpectedInput<ExpectedInputJsonApi>>
) = () => fLib.object({
    version : fLib.literal("1.0").orNull().optional(),
    meta : meta().orNull().optional(),
});
