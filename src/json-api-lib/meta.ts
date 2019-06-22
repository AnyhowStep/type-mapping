import * as fLib from "../fluent-lib";
import {SafeMapper} from "../mapper";
import {FluentMapper} from "../fluent-mapper";

/**
 *  @see {@link meta}
 */
export interface Meta {
    [k : string] : unknown;
};

/**
 * Must be a plain-old-JavaScript-object in this implementation
 *
 * https://jsonapi.org/format/1.0/#document-meta
 *
 * Where specified, a `meta` member can be used to include non-standard meta-information.
 * The value of each `meta` member **MUST** be an object (a “meta object”).
 *
 * Any members **MAY** be specified within `meta` objects.
 *
 * For example:
 *
 * ```ts
 * {
 *     "meta": {
 *         "copyright": "Copyright 2015 Example Corp.",
 *         "authors": [
 *             "Yehuda Katz",
 *             "Steve Klabnik",
 *             "Dan Gebhardt",
 *             "Tyler Kellen"
 *         ]
 *     },
 *     "data": {
 *         // ...
 *     }
 * }
 * ```
 *
 *  @see {@link pojo}
 *
 */
export const meta : () => FluentMapper<SafeMapper<Meta>> = fLib.pojo;