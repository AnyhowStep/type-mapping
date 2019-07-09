import {
    AnySafeMapper,
    SafeMapper,
    OutputOf,
    ExpectedInputOf,
    ExpectedInput,
    MappableInputOf,
    MappableInput,
    ExtractRunTimeModifierOrUnknown,
    copyRunTimeModifier,
} from "../../mapper";
import {pipe} from "../operator";
import {instanceOfArray} from "./instance-of-array";
import {toPropertyAccess} from "../../string-util";

export type ArrayMapper<
    F extends AnySafeMapper
> = (
    & SafeMapper<OutputOf<F>[]>
    & ExpectedInput<ExpectedInputOf<F>[]>
    & MappableInput<MappableInputOf<F>[]>
    & ExtractRunTimeModifierOrUnknown<F>
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
                    /**
                     * For now, fail quick for arrays.
                     *
                     * @todo Should we accumulate errors like in `objectFromMap()`?
                     * The array might be too large. How large is too large?
                     * Should we accumulate the first `n` errors before throwing?
                     */
                    const cur = f(`${name}${toPropertyAccess(i)}`, mixed[i]);
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
export type ReadOnlyArrayMapper<
    F extends AnySafeMapper
> = (
    & SafeMapper<readonly OutputOf<F>[]>
    & ExpectedInput<readonly ExpectedInputOf<F>[]>
    & MappableInput<readonly MappableInputOf<F>[]>
    & ExtractRunTimeModifierOrUnknown<F>
);

export function readOnlyArray<F extends AnySafeMapper> (f : F) : (
    ReadOnlyArrayMapper<F>
) {
    return array<F>(f);
}