import {AnySafeMapper, OutputOf, ExpectedInputOf, MappableInputOf} from "../../mapper";

export type DocumentMapperArgs = (
    | {
        /** the document’s “primary data” */
        data : AnySafeMapper,
        /** a meta object that contains non-standard meta-information. */
        meta : AnySafeMapper,
    }
    | {
        /** the document’s “primary data” */
        data : AnySafeMapper,
        /** a meta object that contains non-standard meta-information. */
        meta? : undefined,
    }
    | {
        /** the document’s “primary data” */
        data? : undefined,
        /** a meta object that contains non-standard meta-information. */
        meta : AnySafeMapper,
    }
);

export type ToDocumentArgs<ArgsT extends DocumentMapperArgs> = (
    {
        data : (
            ArgsT["data"] extends AnySafeMapper ?
            OutputOf<ArgsT["data"]> :
            never
        ),
        meta : (
            ArgsT["meta"] extends AnySafeMapper ?
            OutputOf<ArgsT["meta"]> :
            never
        ),
    }
);
export type ToExpectedInputDocumentArgs<ArgsT extends DocumentMapperArgs> = (
    {
        data : (
            ArgsT["data"] extends AnySafeMapper ?
            ExpectedInputOf<ArgsT["data"]> :
            never
        ),
        meta : (
            ArgsT["meta"] extends AnySafeMapper ?
            ExpectedInputOf<ArgsT["meta"]> :
            never
        ),
    }
);
export type ToMappableInputDocumentArgs<ArgsT extends DocumentMapperArgs> = (
    {
        data : (
            ArgsT["data"] extends AnySafeMapper ?
            MappableInputOf<ArgsT["data"]> :
            never
        ),
        meta : (
            ArgsT["meta"] extends AnySafeMapper ?
            MappableInputOf<ArgsT["meta"]> :
            never
        ),
    }
);