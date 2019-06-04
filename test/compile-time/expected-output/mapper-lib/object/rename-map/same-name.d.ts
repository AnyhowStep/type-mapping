import * as tm from "../../../../../../dist";
export declare const a: tm.Mapper<unknown, {
    foo: number & string;
}> & tm.ExpectedInput<{
    foo: number & string;
}> & tm.MappableInput<{
    a: number;
    b: string;
} | {
    foo: number & string;
}>;
