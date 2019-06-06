import * as tm from "../../../../../../dist";
export declare const a: tm.Mapper<unknown, {
    foo: number | boolean | undefined;
    isNotOptional: string | undefined;
}> & tm.ExpectedInput<{
    foo?: number | boolean | undefined;
    isNotOptional?: string | undefined;
}> & tm.MappableInput<{
    foo?: number | boolean | undefined;
    isNotOptional?: string | undefined;
}>;
