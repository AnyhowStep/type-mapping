import * as tm from "../../../../../../dist";
export declare const a: tm.Mapper<unknown, {
    dst: number;
} | {
    dst2: string;
}> & tm.ExpectedInput<{
    dst: number;
} | {
    dst2: string;
}> & tm.MappableInput<{
    src: number;
} | {
    dst: number;
} | {
    src2: string;
} | {
    dst2: string;
}>;
export declare const b: tm.Mapper<unknown, ({
    dst: number;
} & {
    dst3: boolean;
}) | ({
    dst2: string;
} & {
    dst3: boolean;
})> & tm.ExpectedInput<({
    dst: number;
} & {
    dst3: boolean;
}) | ({
    dst2: string;
} & {
    dst3: boolean;
})> & tm.MappableInput<({
    src: number;
} & {
    src3: boolean;
}) | ({
    src: number;
} & {
    dst3: boolean;
}) | ({
    dst: number;
} & {
    src3: boolean;
}) | ({
    dst: number;
} & {
    dst3: boolean;
}) | ({
    src2: string;
} & {
    src3: boolean;
}) | ({
    src2: string;
} & {
    dst3: boolean;
}) | ({
    dst2: string;
} & {
    src3: boolean;
}) | ({
    dst2: string;
} & {
    dst3: boolean;
})>;
