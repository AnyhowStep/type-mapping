import * as tm from "../../../../../../dist";
export declare const a: tm.Mapper<unknown, {
    foo: number | undefined;
}> & tm.ExpectedInput<{
    x?: number | undefined;
}> & tm.MappableInput<{
    x?: number | undefined;
}>;
export declare const b: tm.Mapper<unknown, {
    foo: string | undefined;
}> & tm.ExpectedInput<{
    x?: string | undefined;
}> & tm.MappableInput<{
    x?: string | undefined;
}>;
export declare const c: tm.Mapper<unknown, {
    foo: undefined;
}> & tm.ExpectedInput<{
    x?: number | undefined;
    y?: string | undefined;
}> & tm.MappableInput<{
    x?: number | undefined;
    y?: string | undefined;
}>;
