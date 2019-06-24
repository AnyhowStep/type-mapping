import {DocumentArgs} from "../document";
import {__NonErrorDocumentConstraintImplArgs, __NonErrorDocumentConstraintImpl, __nonErrorDocumentConstraintImpl} from "./__non-error-document-constraint-impl";
import {JsonApi, ExpectedInputJsonApi, jsonApi} from "../json-api";
import {LinkCollection, ExpectedInputLinkCollection, linkCollection} from "../link-collection";
import {ServerResource, ExpectedInputServerResource, serverResource} from "../server-resource";
import {DocumentMapperArgs, ToDocumentArgs, ToExpectedInputDocumentArgs, ToMappableInputDocumentArgs} from "../document";
import {FluentMapper} from "../../fluent-mapper";
import {SafeMapper, ExpectedInput, MappableInput,} from "../../mapper";
import * as fLib from "../../fluent-lib";

/**
 *  @see {@link serverDocument}
 */
export interface NonErrorServerDocumentBase {
    /** an object describing the server’s implementation */
    jsonapi: undefined|null|JsonApi,
    /** a links object related to the primary data. */
    links : undefined|null|LinkCollection,
}
/**
 *  @see {@link serverDocument}
 */
export type NonErrorServerDocument<ArgsT extends DocumentArgs> = (
    & NonErrorServerDocumentBase
    & __NonErrorDocumentConstraintImpl<
        & ArgsT
        & {
            resource : ServerResource,
        }
    >
);
/**
 *  @see {@link serverDocument}
 */
export interface ExpectedInputNonErrorServerDocumentBase {
    /** an object describing the server’s implementation */
    jsonapi?: undefined|null|ExpectedInputJsonApi,
    /** a links object related to the primary data. */
    links? : undefined|null|ExpectedInputLinkCollection,
}
/**
 *  @see {@link serverDocument}
 */
export type ExpectedInputNonErrorServerDocument<ArgsT extends DocumentArgs> = (
    & ExpectedInputNonErrorServerDocumentBase
    & __NonErrorDocumentConstraintImpl<
        & ArgsT
        & {
            resource : ExpectedInputServerResource,
        }
    >
);
/**
 *  @see {@link serverDocument}
 */
export interface MappableInputNonErrorServerDocumentBase {
    /** an object describing the server’s implementation */
    jsonapi?: undefined|null|ExpectedInputJsonApi,
    /** a links object related to the primary data. */
    links? : undefined|null|ExpectedInputLinkCollection,
}
/**
 *  @see {@link serverDocument}
 */
export type MappableInputNonErrorServerDocument<ArgsT extends DocumentArgs> = (
    & MappableInputNonErrorServerDocumentBase
    & __NonErrorDocumentConstraintImpl<
        & ArgsT
        & {
            resource : ExpectedInputServerResource,
        }
    >
);

/**
 *  @see {@link serverDocument}
 */
export type NonErrorServerDocumentMapper<ArgsT extends DocumentMapperArgs> = (
    FluentMapper<
        & SafeMapper<NonErrorServerDocument<ToDocumentArgs<ArgsT>>>
        & ExpectedInput<ExpectedInputNonErrorServerDocument<ToExpectedInputDocumentArgs<ArgsT>>>
        & MappableInput<MappableInputNonErrorServerDocument<ToMappableInputDocumentArgs<ArgsT>>>
    >
);
/**
 * In this implementation, you have to specify one of the following,
 *
 * + `data`
 * + `meta`
 * + both `data` and `meta`
 *
 * If both `data` and `meta` are specified, all documents without `errors` must also contain both.
 *
 * -----
 *
 * https://jsonapi.org/format/1.0/#document-top-level
 *
 * JSON object **MUST** be at the root of every JSON:API request and response containing data.
 * This object defines a document’s “top level”.
 *
 * A document **MUST** contain at least one of the following top-level members:
 *
 * + `data`: the document’s “primary data”
 * + `errors`: an array of error objects
 * + `meta`: a meta object that contains non-standard meta-information.
 *
 * The members `data` and `errors` **MUST NOT** coexist in the same document.
 *
 * A document **MAY** contain any of these top-level members:
 *
 * + `jsonapi`: an object describing the server’s implementation
 * + `links`: a links object related to the primary data.
 * + `included`: an array of resource objects that are related to the primary data and/or each other (“included resources”).
 *
 * If a document does not contain a top-level `data` key, the `included` member **MUST NOT** be present either.
 *
 * The top-level links object **MAY** contain the following members:
 *
 * + `self`: the link that generated the current response document.
 * + `related`: a related resource link when the primary data represents a resource relationship.
 * + pagination links for the primary data.
 *
 * The document’s “primary data” is a representation of the resource or collection of resources targeted by a request.
 *
 * Primary data **MUST** be either:
 *
 * + a single resource object, a single resource identifier object,
 *   or `null`, for requests that target single resources
 * + an array of resource objects, an array of resource identifier objects,
 *   or an empty array (`[]`), for requests that target resource collections
 *
 * A logical collection of resources **MUST** be represented as an array, even if it only contains one item or is empty.
 *
 * @param args - The data, or meta mappers (or both)
 *
 *  @see {@link ServerDocumentMapper}
 *  @see {@link ServerDocument}
 *  @see {@link ExpectedInputServerDocument}
 *  @see {@link MappableInputServerDocument}
 */
export function nonErrorServerDocument<ArgsT extends DocumentMapperArgs> (
    args : ArgsT
) : (
    NonErrorServerDocumentMapper<ArgsT>
) {
    const serverDocumentBase = {
        resource : serverResource(),
    };
    const impl =__nonErrorDocumentConstraintImpl<
        & DocumentMapperArgs
        & typeof serverDocumentBase
    >({
        ...args as DocumentMapperArgs,
        ...serverDocumentBase
    });
    const base = fLib.object({
        jsonapi : jsonApi().orNull().optional(),
        links : linkCollection().orNull().optional(),
    });
    return fLib.deepMerge(
        impl,
        base
    ) as any;
}