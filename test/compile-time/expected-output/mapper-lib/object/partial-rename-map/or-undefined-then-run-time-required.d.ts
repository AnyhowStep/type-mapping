import * as tm from "../../../../../../dist";
export declare const a: tm.Mapper<unknown, {
    foo: number | undefined;
    bar: string | undefined;
}> & tm.ExpectedInput<{
    foo?: number | undefined;
    bar?: string | undefined;
}> & tm.MappableInput<{
    a?: number | undefined;
    b?: string | undefined;
} | {
    foo?: number | undefined;
    bar?: string | undefined;
}>;
