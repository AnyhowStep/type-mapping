import * as tm from "../../../../../../dist";

declare function extraParamsOfImpl<F extends tm.AnyExtendedMapper> (f : F) : tm.ExtraParamsOfImpl<F>;

declare const mixed_0 : tm.Mapper<any, never>;
declare const mixed_1 : tm.ExtendedMapper<unknown, never, []>;
declare const mixed_2 : tm.ExtendedMapper<string, never, [1]>;
declare const mixed_3 : tm.ExtendedMapper<number, never, [1,2,3]>;

export const test_0 = extraParamsOfImpl(mixed_0);
export const test_1 = extraParamsOfImpl(mixed_1);
export const test_2 = extraParamsOfImpl(mixed_2);
export const test_3 = extraParamsOfImpl(mixed_3);

declare const mixed_0b : (_0 : unknown, _1 : unknown) => unknown;
declare const mixed_1b : (_0 : unknown, _1 : unknown, _2 : 1) => unknown;
declare const mixed_2b : (_0 : unknown, _1 : unknown, _2 : 1, _3 : 2, _4 : 3) => unknown;

export const test_0b = extraParamsOfImpl(mixed_0b);
export const test_1b = extraParamsOfImpl(mixed_1b);
export const test_2b = extraParamsOfImpl(mixed_2b);