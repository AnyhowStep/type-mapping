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
import {instanceOfObject} from "../object";
import {pipe} from "../operator";
import {length} from "./length";

export function implementsArrayLike () : SafeMapper<ArrayLike<any>> {
    return pipe(
        instanceOfObject(),
        length({})
    );
}

function copyArrayLike (arr : ArrayLike<any>) {
    const result : any[] = [];

    for (let i=0; i<arr.length; ++i) {
        result.push(arr[i]);
    }

    return result;
}

export type ArrayLikeMapper<
    F extends AnySafeMapper
> = (
    & SafeMapper<ArrayLike<OutputOf<F>>>
    & ExpectedInput<ArrayLike<ExpectedInputOf<F>>>
    & MappableInput<ArrayLike<MappableInputOf<F>>>
    & ExtractNameOrUnknown<F>
    & ExtractOptionalOrUnknown<F>
);

export function arrayLike<F extends AnySafeMapper> (f : F) : (
    ArrayLikeMapper<F>
) {
    return copyRunTimeModifier(
        f,
        pipe(
            implementsArrayLike(),
            (name : string, mixed : ArrayLike<any>) => {
                let result : {
                    readonly length : number,
                    [index : number] : any,
                } = mixed;
                let isCopy = false;

                for (let i=0; i<mixed.length; ++i) {
                    const cur = f(`${name}[${i}]`, (mixed as any)[i]);
                    //We do not mind === here.
                    //If either is a BigInt polyfill, we are okay with the copy.
                    if (cur === (mixed as any)[i]) {
                        continue
                    }
                    if (!isCopy) {
                        result = copyArrayLike(result);
                        isCopy = true;
                    }
                    result[i] = cur;
                }

                return result;
            }
        )
    );
}