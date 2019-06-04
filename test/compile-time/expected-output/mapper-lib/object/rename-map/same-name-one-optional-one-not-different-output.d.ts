import * as tm from "../../../../../../dist";
export declare const a: tm.Mapper<unknown, {
    foo: number | undefined;
}> & tm.ExpectedInput<{
    foo?: number | undefined;
}> & tm.MappableInput<{
    x?: number | undefined;
} | {
    foo?: number | undefined;
}>;
export declare const b: tm.Mapper<unknown, {
    foo: string | undefined;
}> & tm.ExpectedInput<{
    foo: string | undefined;
}> & tm.MappableInput<{
    x: string | undefined;
} | {
    foo: string | undefined;
}>;
export declare const c: tm.Mapper<unknown, {
    foo: undefined;
}> & tm.ExpectedInput<{
    foo: undefined;
}> & tm.MappableInput<({
    y: string | undefined;
} & {
    x?: number | undefined;
}) | {
    foo: undefined;
}>;
