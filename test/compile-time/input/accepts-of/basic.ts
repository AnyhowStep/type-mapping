import * as tm from "../../../../dist";

type mixed_0 = tm.TypeMapDelegate<any, never>;
type mixed_1 = tm.TypeMapDelegate<unknown, never>;
type mixed_2 = tm.TypeMapDelegate<string, never>;
type mixed_3 = tm.TypeMapDelegate<number, never>;
type mixed_4 = tm.TypeMapDelegate<boolean, never>;
type mixed_5 = tm.TypeMapDelegate<string|number, never>;
type mixed_6 = tm.TypeMapDelegate<string|boolean, never>;

export const test_0 : tm.AcceptsOf<mixed_0> = (null as unknown);
export const test_1 : tm.AcceptsOf<mixed_1> = (null as unknown);
export const test_2 : tm.AcceptsOf<mixed_2> = (null as unknown);
export const test_3 : tm.AcceptsOf<mixed_3> = (null as unknown);
export const test_4 : tm.AcceptsOf<mixed_4> = (null as unknown);
export const test_5 : tm.AcceptsOf<mixed_5> = (null as unknown);
export const test_6 : tm.AcceptsOf<mixed_6> = (null as unknown);

//== unknown ==
//Accepts Only
export const test_7 : tm.AcceptsOf<tm.TypeMapDelegate<unknown, never> & tm.Accepts<string>> = (null as unknown);
export const test_8 : tm.AcceptsOf<tm.TypeMapDelegate<unknown, never> & tm.Accepts<string|number>> = (null as unknown);

//Both
export const test_9 : tm.AcceptsOf<tm.TypeMapDelegate<unknown, never> & tm.Accepts<string> & tm.CanAccept<number>> = (null as unknown);
export const test_10 : tm.AcceptsOf<tm.TypeMapDelegate<unknown, never> & tm.Accepts<string|number> & tm.CanAccept<boolean>> = (null as unknown);

//CanAccept Only
export const test_11 : tm.AcceptsOf<tm.TypeMapDelegate<unknown, never> & tm.CanAccept<number>> = (null as unknown);
export const test_12 : tm.AcceptsOf<tm.TypeMapDelegate<unknown, never> & tm.CanAccept<boolean|string>> = (null as unknown);

//== any ==
//Accepts Only
export const test_7b : tm.AcceptsOf<tm.TypeMapDelegate<any, never> & tm.Accepts<string>> = (null as unknown);
export const test_8b : tm.AcceptsOf<tm.TypeMapDelegate<any, never> & tm.Accepts<string|number>> = (null as unknown);

//Both
export const test_9b : tm.AcceptsOf<tm.TypeMapDelegate<any, never> & tm.Accepts<string> & tm.CanAccept<number>> = (null as unknown);
export const test_10b : tm.AcceptsOf<tm.TypeMapDelegate<any, never> & tm.Accepts<string|number> & tm.CanAccept<boolean>> = (null as unknown);

//CanAccept Only
export const test_11b : tm.AcceptsOf<tm.TypeMapDelegate<any, never> & tm.CanAccept<number>> = (null as unknown);
export const test_12b : tm.AcceptsOf<tm.TypeMapDelegate<any, never> & tm.CanAccept<boolean|string>> = (null as unknown);

//== Date ==
//Accepts Only
export const test_7c : tm.AcceptsOf<tm.TypeMapDelegate<Date, never> & tm.Accepts<string>> = (null as unknown);
export const test_8c : tm.AcceptsOf<tm.TypeMapDelegate<Date, never> & tm.Accepts<string|number>> = (null as unknown);

//Both
export const test_9c : tm.AcceptsOf<tm.TypeMapDelegate<Date, never> & tm.Accepts<string> & tm.CanAccept<number>> = (null as unknown);
export const test_10c : tm.AcceptsOf<tm.TypeMapDelegate<Date, never> & tm.Accepts<string|number> & tm.CanAccept<boolean>> = (null as unknown);

//CanAccept Only
export const test_11c : tm.AcceptsOf<tm.TypeMapDelegate<Date, never> & tm.CanAccept<number>> = (null as unknown);
export const test_12c : tm.AcceptsOf<tm.TypeMapDelegate<Date, never> & tm.CanAccept<boolean|string>> = (null as unknown);