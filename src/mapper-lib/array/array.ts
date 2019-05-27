import {AnySafeMapper, SafeMapper} from "../../mapper";
import {OutputOf} from "../../mapper";
import {ExpectedInputOf} from "../../mapper";
import {ExpectedInput} from "../../mapper";
import {MappableInputOf} from "../../mapper";
import {MappableInput} from "../../mapper";
import {toTypeStr} from "../../type-util";
import {pipe} from "../operator";

export function instanceOfArray () : SafeMapper<any[]> {
    return (name : string, mixed : unknown) : any[] => {
        if (!(mixed instanceof Array)) {
            throw new Error(`${name} must be instance of Array; received ${toTypeStr(mixed)}`);
        }
        return mixed;
    };
}

export type ArrayMapper<
    F extends AnySafeMapper
> = (
    & SafeMapper<OutputOf<F>[]>
    & ExpectedInput<ExpectedInputOf<F>[]>
    & MappableInput<MappableInputOf<F>[]>
);

export function array<F extends AnySafeMapper> (f : F) : (
    ArrayMapper<F>
) {
    return pipe(
        instanceOfArray(),
        (name : string, mixed : any[]) => {
            let result : any[] = mixed;
            let isCopy = false;

            for (let i=0; i<mixed.length; ++i) {
                const cur = f(`${name}[${i}]`, mixed[i]);
                //We do not mind === here.
                //If either is a BigInt polyfill, we are okay with the copy.
                if (cur === mixed[i]) {
                    continue;
                }
                if (!isCopy) {
                    result = result.slice();
                    isCopy = true;
                }
                result[i] = cur;
            }

            return result;
        }
    );
}