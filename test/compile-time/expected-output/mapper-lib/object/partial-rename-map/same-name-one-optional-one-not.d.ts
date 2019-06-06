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
    foo: number | undefined;
}> & tm.ExpectedInput<{
    foo?: number | undefined;
}> & tm.MappableInput<{
    x?: number | undefined;
} | {
    foo?: number | undefined;
}>;
export declare const c: tm.Mapper<unknown, {
    foo: number | undefined;
}> & tm.ExpectedInput<{
    foo?: number | undefined;
}> & tm.MappableInput<{
    x?: number | undefined;
    y?: number | undefined;
} | {
    foo?: number | undefined;
}>;
