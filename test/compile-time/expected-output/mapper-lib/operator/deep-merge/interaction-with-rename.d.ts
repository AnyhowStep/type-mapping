import * as tm from "../../../../../../dist";
export declare const a: tm.Mapper<unknown, {
    dst: number;
}> & tm.ExpectedInput<{
    dst: number;
}> & tm.MappableInput<{
    src: number;
} | {
    dst: number;
}>;
export declare const b: tm.Mapper<unknown, {
    dst: number;
} & {
    dst2: string;
}> & tm.ExpectedInput<{
    dst: number;
} & {
    dst2: string;
}> & tm.MappableInput<({
    src: number;
} & {
    src2: string;
}) | ({
    src: number;
} & {
    dst2: string;
}) | ({
    dst: number;
} & {
    src2: string;
}) | ({
    dst: number;
} & {
    dst2: string;
})>;
export declare const c: tm.Mapper<unknown, number & string> & tm.ExpectedInput<number & string> & tm.MappableInput<number & string>;
