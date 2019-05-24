import * as tm from "../../../../dist";
import {AcceptsOfImpl} from "../../../../dist/accepts-of-impl";

type mixed_0 = tm.TypeMapDelegate<any, never>;
type mixed_1 = tm.TypeMapDelegate<unknown, never>;
type mixed_2 = tm.TypeMapDelegate<string, never>;
type mixed_3 = tm.TypeMapDelegate<number, never>;
type mixed_4 = tm.TypeMapDelegate<boolean, never>;
type mixed_5 = tm.TypeMapDelegate<string|number, never>;
type mixed_6 = tm.TypeMapDelegate<string|boolean, never>;

export const test_0 : AcceptsOfImpl<mixed_0> = (null as unknown);
export const test_1 : AcceptsOfImpl<mixed_1> = (null as unknown);
export const test_2 : AcceptsOfImpl<mixed_2> = (null as unknown);
export const test_3 : AcceptsOfImpl<mixed_3> = (null as unknown);
export const test_4 : AcceptsOfImpl<mixed_4> = (null as unknown);
export const test_5 : AcceptsOfImpl<mixed_5> = (null as unknown);
export const test_6 : AcceptsOfImpl<mixed_6> = (null as unknown);

//== unknown ==
//Accepts Only
export const test_7 : AcceptsOfImpl<tm.TypeMapDelegate<unknown, never> & tm.Accepts<string>> = (null as unknown);
export const test_8 : AcceptsOfImpl<tm.TypeMapDelegate<unknown, never> & tm.Accepts<string|number>> = (null as unknown);

//Both
export const test_9 : AcceptsOfImpl<tm.TypeMapDelegate<unknown, never> & tm.Accepts<string> & tm.CanAccept<number>> = (null as unknown);
export const test_10 : AcceptsOfImpl<tm.TypeMapDelegate<unknown, never> & tm.Accepts<string|number> & tm.CanAccept<boolean>> = (null as unknown);

//CanAccept Only
export const test_11 : AcceptsOfImpl<tm.TypeMapDelegate<unknown, never> & tm.CanAccept<number>> = (null as unknown);
export const test_12 : AcceptsOfImpl<tm.TypeMapDelegate<unknown, never> & tm.CanAccept<boolean|string>> = (null as unknown);

//== any ==
//Accepts Only
export const test_7b : AcceptsOfImpl<tm.TypeMapDelegate<any, never> & tm.Accepts<string>> = (null as unknown);
export const test_8b : AcceptsOfImpl<tm.TypeMapDelegate<any, never> & tm.Accepts<string|number>> = (null as unknown);

//Both
export const test_9b : AcceptsOfImpl<tm.TypeMapDelegate<any, never> & tm.Accepts<string> & tm.CanAccept<number>> = (null as unknown);
export const test_10b : AcceptsOfImpl<tm.TypeMapDelegate<any, never> & tm.Accepts<string|number> & tm.CanAccept<boolean>> = (null as unknown);

//CanAccept Only
export const test_11b : AcceptsOfImpl<tm.TypeMapDelegate<any, never> & tm.CanAccept<number>> = (null as unknown);
export const test_12b : AcceptsOfImpl<tm.TypeMapDelegate<any, never> & tm.CanAccept<boolean|string>> = (null as unknown);

//== Date ==
//Accepts Only
export const test_7c : AcceptsOfImpl<tm.TypeMapDelegate<Date, never> & tm.Accepts<string>> = (null as unknown);
export const test_8c : AcceptsOfImpl<tm.TypeMapDelegate<Date, never> & tm.Accepts<string|number>> = (null as unknown);

//Both
export const test_9c : AcceptsOfImpl<tm.TypeMapDelegate<Date, never> & tm.Accepts<string> & tm.CanAccept<number>> = (null as unknown);
export const test_10c : AcceptsOfImpl<tm.TypeMapDelegate<Date, never> & tm.Accepts<string|number> & tm.CanAccept<boolean>> = (null as unknown);

//CanAccept Only
export const test_11c : AcceptsOfImpl<tm.TypeMapDelegate<Date, never> & tm.CanAccept<number>> = (null as unknown);
export const test_12c : AcceptsOfImpl<tm.TypeMapDelegate<Date, never> & tm.CanAccept<boolean|string>> = (null as unknown);