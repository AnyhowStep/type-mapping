import {SafeMapper} from "../../mapper";
import {unsafeAny} from "../any";
import {notMaybe} from "../operator";

/**
 * Is any type except `null` and `undefined`
 * ```ts
 * const _00 : NonMaybe = null;      //Error
 * const _01 : NonMaybe = undefined; //Error
 * const _02 : NonMaybe = 3;         //OK
 * const _03 : NonMaybe = "3";       //OK
 * const _04 : NonMaybe = [1,2,3];   //OK
 * const _05 : NonMaybe = new Date();//OK
 * ```
 */
export type NonMaybe = {};
export function nonMaybe () : SafeMapper<NonMaybe> {
    return notMaybe(unsafeAny());
}