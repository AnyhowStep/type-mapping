import * as tm from "../../../../../../dist";
export declare const a: tm.Mapper<unknown, {
    isOptional: number | undefined;
    iNotOptional: string | undefined;
}> & tm.ExpectedInput<{
    iNotOptional: string | undefined;
} & {
    isOptional?: number | undefined;
}> & tm.MappableInput<{
    iNotOptional: string | undefined;
} & {
    isOptional?: number | undefined;
}>;
export declare const b: tm.Mapper<unknown, {
    iNotOptional: string | undefined;
    isOptionalButExpectNumber: number | undefined;
}> & tm.ExpectedInput<{
    iNotOptional: string | undefined;
    isOptionalButExpectNumber: number;
} & {}> & tm.MappableInput<{
    iNotOptional: string | undefined;
} & {
    isOptionalButExpectNumber?: number | undefined;
}>;
