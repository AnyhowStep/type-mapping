import {SafeMapper} from "../../mapper";
import {toTypeStr} from "../../type-util";
import {makeMappingError} from "../../error-util";
import {ErrorCode} from "../../error-code";

export function instanceOfArray () : SafeMapper<any[]> {
    return (name : string, mixed : unknown) : any[] => {
        if (!(mixed instanceof Array)) {
            throw makeMappingError({
                message : `${name} must be instance of Array; received ${toTypeStr(mixed)}`,
                inputName : name,
                actualValue : mixed,
                expected : "array",
                expectedMeta : {
                    errorCode : ErrorCode.EXPECTED_TYPE,
                },
            });
        }
        return mixed;
    };
}

export function instanceOfReadOnlyArray () : SafeMapper<readonly any[]> {
    return instanceOfArray();
}