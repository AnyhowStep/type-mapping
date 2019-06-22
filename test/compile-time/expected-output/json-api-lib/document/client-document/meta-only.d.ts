import * as tm from "../../../../../../dist";
export declare const f: tm.FluentMapper<tm.Mapper<unknown, (tm.jsonApi.ClientDocumentBase & {
    data?: null | undefined;
    included?: null | undefined;
    errors: tm.jsonApi.ErrorObject[];
    meta?: null | undefined;
}) | (tm.jsonApi.ClientDocumentBase & {
    data?: null | undefined;
    included?: null | undefined;
    errors?: null | undefined;
    meta: {
        someId: bigint;
    };
})> & tm.ExpectedInput<(tm.jsonApi.ExpectedInputClientDocumentBase & {
    data?: null | undefined;
    included?: null | undefined;
    errors: tm.jsonApi.ExpectedInputErrorObject[];
    meta?: null | undefined;
}) | (tm.jsonApi.ExpectedInputClientDocumentBase & {
    data?: null | undefined;
    included?: null | undefined;
    errors?: null | undefined;
    meta: {
        someId: string | bigint;
    };
})> & tm.MappableInput<(tm.jsonApi.MappableInputClientDocumentBase & {
    data?: null | undefined;
    included?: null | undefined;
    errors: tm.jsonApi.ExpectedInputErrorObject[];
    meta?: null | undefined;
}) | (tm.jsonApi.MappableInputClientDocumentBase & {
    data?: null | undefined;
    included?: null | undefined;
    errors?: null | undefined;
    meta: {
        someId: string | number | bigint;
    };
})>>;
export declare const output_0: (tm.jsonApi.ClientDocumentBase & {
    data?: null | undefined;
    included?: null | undefined;
    errors: tm.jsonApi.ErrorObject[];
    meta?: null | undefined;
}) | (tm.jsonApi.ClientDocumentBase & {
    data?: null | undefined;
    included?: null | undefined;
    errors?: null | undefined;
    meta: {
        someId: bigint;
    };
});
