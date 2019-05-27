import * as tm from "../../../../../../dist";

declare function handledInputOfImpl<F extends tm.AnyMapper> (f : F) : tm.HandledInputOfImpl<F>;

declare const mixed_0 : tm.Mapper<any, never>;
declare const mixed_1 : tm.Mapper<unknown, never>;
declare const mixed_2 : tm.Mapper<string, never>;
declare const mixed_3 : tm.Mapper<number, never>;
declare const mixed_4 : tm.Mapper<boolean, never>;
declare const mixed_5 : tm.Mapper<string|number, never>;
declare const mixed_6 : tm.Mapper<string|boolean, never>;

export const test_0 = handledInputOfImpl(mixed_0);
export const test_1 = handledInputOfImpl(mixed_1);
export const test_2 = handledInputOfImpl(mixed_2);
export const test_3 = handledInputOfImpl(mixed_3);
export const test_4 = handledInputOfImpl(mixed_4);
export const test_5 = handledInputOfImpl(mixed_5);
export const test_6 = handledInputOfImpl(mixed_6);

//== unknown ==
//ExpectedInput Only
declare const test_7_foo : tm.Mapper<unknown, never> & tm.ExpectedInput<string>;
export const test_7 = handledInputOfImpl(test_7_foo);
declare const test_8_foo : tm.Mapper<unknown, never> & tm.ExpectedInput<string|number>;
export const test_8 = handledInputOfImpl(test_8_foo);

//Both
declare const test_9_foo : tm.Mapper<unknown, never> & tm.ExpectedInput<string> & tm.MappableInput<number>;
export const test_9 = handledInputOfImpl(test_9_foo);
declare const test_10_foo : tm.Mapper<unknown, never> & tm.ExpectedInput<string|number> & tm.MappableInput<boolean>;
export const test_10 = handledInputOfImpl(test_10_foo);

//MappableInput Only
declare const test_11_foo : tm.Mapper<unknown, never> & tm.MappableInput<number>;
export const test_11 = handledInputOfImpl(test_11_foo);
declare const test_12_foo : tm.Mapper<unknown, never> & tm.MappableInput<boolean|string>;
export const test_12 = handledInputOfImpl(test_12_foo);

//== any ==
//ExpectedInput Only
declare const test_7b_foo : tm.Mapper<any, never> & tm.ExpectedInput<string>;
export const test_7b = handledInputOfImpl(test_7b_foo);
declare const test_8b_foo : tm.Mapper<any, never> & tm.ExpectedInput<string|number>;
export const test_8b = handledInputOfImpl(test_8b_foo);

//Both
declare const test_9b_foo : tm.Mapper<any, never> & tm.ExpectedInput<string> & tm.MappableInput<number>;
export const test_9b = handledInputOfImpl(test_9b_foo);
declare const test_10b_foo : tm.Mapper<any, never> & tm.ExpectedInput<string|number> & tm.MappableInput<boolean>;
export const test_10b = handledInputOfImpl(test_10b_foo);

//MappableInput Only
declare const test_11b_foo : tm.Mapper<any, never> & tm.MappableInput<number>;
export const test_11b = handledInputOfImpl(test_11b_foo);
declare const test_12b_foo : tm.Mapper<any, never> & tm.MappableInput<boolean|string>;
export const test_12b = handledInputOfImpl(test_12b_foo);

//== Date ==
//ExpectedInput Only
declare const test_7c_foo : tm.Mapper<Date, never> & tm.ExpectedInput<string>;
export const test_7c = handledInputOfImpl(test_7c_foo);
declare const test_8c_foo : tm.Mapper<Date, never> & tm.ExpectedInput<string|number>;
export const test_8c = handledInputOfImpl(test_8c_foo);

//Both
declare const test_9c_foo : tm.Mapper<Date, never> & tm.ExpectedInput<string> & tm.MappableInput<number>;
export const test_9c = handledInputOfImpl(test_9c_foo);
declare const test_10c_foo : tm.Mapper<Date, never> & tm.ExpectedInput<string|number> & tm.MappableInput<boolean>;
export const test_10c = handledInputOfImpl(test_10c_foo);

//MappableInput Only
declare const test_11c_foo : tm.Mapper<Date, never> & tm.MappableInput<number>;
export const test_11c = handledInputOfImpl(test_11c_foo);
declare const test_12c_foo : tm.Mapper<Date, never> & tm.MappableInput<boolean|string>;
export const test_12c = handledInputOfImpl(test_12c_foo);
