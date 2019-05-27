import * as tm from "../../../../../../dist";

declare function mappableInputOf<F extends tm.AnyMapper> (f : F) : tm.MappableInputOf<F>;

declare const mixed_0 : tm.Mapper<any, never>;
declare const mixed_1 : tm.Mapper<unknown, never>;
declare const mixed_2 : tm.Mapper<string, never>;
declare const mixed_3 : tm.Mapper<number, never>;
declare const mixed_4 : tm.Mapper<boolean, never>;
declare const mixed_5 : tm.Mapper<string|number, never>;
declare const mixed_6 : tm.Mapper<string|boolean, never>;

export const test_0 = mappableInputOf(mixed_0);
export const test_1 = mappableInputOf(mixed_1);
export const test_2 = mappableInputOf(mixed_2);
export const test_3 = mappableInputOf(mixed_3);
export const test_4 = mappableInputOf(mixed_4);
export const test_5 = mappableInputOf(mixed_5);
export const test_6 = mappableInputOf(mixed_6);

//== unknown ==
//ExpectedInput Only
declare const test_7_foo : tm.Mapper<unknown, never> & tm.ExpectedInput<string>;
export const test_7 = mappableInputOf(test_7_foo);
declare const test_8_foo : tm.Mapper<unknown, never> & tm.ExpectedInput<string|number>;
export const test_8 = mappableInputOf(test_8_foo);

//Both
declare const test_9_foo : tm.Mapper<unknown, never> & tm.ExpectedInput<string> & tm.MappableInput<number>;
export const test_9 = mappableInputOf(test_9_foo);
declare const test_10_foo : tm.Mapper<unknown, never> & tm.ExpectedInput<string|number> & tm.MappableInput<boolean>;
export const test_10 = mappableInputOf(test_10_foo);

//MappableInput Only
declare const test_11_foo : tm.Mapper<unknown, never> & tm.MappableInput<number>;
export const test_11 = mappableInputOf(test_11_foo);
declare const test_12_foo : tm.Mapper<unknown, never> & tm.MappableInput<boolean|string>;
export const test_12 = mappableInputOf(test_12_foo);

//== any ==
//ExpectedInput Only
declare const test_7b_foo : tm.Mapper<any, never> & tm.ExpectedInput<string>;
export const test_7b = mappableInputOf(test_7b_foo);
declare const test_8b_foo : tm.Mapper<any, never> & tm.ExpectedInput<string|number>;
export const test_8b = mappableInputOf(test_8b_foo);

//Both
declare const test_9b_foo : tm.Mapper<any, never> & tm.ExpectedInput<string> & tm.MappableInput<number>;
export const test_9b = mappableInputOf(test_9b_foo);
declare const test_10b_foo : tm.Mapper<any, never> & tm.ExpectedInput<string|number> & tm.MappableInput<boolean>;
export const test_10b = mappableInputOf(test_10b_foo);

//MappableInput Only
declare const test_11b_foo : tm.Mapper<any, never> & tm.MappableInput<number>;
export const test_11b = mappableInputOf(test_11b_foo);
declare const test_12b_foo : tm.Mapper<any, never> & tm.MappableInput<boolean|string>;
export const test_12b = mappableInputOf(test_12b_foo);

//== Date ==
//ExpectedInput Only
declare const test_7c_foo : tm.Mapper<Date, never> & tm.ExpectedInput<string>;
export const test_7c = mappableInputOf(test_7c_foo);
declare const test_8c_foo : tm.Mapper<Date, never> & tm.ExpectedInput<string|number>;
export const test_8c = mappableInputOf(test_8c_foo);

//Both
declare const test_9c_foo : tm.Mapper<Date, never> & tm.ExpectedInput<string> & tm.MappableInput<number>;
export const test_9c = mappableInputOf(test_9c_foo);
declare const test_10c_foo : tm.Mapper<Date, never> & tm.ExpectedInput<string|number> & tm.MappableInput<boolean>;
export const test_10c = mappableInputOf(test_10c_foo);

//MappableInput Only
declare const test_11c_foo : tm.Mapper<Date, never> & tm.MappableInput<number>;
export const test_11c = mappableInputOf(test_11c_foo);
declare const test_12c_foo : tm.Mapper<Date, never> & tm.MappableInput<boolean|string>;
export const test_12c = mappableInputOf(test_12c_foo);
