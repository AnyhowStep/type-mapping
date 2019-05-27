import {SafeMapper} from "../../mapper";
import {toTypeStr} from "../../type-util";
import {finiteNumber} from "../number";
import {cache} from "../operator";

/**
    Must be a valid date.

    mixed.getTime() must be a finiteNumber.
*/
export function instanceOfDate () : SafeMapper<Date> {
    return cache(
        finiteNumber(),
        (name : string, mixed : unknown, unixTimestampMsDelegate) : Date => {
            if (!(mixed instanceof Date)) {
                throw new Error(`${name} must be instance of Date; received ${toTypeStr(mixed)}`);
            }
            const unixTimestampMs = mixed.getTime();
            unixTimestampMsDelegate(`${name}.getTime()`, unixTimestampMs);
            return mixed;
        }
    );
}
