import * as tm from "../../../../../../dist";
export declare const a: tm.Mapper<unknown, {
    foo: number | undefined;
    bar: string | undefined;
}> & tm.ExpectedInput<{
    bar: string | undefined;
} & {
    foo?: number | undefined;
}> & tm.MappableInput<({
    isNotOptional: string | undefined;
} & {
    isOptional?: number | undefined;
}) | ({
    bar: string | undefined;
} & {
    foo?: number | undefined;
})>;
export declare const b: tm.Mapper<unknown, {
    foo: number | undefined;
    bar: string | undefined;
}> & tm.ExpectedInput<{
    foo: number;
    bar: string | undefined;
} & {}> & tm.MappableInput<({
    isNotOptional: string | undefined;
} & {
    isOptionalButExpectNumber?: number | undefined;
}) | ({
    bar: string | undefined;
} & {
    foo?: number | undefined;
})>;
