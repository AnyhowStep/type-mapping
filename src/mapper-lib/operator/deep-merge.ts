import {
    SafeMapper,
    OutputOf, ExpectedInputOf, MappableInputOf,
    ExpectedInput,
    MappableInput,
} from "../../mapper";
import {UnionToIntersection} from "../../type-util";
import * as TypeUtil from "../../type-util";

export type DeepMergeMapper<ArrT extends SafeMapper<object>[]> = (
    & SafeMapper<{
        [k in keyof UnionToIntersection<OutputOf<ArrT[number]>>] : (
            UnionToIntersection<OutputOf<ArrT[number]>>[k]
        )
    }>
    & ExpectedInput<{
        [k in keyof UnionToIntersection<ExpectedInputOf<ArrT[number]>>] : (
            UnionToIntersection<ExpectedInputOf<ArrT[number]>>[k]
        )
    }>
    & MappableInput<{
        [k in keyof UnionToIntersection<MappableInputOf<ArrT[number]>>] : (
            UnionToIntersection<MappableInputOf<ArrT[number]>>[k]
        )
    }>
    /*
    & SafeMapper<UnionToIntersection<
        OutputOf<ArrT[number]>
    >>
    & ExpectedInput<UnionToIntersection<ExpectedInputOf<ArrT[number]>>>
    & MappableInput<UnionToIntersection<MappableInputOf<ArrT[number]>>>
    */
);
export function deepMerge<ArrT extends SafeMapper<object>[]> (
    ...arr : ArrT
) : (
    DeepMergeMapper<ArrT>
) {
    return (name : string, mixed : unknown) => {
        const result : OutputOf<ArrT[number]>[] = [];
        for (const f of arr) {
            result.push(f(name, mixed) as any);
        }
        if (result.length == 0) {
            return {};
        }
        try {
            return TypeUtil.deepMerge(...result) as any;
        } catch (err) {
            throw new Error(`${name} is invalid; ${err.message}`);
        }
    };
}

/*
const dm = deepMerge(
    (null as unknown as (() => { x : "test" }) & ExpectedInput<{ foo : string }> & MappableInput<{ foo? : string|Buffer }>),
    () : { x : 1 } => (null as any),
    () : { y : true } => (null as any),
    () : { y? : true } => (null as any),
    (null as unknown as (() => { z : Date }) & MappableInput<{ foo? : Buffer }>),
);
dm("", "").y
*/