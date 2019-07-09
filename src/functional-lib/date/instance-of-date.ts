import {SafeMapper} from "../../mapper";
import {toTypeStr} from "../../type-util";
import {finiteNumber} from "../number";
import {makeMappingError} from "../../error-util";
import {ErrorCode} from "../../error-code";

/**
 * Must be a valid date.
 *
 * `mixed.getTime()` must be a finite number.
 */
export function instanceOfDate () : SafeMapper<Date> {
    const unixTimestampMsDelegate = finiteNumber();
    return (name : string, mixed : unknown) : Date => {
        if (!(mixed instanceof Date)) {
            throw makeMappingError({
                message : `${name} must be instance of Date; received ${toTypeStr(mixed)}`,
                inputName : name,
                actualValue : mixed,
                expected : "Date",
                expectedMeta : {
                    errorCode : ErrorCode.EXPECTED_TYPE,
                },
            });
        }
        const unixTimestampMs = mixed.getTime();
        unixTimestampMsDelegate(`${name}.getTime()`, unixTimestampMs);
        return mixed;
    };
}
