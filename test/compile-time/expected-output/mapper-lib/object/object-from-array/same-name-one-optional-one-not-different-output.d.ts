import * as tm from "../../../../../../dist";
export declare const a: tm.Mapper<unknown, {
    foo: number | undefined;
}> & tm.ExpectedInput<{} & {
    foo?: number | undefined;
}> & tm.MappableInput<{} & {
    foo?: number | undefined;
}>;
export declare const b: tm.Mapper<unknown, {
    foo: string | undefined;
}> & tm.ExpectedInput<{
    foo: string | undefined;
} & {}> & tm.MappableInput<{
    foo: string | undefined;
} & {}>;
export declare const c: tm.Mapper<unknown, {
    foo: string | number | undefined;
}> & tm.ExpectedInput<{
    foo: string | number | undefined;
} & {}> & tm.MappableInput<{
    foo: string | number | undefined;
} & {}>;
