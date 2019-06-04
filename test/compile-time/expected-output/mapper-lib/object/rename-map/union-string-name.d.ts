import * as tm from "../../../../../../dist";
export declare const a: tm.Mapper<unknown, {} & {
    [name: string]: string | number | undefined;
}> & tm.ExpectedInput<{
    [name: string]: undefined;
}> & tm.MappableInput<{
    foo: number & string;
} | {
    [name: string]: undefined;
}>;
