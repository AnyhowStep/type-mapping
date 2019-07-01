import {SafeMapper} from "../../mapper";
import {toTypeStr} from "../../type-util";
import {makeMappingError} from "../../error-util";

export function boolean () : SafeMapper<boolean> {
    return (name : string, mixed : unknown) : boolean => {
        if (typeof mixed != "boolean") {
            throw makeMappingError({
                message : `${name} must be boolean; received ${toTypeStr(mixed)}`,
                inputName : name,
                actualValue : mixed,
                expected : "boolean",
            });
        }
        return mixed;
    };
}