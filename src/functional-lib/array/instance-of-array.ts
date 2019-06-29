import {SafeMapper} from "../../mapper";
import {toTypeStr} from "../../type-util";
import {makeMappingError} from "../../error-util";

export function instanceOfArray () : SafeMapper<any[]> {
    return (name : string, mixed : unknown) : any[] => {
        if (!(mixed instanceof Array)) {
            throw makeMappingError({
                message : `${name} must be instance of Array; received ${toTypeStr(mixed)}`,
                inputName : name,
                actualValue : mixed,
                expected : "array",
            });
        }
        return mixed;
    };
}
