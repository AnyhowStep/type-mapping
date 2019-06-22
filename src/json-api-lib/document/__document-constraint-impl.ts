import {DocumentArgs} from "./document-args";
import {ErrorObject, ExpectedInputErrorObject} from "../error-object";
import {ClientResource, ExpectedInputClientResource} from "../client-resource";
import {ServerResource, ExpectedInputServerResource} from "../server-resource";
import { DocumentMapperArgs, ToDocumentArgs, ToExpectedInputDocumentArgs, ToMappableInputDocumentArgs } from "./document-mapper-args";
import { SafeMapper, ExpectedInput, MappableInput, OutputOf, ExpectedInputOf, MappableInputOf } from "../../mapper";
import { FluentMapper } from "../../fluent-mapper";
import * as fLib from "../../fluent-lib";

/**
 *  @see {@link __documentConstraintImpl}
 */
export interface __DocumentConstraintImplArgs extends DocumentArgs {
    errorObject : ErrorObject|ExpectedInputErrorObject,
    resource : ClientResource|ServerResource|ExpectedInputClientResource|ExpectedInputServerResource,
}
/**
 *  @see {@link __documentConstraintImpl}
 */
export type __DocumentConstraintImpl<ArgsT extends __DocumentConstraintImplArgs> = (
    ArgsT["data"] extends never ?
    (
        ArgsT["meta"] extends never ?
        //No data, no meta.
        //So, only `errors` possible.
        {
            /** the document’s “primary data” */
            data? : null|undefined,
            /** an array of resource objects that are related to the primary data and/or each other (“included resources”). */
            included? : null|undefined,

            /** an array of error objects */
            errors : (ArgsT["errorObject"])[],

            /** a meta object that contains non-standard meta-information. */
            meta? : null|undefined,
        } :
        //No data, only meta
        (
            | {
                /** the document’s “primary data” */
                data? : null|undefined,
                /** an array of resource objects that are related to the primary data and/or each other (“included resources”). */
                included? : null|undefined,

                /** an array of error objects */
                errors : (ArgsT["errorObject"])[],

                /** a meta object that contains non-standard meta-information. */
                meta? : null|undefined,
            }
            | {
                /** the document’s “primary data” */
                data? : null|undefined,
                /** an array of resource objects that are related to the primary data and/or each other (“included resources”). */
                included? : null|undefined,

                /** an array of error objects */
                errors? : null|undefined,

                /** a meta object that contains non-standard meta-information. */
                meta : ArgsT["meta"],
            }
        )
    ) :
    ArgsT["meta"] extends never ?
    //Only data, no meta
    (
        | {
            /** the document’s “primary data” */
            data? : null|undefined,
            /** an array of resource objects that are related to the primary data and/or each other (“included resources”). */
            included? : null|undefined,

            /** an array of error objects */
            errors : (ArgsT["errorObject"])[],

            /** a meta object that contains non-standard meta-information. */
            meta? : null|undefined,
        }
        | {
            /** the document’s “primary data” */
            data : ArgsT["data"],
            /** an array of resource objects that are related to the primary data and/or each other (“included resources”). */
            included? : undefined|null|((ArgsT["resource"])[]),

            /** an array of error objects */
            errors? : null|undefined,

            /** a meta object that contains non-standard meta-information. */
            meta? : null|undefined,
        }
    ) :
    //Has data, has meta
    (
        | {
            /** the document’s “primary data” */
            data? : null|undefined,
            /** an array of resource objects that are related to the primary data and/or each other (“included resources”). */
            included? : null|undefined,

            /** an array of error objects */
            errors : (ArgsT["errorObject"])[],

            /** a meta object that contains non-standard meta-information. */
            meta? : null|undefined,
        }
        | {
            /** the document’s “primary data” */
            data : ArgsT["data"],
            /** an array of resource objects that are related to the primary data and/or each other (“included resources”). */
            included? : undefined|null|((ArgsT["resource"])[]),

            /** an array of error objects */
            errors? : null|undefined,

            /** a meta object that contains non-standard meta-information. */
            meta : ArgsT["meta"],
        }
    )
);

/**
 *  @see {@link __documentConstraintImpl}
 */
export type __DocumentConstraintImplMapperArgs = (
    & DocumentMapperArgs
    & {
        errorObject : SafeMapper<__DocumentConstraintImplArgs["errorObject"]>,
        resource : SafeMapper<__DocumentConstraintImplArgs["resource"]>,
    }
);

/**
 *  @see {@link __documentConstraintImpl}
 */
export type __DocumentConstraintImplMapper<ArgsT extends __DocumentConstraintImplMapperArgs> = (
    FluentMapper<
        & SafeMapper<
            __DocumentConstraintImpl<
                & ToDocumentArgs<ArgsT>
                & {
                    errorObject : OutputOf<ArgsT["errorObject"]>,
                    resource : OutputOf<ArgsT["resource"]>,
                }
            >
        >
        & ExpectedInput<
            __DocumentConstraintImpl<
                & ToExpectedInputDocumentArgs<ArgsT>
                & {
                    errorObject : ExpectedInputOf<ArgsT["errorObject"]>,
                    resource : ExpectedInputOf<ArgsT["resource"]>,
                }
            >
        >
        & MappableInput<
            __DocumentConstraintImpl<
                & ToMappableInputDocumentArgs<ArgsT>
                & {
                    errorObject : MappableInputOf<ArgsT["errorObject"]>,
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
export function __documentConstraintImpl<ArgsT extends __DocumentConstraintImplMapperArgs> (
    args : ArgsT
) : (
    __DocumentConstraintImplMapper<ArgsT>
) {
    if (args.data == undefined) {
        if (args.meta == undefined) {
            return fLib.object({
                data : fLib.null().optional(),
                included : fLib.null().optional(),

                errors : fLib.array(args.errorObject),

                meta : fLib.null().optional(),
            }) as any;
        } else {
            return fLib.or(
                fLib.object({
                    data : fLib.null().optional(),
                    included : fLib.null().optional(),

                    errors : fLib.array(args.errorObject),

                    meta : fLib.null().optional(),
                }),
                fLib.object({
                    data : fLib.null().optional(),
                    included : fLib.null().optional(),

                    errors : fLib.null().optional(),

                    meta : args.meta,
                })
            ) as any;
        }
    } else if (args.meta == undefined) {
        return fLib.or(
            fLib.object({
                data : fLib.null().optional(),
                included : fLib.null().optional(),

                errors : fLib.array(args.errorObject),

                meta : fLib.null().optional(),
            }),
            fLib.object({
                data : args.data,
                included : fLib.array(args.resource).orNull().optional(),

                errors : fLib.null().optional(),

                meta : fLib.null().optional(),
            })
        ) as any;
    } else {
        return fLib.or(
            fLib.object({
                data : fLib.null().optional(),
                included : fLib.null().optional(),

                errors : fLib.array(args.errorObject),

                meta : fLib.null().optional(),
            }),
            fLib.object({
                data : args.data,
                included : fLib.array(args.resource).orNull().optional(),

                errors : fLib.null().optional(),

                meta : args.meta,
            })
        ) as any;
    }
}