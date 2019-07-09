import {SafeMapper} from "../../mapper";
import {toTypeStr} from "../../type-util";
import {makeMappingError} from "../../error-util";

function nil () : SafeMapper<null> {
    return (name : string, mixed : unknown) : null => {
        //We do not mind === here.
        if (mixed === null) {
            return mixed;
        }
        throw makeMappingError({
            message : `${name} must be null; received ${toTypeStr(mixed)}`,
            inputName : name,
            actualValue : mixed,
            expected : "null",
            expectedMeta : {
                mappableValues : [null],
                outputValues : [null],
            }
        });
    };
}
export {nil as null};