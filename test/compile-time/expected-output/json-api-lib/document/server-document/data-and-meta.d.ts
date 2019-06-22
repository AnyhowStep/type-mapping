import * as tm from "../../../../../../dist";
export declare const f: tm.FluentMapper<tm.Mapper<unknown, (tm.jsonApi.ServerDocumentBase & {
    data?: null | undefined;
    included?: null | undefined;
    errors: tm.jsonApi.ErrorObject[];
    meta?: null | undefined;
}) | (tm.jsonApi.ServerDocumentBase & {
    data: {
        someId: bigint;
    };
    included?: tm.jsonApi.ServerResource[] | null | undefined;
    errors?: null | undefined;
    meta: {
        someId2: bigint;
    };
})> & tm.ExpectedInput<(tm.jsonApi.ExpectedInputServerDocumentBase & {
    data?: null | undefined;
    included?: null | undefined;
    errors: tm.jsonApi.ExpectedInputErrorObject[];
    meta?: null | undefined;
}) | (tm.jsonApi.ExpectedInputServerDocumentBase & {
    data: {
        someId: string | bigint;
    };
    included?: tm.jsonApi.ExpectedInputServerResource[] | null | undefined;
    errors?: null | undefined;
    meta: {
        someId2: string | bigint;
    };
})> & tm.MappableInput<(tm.jsonApi.MappableInputServerDocumentBase & {
    data?: null | undefined;
    included?: null | undefined;
    errors: tm.jsonApi.ExpectedInputErrorObject[];
    meta?: null | undefined;
}) | (tm.jsonApi.MappableInputServerDocumentBase & {
    data: {
        someId: string | number | bigint;
    };
    included?: tm.jsonApi.ExpectedInputServerResource[] | null | undefined;
    errors?: null | undefined;
    meta: {
        someId2: string | number | bigint;
    };
})>>;
export declare const output_0: (tm.jsonApi.ServerDocumentBase & {
    data?: null | undefined;
    included?: null | undefined;
    errors: tm.jsonApi.ErrorObject[];
    meta?: null | undefined;
}) | (tm.jsonApi.ServerDocumentBase & {
    data: {
        someId: bigint;
    };
    included?: tm.jsonApi.ServerResource[] | null | undefined;
    errors?: null | undefined;
    meta: {
        someId2: bigint;
    };
});
