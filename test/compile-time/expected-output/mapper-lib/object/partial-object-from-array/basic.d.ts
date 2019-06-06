import * as tm from "../../../../../../dist";
export declare const a: tm.Mapper<unknown, {
    foo: string | number | undefined;
}> & tm.ExpectedInput<{
    foo?: string | number | undefined;
}> & tm.MappableInput<{
    foo?: string | number | undefined;
}>;
export declare const b: tm.Mapper<unknown, {
    foo: string | number | undefined;
}> & tm.ExpectedInput<{
    foo?: string | number | undefined;
}> & tm.MappableInput<{
    foo?: string | number | undefined;
}>;
export declare const c: typeof a;
export declare const d: typeof b;
