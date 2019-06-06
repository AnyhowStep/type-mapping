import * as tm from "../../../../../../dist";
export declare const a: tm.Mapper<unknown, {
    foo: number | undefined;
    bar: string | undefined;
}> & tm.ExpectedInput<{
    foo?: number | undefined;
    bar?: string | undefined;
}> & tm.MappableInput<{
    isOptional?: number | undefined;
    isNotOptional?: string | undefined;
} | {
    foo?: number | undefined;
    bar?: string | undefined;
}>;
export declare const b: tm.Mapper<unknown, {
    foo: number | undefined;
    bar: string | undefined;
}> & tm.ExpectedInput<{
    foo?: number | undefined;
    bar?: string | undefined;
}> & tm.MappableInput<{
    isNotOptional?: string | undefined;
    isOptionalButExpectNumber?: number | undefined;
} | {
    foo?: number | undefined;
    bar?: string | undefined;
}>;
