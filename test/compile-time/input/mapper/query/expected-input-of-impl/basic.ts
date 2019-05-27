import * as tm from "../../../../../../dist";

declare function expectedInputOfImpl<F extends tm.AnyMapper> (f : F) : tm.ExpectedInputOfImpl<F>;

declare const mixed_0 : tm.Mapper<any, never>;
declare const mixed_1 : tm.Mapper<unknown, never>;
declare const mixed_2 : tm.Mapper<string, never>;
declare const mixed_3 : tm.Mapper<number, never>;
declare const mixed_4 : tm.Mapper<boolean, never>;
declare const mixed_5 : tm.Mapper<string|number, never>;
declare const mixed_6 : tm.Mapper<string|boolean, never>;

export const test_0 = expectedInputOfImpl(mixed_0);
export const test_1 = expectedInputOfImpl(mixed_1);
export const test_2 = expectedInputOfImpl(mixed_2);
export const test_3 = expectedInputOfImpl(mixed_3);
export const test_4 = expectedInputOfImpl(mixed_4);
export const test_5 = expectedInputOfImpl(mixed_5);
export const test_6 = expectedInputOfImpl(mixed_6);

//== unknown ==
//ExpectedInput Only
declare const test_7_foo : tm.Mapper<unknown, never> & tm.ExpectedInput<string>;
export const test_7 = expectedInputOfImpl(test_7_foo);
declare const test_8_foo : tm.Mapper<unknown, never> & tm.ExpectedInput<string|number>;
export const test_8 = expectedInputOfImpl(test_8_foo);

//Both
declare const test_9_foo : tm.Mapper<unknown, never> & tm.ExpectedInput<string> & tm.MappableInput<number>;
export const test_9 = expectedInputOfImpl(test_9_foo);
declare const test_10_foo : tm.Mapper<unknown, never> & tm.ExpectedInput<string|number> & tm.MappableInput<boolean>;
export const test_10 = expectedInputOfImpl(test_10_foo);

//MappableInput Only
declare const test_11_foo : tm.Mapper<unknown, never> & tm.MappableInput<number>;
export const test_11 = expectedInputOfImpl(test_11_foo);
declare const test_12_foo : tm.Mapper<unknown, never> & tm.MappableInput<boolean|string>;
export const test_12 = expectedInputOfImpl(test_12_foo);

//== any ==
//ExpectedInput Only
declare const test_7b_foo : tm.Mapper<any, never> & tm.ExpectedInput<string>;
export const test_7b = expectedInputOfImpl(test_7b_foo);
declare const test_8b_foo : tm.Mapper<any, never> & tm.ExpectedInput<string|number>;
export const test_8b = expectedInputOfImpl(test_8b_foo);

//Both
declare const test_9b_foo : tm.Mapper<any, never> & tm.ExpectedInput<string> & tm.MappableInput<number>;
export const test_9b = expectedInputOfImpl(test_9b_foo);
declare const test_10b_foo : tm.Mapper<any, never> & tm.ExpectedInput<string|number> & tm.MappableInput<boolean>;
export const test_10b = expectedInputOfImpl(test_10b_foo);

//MappableInput Only
declare const test_11b_foo : tm.Mapper<any, never> & tm.MappableInput<number>;
export const test_11b = expectedInputOfImpl(test_11b_foo);
declare const test_12b_foo : tm.Mapper<any, never> & tm.MappableInput<boolean|string>;
export const test_12b = expectedInputOfImpl(test_12b_foo);

//== Date ==
//ExpectedInput Only
declare const test_7c_foo : tm.Mapper<Date, never> & tm.ExpectedInput<string>;
export const test_7c = expectedInputOfImpl(test_7c_foo);
declare const test_8c_foo : tm.Mapper<Date, never> & tm.ExpectedInput<string|number>;
export const test_8c = expectedInputOfImpl(test_8c_foo);

//Both
declare const test_9c_foo : tm.Mapper<Date, never> & tm.ExpectedInput<string> & tm.MappableInput<number>;
export const test_9c = expectedInputOfImpl(test_9c_foo);
declare const test_10c_foo : tm.Mapper<Date, never> & tm.ExpectedInput<string|number> & tm.MappableInput<boolean>;
export const test_10c = expectedInputOfImpl(test_10c_foo);

//MappableInput Only
declare const test_11c_foo : tm.Mapper<Date, never> & tm.MappableInput<number>;
export const test_11c = expectedInputOfImpl(test_11c_foo);
declare const test_12c_foo : tm.Mapper<Date, never> & tm.MappableInput<boolean|string>;
export const test_12c = expectedInputOfImpl(test_12c_foo);
