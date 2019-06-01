import {
    AnySafeMapper,
    SafeMapper,
    OutputOf,
    ExpectedInputOf,
    ExpectedInput,
    MappableInputOf,
    MappableInput,
    ExtractNameOrUnknown,
    ExtractOptionalOrUnknown,
    copyRunTimeModifier,
} from "../../mapper";
import {pipe} from "../operator";
import {instanceOfArray} from "./instance-of-array";

export type ArrayMapper<
    F extends AnySafeMapper
> = (
    & SafeMapper<OutputOf<F>[]>
    & ExpectedInput<ExpectedInputOf<F>[]>
    & MappableInput<MappableInputOf<F>[]>
    & ExtractNameOrUnknown<F>
    & ExtractOptionalOrUnknown<F>
);

export function array<F extends AnySafeMapper> (f : F) : (
    ArrayMapper<F>
) {
    return copyRunTimeModifier(
        f,
        pipe(
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
        )
    );
}