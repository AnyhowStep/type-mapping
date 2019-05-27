import * as tm from "../../../../../../dist";

declare function mappableInputOfImpl<F extends tm.AnyMapper> (f : F) : tm.MappableInputOfImpl<F>;

declare const mixed_0 : tm.Mapper<any, never>;
declare const mixed_1 : tm.Mapper<unknown, never>;
declare const mixed_2 : tm.Mapper<string, never>;
declare const mixed_3 : tm.Mapper<number, never>;
declare const mixed_4 : tm.Mapper<boolean, never>;
declare const mixed_5 : tm.Mapper<string|number, never>;
declare const mixed_6 : tm.Mapper<string|boolean, never>;

export const test_0 = mappableInputOfImpl(mixed_0);
export const test_1 = mappableInputOfImpl(mixed_1);
export const test_2 = mappableInputOfImpl(mixed_2);
export const test_3 = mappableInputOfImpl(mixed_3);
export const test_4 = mappableInputOfImpl(mixed_4);
export const test_5 = mappableInputOfImpl(mixed_5);
export const test_6 = mappableInputOfImpl(mixed_6);

//== unknown ==
//ExpectedInput Only
declare const test_7_foo : tm.Mapper<unknown, never> & tm.ExpectedInput<string>;
export const test_7 = mappableInputOfImpl(test_7_foo);
declare const test_8_foo : tm.Mapper<unknown, never> & tm.ExpectedInput<string|number>;
export const test_8 = mappableInputOfImpl(test_8_foo);

//Both
declare const test_9_foo : tm.Mapper<unknown, never> & tm.ExpectedInput<string> & tm.MappableInput<number>;
export const test_9 = mappableInputOfImpl(test_9_foo);
declare const test_10_foo : tm.Mapper<unknown, never> & tm.ExpectedInput<string|number> & tm.MappableInput<boolean>;
export const test_10 = mappableInputOfImpl(test_10_foo);

//MappableInput Only
declare const test_11_foo : tm.Mapper<unknown, never> & tm.MappableInput<number>;
export const test_11 = mappableInputOfImpl(test_11_foo);
declare const test_12_foo : tm.Mapper<unknown, never> & tm.MappableInput<boolean|string>;
export const test_12 = mappableInputOfImpl(test_12_foo);

//== any ==
//ExpectedInput Only
declare const test_7b_foo : tm.Mapper<any, never> & tm.ExpectedInput<string>;
export const test_7b = mappableInputOfImpl(test_7b_foo);
declare const test_8b_foo : tm.Mapper<any, never> & tm.ExpectedInput<string|number>;
export const test_8b = mappableInputOfImpl(test_8b_foo);

//Both
declare const test_9b_foo : tm.Mapper<any, never> & tm.ExpectedInput<string> & tm.MappableInput<number>;
export const test_9b = mappableInputOfImpl(test_9b_foo);
declare const test_10b_foo : tm.Mapper<any, never> & tm.ExpectedInput<string|number> & tm.MappableInput<boolean>;
export const test_10b = mappableInputOfImpl(test_10b_foo);

//MappableInput Only
declare const test_11b_foo : tm.Mapper<any, never> & tm.MappableInput<number>;
export const test_11b = mappableInputOfImpl(test_11b_foo);
declare const test_12b_foo : tm.Mapper<any, never> & tm.MappableInput<boolean|string>;
export const test_12b = mappableInputOfImpl(test_12b_foo);

//== Date ==
//ExpectedInput Only
declare const test_7c_foo : tm.Mapper<Date, never> & tm.ExpectedInput<string>;
export const test_7c = mappableInputOfImpl(test_7c_foo);
declare const test_8c_foo : tm.Mapper<Date, never> & tm.ExpectedInput<string|number>;
export const test_8c = mappableInputOfImpl(test_8c_foo);

//Both
declare const test_9c_foo : tm.Mapper<Date, never> & tm.ExpectedInput<string> & tm.MappableInput<number>;
export const test_9c = mappableInputOfImpl(test_9c_foo);
declare const test_10c_foo : tm.Mapper<Date, never> & tm.ExpectedInput<string|number> & tm.MappableInput<boolean>;
export const test_10c = mappableInputOfImpl(test_10c_foo);

//MappableInput Only
declare const test_11c_foo : tm.Mapper<Date, never> & tm.MappableInput<number>;
export const test_11c = mappableInputOfImpl(test_11c_foo);
declare const test_12c_foo : tm.Mapper<Date, never> & tm.MappableInput<boolean|string>;
export const test_12c = mappableInputOfImpl(test_12c_foo);
