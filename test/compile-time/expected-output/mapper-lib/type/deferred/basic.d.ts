import * as tm from "../../../../../../dist";
interface Recursive {
    value: number;
    child?: Recursive;
}
export declare const recursive: tm.Mapper<unknown, {
    value: number;
    child: Recursive | undefined;
}> & tm.ExpectedInput<{
    value: number;
} & {
    child?: Recursive | undefined;
}> & tm.MappableInput<{
    value: number;
} & {
    child?: Recursive | undefined;
}>;
export declare const r: Recursive;
export declare const r2: tm.ExpectedInputOf<typeof recursive>;
export {};
