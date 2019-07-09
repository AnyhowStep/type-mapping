import {SafeMapper} from "../../mapper";
import {toTypeStr} from "../../type-util";
import {makeMappingError} from "../../error-util";

function undef () : SafeMapper<undefined> {
    return (name : string, mixed : unknown) : undefined => {
        //We do not mind === here.
        if (mixed === undefined) {
            return mixed;
        }
        throw makeMappingError({
            message : `${name} must be undefined; received ${toTypeStr(mixed)}`,
            inputName : name,
            actualValue : mixed,
            expected : "undefined",
            expectedMeta : {
                mappableValues : [undefined],
                outputValues : [undefined],
            },
        });
    };
}
export {undef as undefined};