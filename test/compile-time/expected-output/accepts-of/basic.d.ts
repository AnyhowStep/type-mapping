import * as tm from "../../../../dist";
declare type mixed_0 = tm.TypeMapDelegate<any, never>;
declare type mixed_1 = tm.TypeMapDelegate<unknown, never>;
declare type mixed_2 = tm.TypeMapDelegate<string, never>;
declare type mixed_3 = tm.TypeMapDelegate<number, never>;
declare type mixed_4 = tm.TypeMapDelegate<boolean, never>;
declare type mixed_5 = tm.TypeMapDelegate<string | number, never>;
declare type mixed_6 = tm.TypeMapDelegate<string | boolean, never>;
export declare const test_0: tm.AcceptsOf<mixed_0>;
export declare const test_1: tm.AcceptsOf<mixed_1>;
export declare const test_2: tm.AcceptsOf<mixed_2>;
export declare const test_3: tm.AcceptsOf<mixed_3>;
export declare const test_4: tm.AcceptsOf<mixed_4>;
export declare const test_5: tm.AcceptsOf<mixed_5>;
export declare const test_6: tm.AcceptsOf<mixed_6>;
export declare const test_7: tm.AcceptsOf<tm.TypeMapDelegate<unknown, never> & tm.Accepts<string>>;
export declare const test_8: tm.AcceptsOf<tm.TypeMapDelegate<unknown, never> & tm.Accepts<string | number>>;
export declare const test_9: tm.AcceptsOf<tm.TypeMapDelegate<unknown, never> & tm.Accepts<string> & tm.CanAccept<number>>;
export declare const test_10: tm.AcceptsOf<tm.TypeMapDelegate<unknown, never> & tm.Accepts<string | number> & tm.CanAccept<boolean>>;
export declare const test_11: tm.AcceptsOf<tm.TypeMapDelegate<unknown, never> & tm.CanAccept<number>>;
export declare const test_12: tm.AcceptsOf<tm.TypeMapDelegate<unknown, never> & tm.CanAccept<boolean | string>>;
export declare const test_7b: tm.AcceptsOf<tm.TypeMapDelegate<any, never> & tm.Accepts<string>>;
export declare const test_8b: tm.AcceptsOf<tm.TypeMapDelegate<any, never> & tm.Accepts<string | number>>;
export declare const test_9b: tm.AcceptsOf<tm.TypeMapDelegate<any, never> & tm.Accepts<string> & tm.CanAccept<number>>;
export declare const test_10b: tm.AcceptsOf<tm.TypeMapDelegate<any, never> & tm.Accepts<string | number> & tm.CanAccept<boolean>>;
export declare const test_11b: tm.AcceptsOf<tm.TypeMapDelegate<any, never> & tm.CanAccept<number>>;
export declare const test_12b: tm.AcceptsOf<tm.TypeMapDelegate<any, never> & tm.CanAccept<boolean | string>>;
export declare const test_7c: tm.AcceptsOf<tm.TypeMapDelegate<Date, never> & tm.Accepts<string>>;
export declare const test_8c: tm.AcceptsOf<tm.TypeMapDelegate<Date, never> & tm.Accepts<string | number>>;
export declare const test_9c: tm.AcceptsOf<tm.TypeMapDelegate<Date, never> & tm.Accepts<string> & tm.CanAccept<number>>;
export declare const test_10c: tm.AcceptsOf<tm.TypeMapDelegate<Date, never> & tm.Accepts<string | number> & tm.CanAccept<boolean>>;
export declare const test_11c: tm.AcceptsOf<tm.TypeMapDelegate<Date, never> & tm.CanAccept<number>>;
export declare const test_12c: tm.AcceptsOf<tm.TypeMapDelegate<Date, never> & tm.CanAccept<boolean | string>>;
export {};
