import {DocumentArgs} from "../document";
import {ClientResource, ExpectedInputClientResource} from "../client-resource";
import {ServerResource, ExpectedInputServerResource} from "../server-resource";
import {DocumentMapperArgs, ToDocumentArgs, ToExpectedInputDocumentArgs, ToMappableInputDocumentArgs} from "../document";
import {SafeMapper, ExpectedInput, MappableInput, OutputOf, ExpectedInputOf, MappableInputOf} from "../../mapper";
import {FluentMapper} from "../../fluent-mapper";
import * as fLib from "../../fluent-lib";

/**
 *  @see {@link __documentConstraintImpl}
 */
export interface __NonErrorDocumentConstraintImplArgs extends DocumentArgs {
    resource : ClientResource|ServerResource|ExpectedInputClientResource|ExpectedInputServerResource,
}
/**
 *  @see {@link __documentConstraintImpl}
 */
export type __NonErrorDocumentConstraintImpl<ArgsT extends __NonErrorDocumentConstraintImplArgs> = (
    ArgsT["data"] extends never ?
    (
        ArgsT["meta"] extends never ?
        //No data, no meta.
        //So, only `errors` possible.
        never :
        //No data, only meta
        {
            /** the document’s “primary data” */
            data? : null|undefined,
            /** an array of resource objects that are related to the primary data and/or each other (“included resources”). */
            included? : null|undefined,

            /** an array of error objects */
            errors? : null|undefined,

            /** a meta object that contains non-standard meta-information. */
            meta : ArgsT["meta"],
        }
    ) :
    ArgsT["meta"] extends never ?
    //Only data, no meta
    {
        /** the document’s “primary data” */
        data : ArgsT["data"],
        /** an array of resource objects that are related to the primary data and/or each other (“included resources”). */
        included? : undefined|null|((ArgsT["resource"])[]),

        /** an array of error objects */
        errors? : null|undefined,

        /** a meta object that contains non-standard meta-information. */
        meta? : null|undefined,
    } :
    //Has data, has meta
    {
        /** the document’s “primary data” */
        data : ArgsT["data"],
        /** an array of resource objects that are related to the primary data and/or each other (“included resources”). */
        included? : undefined|null|((ArgsT["resource"])[]),

        /** an array of error objects */
        errors? : null|undefined,

        /** a meta object that contains non-standard meta-information. */
        meta : ArgsT["meta"],
    }
);

/**
 *  @see {@link __documentConstraintImpl}
 */
export type __NonErrorDocumentConstraintImplMapperArgs = (
    & DocumentMapperArgs
    & {
        resource : SafeMapper<__NonErrorDocumentConstraintImplArgs["resource"]>,
    }
);

/**
 *  @see {@link __documentConstraintImpl}
 */
export type __NonErrorDocumentConstraintImplMapper<ArgsT extends __NonErrorDocumentConstraintImplMapperArgs> = (
    FluentMapper<
        & SafeMapper<
            __NonErrorDocumentConstraintImpl<
                & ToDocumentArgs<ArgsT>
                & {
                    resource : OutputOf<ArgsT["resource"]>,
                }
            >
        >
        & ExpectedInput<
            __NonErrorDocumentConstraintImpl<
                & ToExpectedInputDocumentArgs<ArgsT>
                & {
                    resource : ExpectedInputOf<ArgsT["resource"]>,
                }
            >
        >
        & MappableInput<
            __NonErrorDocumentConstraintImpl<
                & ToMappableInputDocumentArgs<ArgsT>
                & {
                    resource : MappableInputOf<ArgsT["resource"]>,
                }
            >
        >
    >
);

/**
 * Implements the constraints outlined in https://jsonapi.org/format/1.0/#document-top-level
 *
 *  @see {@link serverDocument}
 *  @see {@link clientDocument}
 *  @see {@link __DocumentConstraintImplMapper}
 *  @see {@link __DocumentConstraintImpl}
 */
export function __nonErrorDocumentConstraintImpl<ArgsT extends __NonErrorDocumentConstraintImplMapperArgs> (
    args : ArgsT
) : (
    __NonErrorDocumentConstraintImplMapper<ArgsT>
) {
    if (args.data == undefined) {
        if (args.meta == undefined) {
            throw new Error(`No data and meta mapper specified`);
        } else {
            return fLib.object({
                data : fLib.null().optional(),
                included : fLib.null().optional(),

                errors : fLib.null().optional(),

                meta : args.meta,
            }) as any;
        }
    } else if (args.meta == undefined) {
        return fLib.object({
            data : args.data,
            included : fLib.array(args.resource).orNull().optional(),

            errors : fLib.null().optional(),

            meta : fLib.null().optional(),
        }) as any;
    } else {
        return fLib.object({
            data : args.data,
            included : fLib.array(args.resource).orNull().optional(),

            errors : fLib.null().optional(),

            meta : args.meta,
        }) as any;
    }
}