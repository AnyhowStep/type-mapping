import * as tm from "../../../../../../dist";
export declare const a: tm.Mapper<unknown, {
    isNotOptional: string | undefined;
} & {
    [name: string]: number | undefined;
}> & tm.ExpectedInput<{
    isNotOptional?: string | undefined;
} & {
    [name: string]: number | undefined;
}> & tm.MappableInput<{
    isNotOptional?: string | undefined;
} & {
    [name: string]: number | undefined;
}>;
export declare const b: tm.Mapper<unknown, {
    isNotOptional: string | undefined;
} & {
    [name: string]: number | boolean | undefined;
}> & tm.ExpectedInput<{
    isNotOptional?: string | undefined;
} & {
    [name: string]: number | boolean | undefined;
}> & tm.MappableInput<{
    isNotOptional?: string | undefined;
} & {
    [name: string]: number | boolean | undefined;
}>;
