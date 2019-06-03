import * as tm from "../../../../../../dist";
export declare const a: tm.Mapper<unknown, {
    foo: number | undefined;
    bar: string | undefined;
}> & tm.ExpectedInput<{
    isNotOptional: string | undefined;
} & {
    isOptional?: number | undefined;
}> & tm.MappableInput<{
    isNotOptional: string | undefined;
} & {
    isOptional?: number | undefined;
}>;
export declare const b: tm.Mapper<unknown, {
    foo: number | undefined;
    bar: string | undefined;
}> & tm.ExpectedInput<{
    isNotOptional: string | undefined;
    isOptionalButExpectNumber: number;
}> & tm.MappableInput<{
    isNotOptional: string | undefined;
} & {
    isOptionalButExpectNumber?: number | undefined;
}>;
