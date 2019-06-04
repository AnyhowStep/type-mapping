import * as tm from "../../../../../../dist";
export declare const a: tm.Mapper<unknown, {
    foo: number | undefined;
}> & tm.ExpectedInput<{
    x?: number | undefined;
}> & tm.MappableInput<{
    x?: number | undefined;
}>;
export declare const b: tm.Mapper<unknown, {
    foo: number | undefined;
}> & tm.ExpectedInput<{
    x: number | undefined;
}> & tm.MappableInput<{
    x: number | undefined;
}>;
export declare const c: tm.Mapper<unknown, {
    foo: number | undefined;
}> & tm.ExpectedInput<{
    y: number | undefined;
} & {
    x?: number | undefined;
}> & tm.MappableInput<{
    y: number | undefined;
} & {
    x?: number | undefined;
}>;
