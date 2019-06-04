import * as tm from "../../../../../../dist";
export declare const a: tm.Mapper<unknown, {
    foo: number;
    bar: string;
}> & tm.ExpectedInput<{
    foo: number;
    bar: string;
}> & tm.MappableInput<{
    a: number;
    b: string;
} | {
    foo: number;
    bar: string;
}>;
