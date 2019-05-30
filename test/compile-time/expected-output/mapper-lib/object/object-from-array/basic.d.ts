import * as tm from "../../../../../../dist";
export declare const a: tm.Mapper<unknown, {
    foo: string | number;
}> & tm.ExpectedInput<{
    foo: string | number;
} & {}> & tm.MappableInput<{
    foo: string | number;
} & {}>;
export declare const b: tm.Mapper<unknown, {
    foo: string | number;
}> & tm.ExpectedInput<{
    foo: string | number;
} & {}> & tm.MappableInput<{
    foo: string | number;
} & {}>;
export declare const c: typeof a;
export declare const d: typeof b;
