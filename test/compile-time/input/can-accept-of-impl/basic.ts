import * as tm from "../../../../dist";
import {CanAcceptOfImpl} from "../../../../dist/can-accept-of-impl";

declare function canAcceptOf<F extends tm.AnyTypeMapDelegate> (f : F) : CanAcceptOfImpl<F>;

declare const mixed_0 : tm.TypeMapDelegate<any, never>;
declare const mixed_1 : tm.TypeMapDelegate<unknown, never>;
declare const mixed_2 : tm.TypeMapDelegate<string, never>;
declare const mixed_3 : tm.TypeMapDelegate<number, never>;
declare const mixed_4 : tm.TypeMapDelegate<boolean, never>;
declare const mixed_5 : tm.TypeMapDelegate<string|number, never>;
declare const mixed_6 : tm.TypeMapDelegate<string|boolean, never>;

export const test_0 = canAcceptOf(mixed_0);
export const test_1 = canAcceptOf(mixed_1);
export const test_2 = canAcceptOf(mixed_2);
export const test_3 = canAcceptOf(mixed_3);
export const test_4 = canAcceptOf(mixed_4);
export const test_5 = canAcceptOf(mixed_5);
export const test_6 = canAcceptOf(mixed_6);

//== unknown ==
//Accepts Only
declare const test_7_foo : tm.TypeMapDelegate<unknown, never> & tm.Accepts<string>;
export const test_7 = canAcceptOf(test_7_foo);
declare const test_8_foo : tm.TypeMapDelegate<unknown, never> & tm.Accepts<string|number>;
export const test_8 = canAcceptOf(test_8_foo);

//Both
declare const test_9_foo : tm.TypeMapDelegate<unknown, never> & tm.Accepts<string> & tm.CanAccept<number>;
export const test_9 = canAcceptOf(test_9_foo);
declare const test_10_foo : tm.TypeMapDelegate<unknown, never> & tm.Accepts<string|number> & tm.CanAccept<boolean>;
export const test_10 = canAcceptOf(test_10_foo);

//CanAccept Only
declare const test_11_foo : tm.TypeMapDelegate<unknown, never> & tm.CanAccept<number>;
export const test_11 = canAcceptOf(test_11_foo);
declare const test_12_foo : tm.TypeMapDelegate<unknown, never> & tm.CanAccept<boolean|string>;
export const test_12 = canAcceptOf(test_12_foo);

//== any ==
//Accepts Only
declare const test_7b_foo : tm.TypeMapDelegate<any, never> & tm.Accepts<string>;
export const test_7b = canAcceptOf(test_7b_foo);
declare const test_8b_foo : tm.TypeMapDelegate<any, never> & tm.Accepts<string|number>;
export const test_8b = canAcceptOf(test_8b_foo);

//Both
declare const test_9b_foo : tm.TypeMapDelegate<any, never> & tm.Accepts<string> & tm.CanAccept<number>;
export const test_9b = canAcceptOf(test_9b_foo);
declare const test_10b_foo : tm.TypeMapDelegate<any, never> & tm.Accepts<string|number> & tm.CanAccept<boolean>;
export const test_10b = canAcceptOf(test_10b_foo);

//CanAccept Only
declare const test_11b_foo : tm.TypeMapDelegate<any, never> & tm.CanAccept<number>;
export const test_11b = canAcceptOf(test_11b_foo);
declare const test_12b_foo : tm.TypeMapDelegate<any, never> & tm.CanAccept<boolean|string>;
export const test_12b = canAcceptOf(test_12b_foo);

//== Date ==
//Accepts Only
declare const test_7c_foo : tm.TypeMapDelegate<Date, never> & tm.Accepts<string>;
export const test_7c = canAcceptOf(test_7c_foo);
declare const test_8c_foo : tm.TypeMapDelegate<Date, never> & tm.Accepts<string|number>;
export const test_8c = canAcceptOf(test_8c_foo);

//Both
declare const test_9c_foo : tm.TypeMapDelegate<Date, never> & tm.Accepts<string> & tm.CanAccept<number>;
export const test_9c = canAcceptOf(test_9c_foo);
declare const test_10c_foo : tm.TypeMapDelegate<Date, never> & tm.Accepts<string|number> & tm.CanAccept<boolean>;
export const test_10c = canAcceptOf(test_10c_foo);

//CanAccept Only
declare const test_11c_foo : tm.TypeMapDelegate<Date, never> & tm.CanAccept<number>;
export const test_11c = canAcceptOf(test_11c_foo);
declare const test_12c_foo : tm.TypeMapDelegate<Date, never> & tm.CanAccept<boolean|string>;
export const test_12c = canAcceptOf(test_12c_foo);
