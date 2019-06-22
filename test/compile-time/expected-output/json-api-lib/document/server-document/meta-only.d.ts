import * as tm from "../../../../../../dist";
export declare const f: tm.FluentMapper<tm.Mapper<unknown, (tm.jsonApi.ServerDocumentBase & {
    data?: null | undefined;
    included?: null | undefined;
    errors: tm.jsonApi.ErrorObject[];
    meta?: null | undefined;
}) | (tm.jsonApi.ServerDocumentBase & {
    data?: null | undefined;
    included?: null | undefined;
    errors?: null | undefined;
    meta: {
        someId: bigint;
    };
})> & tm.ExpectedInput<(tm.jsonApi.ExpectedInputServerDocumentBase & {
    data?: null | undefined;
    included?: null | undefined;
    errors: tm.jsonApi.ExpectedInputErrorObject[];
    meta?: null | undefined;
}) | (tm.jsonApi.ExpectedInputServerDocumentBase & {
    data?: null | undefined;
    included?: null | undefined;
    errors?: null | undefined;
    meta: {
        someId: string | bigint;
    };
})> & tm.MappableInput<(tm.jsonApi.MappableInputServerDocumentBase & {
    data?: null | undefined;
    included?: null | undefined;
    errors: tm.jsonApi.ExpectedInputErrorObject[];
    meta?: null | undefined;
}) | (tm.jsonApi.MappableInputServerDocumentBase & {
    data?: null | undefined;
    included?: null | undefined;
    errors?: null | undefined;
    meta: {
        someId: string | number | bigint;
    };
})>>;
export declare const output_0: (tm.jsonApi.ServerDocumentBase & {
    data?: null | undefined;
    included?: null | undefined;
    errors: tm.jsonApi.ErrorObject[];
    meta?: null | undefined;
}) | (tm.jsonApi.ServerDocumentBase & {
    data?: null | undefined;
    included?: null | undefined;
    errors?: null | undefined;
    meta: {
        someId: bigint;
    };
});
