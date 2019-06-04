import * as tm from "../../../../../../dist";
export declare const a: tm.Mapper<unknown, {
    foo: string | number;
}> & tm.ExpectedInput<{
    foo: number & string;
}> & tm.MappableInput<{
    foo: number & string;
}>;
