import * as tm from "../../../../../../dist";
export declare const a: tm.Mapper<unknown, {
    isOptional: number | undefined;
    isNotOptional: string | undefined;
}> & tm.ExpectedInput<{
    isNotOptional: string | undefined;
} & {
    isOptional?: number | undefined;
}> & tm.MappableInput<{} & {
    isOptional?: number | undefined;
    isNotOptional?: string | undefined;
}>;
export declare const b: tm.Mapper<unknown, {
    isNotOptional: string | undefined;
    isOptionalButExpectNumber: number | undefined;
}> & tm.ExpectedInput<{
    isNotOptional: string | undefined;
    isOptionalButExpectNumber: number;
} & {}> & tm.MappableInput<{} & {
    isNotOptional?: string | undefined;
    isOptionalButExpectNumber?: number | undefined;
}>;
