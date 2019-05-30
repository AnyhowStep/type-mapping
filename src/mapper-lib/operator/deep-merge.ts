import {
    AnySafeMapper,
    SafeMapper,
    OutputOf, ExpectedInputOf, MappableInputOf,
    ExpectedInput,
    MappableInput,
} from "../../mapper";
import * as TypeUtil from "../../type-util";
import { UnionToIntersection } from "../../type-util";

type DeepMergeOutputOfImpl<F extends AnySafeMapper> = (
    F extends AnySafeMapper ?
    [OutputOf<F>] :
    never
);
type DeepMergeOutputOf<F extends AnySafeMapper> = (
    Extract<
        UnionToIntersection<DeepMergeOutputOfImpl<F>>,
        [any]
    >[0]
);
export type DeepMergeMapper<ArrT extends AnySafeMapper[]> = (
    & SafeMapper<
        DeepMergeOutputOf<ArrT[number]>
    >
    & ExpectedInput<
        ExpectedInputOf<ArrT[number]>
    >
    & MappableInput<
        MappableInputOf<ArrT[number]>
    >
    /*
    & MappableInput<
        Extract<MappableInputOf<ArrT[number]>, Primitive> extends never ?
        {
            [k in keyof UnionToIntersection<MappableInputOf<ArrT[number]>>] : (
                UnionToIntersection<MappableInputOf<ArrT[number]>>[k]
            )
        } :
        UnionToIntersection<MappableInputOf<ArrT[number]>>
    >
    //*/
    /*
    & SafeMapper<UnionToIntersection<
        OutputOf<ArrT[number]>
    >>
    & ExpectedInput<UnionToIntersection<ExpectedInputOf<ArrT[number]>>>
    & MappableInput<UnionToIntersection<MappableInputOf<ArrT[number]>>>
    */
);
export function deepMerge<ArrT extends AnySafeMapper[]> (
    ...arr : ArrT
) : (
    DeepMergeMapper<ArrT>
) {
    if (arr.length == 0) {
        throw new Error(`Cannot deep merge zero mappers`);
    }
    return (name : string, mixed : unknown) : any => {
        const result : OutputOf<ArrT[number]>[] = [];
        for (const f of arr) {
            result.push(f(name, mixed) as any);
        }
        try {
            return TypeUtil.deepMerge(...result) as any;
        } catch (err) {
            throw new Error(`${name} is invalid; ${err.message}`);
        }
    };
}

/*
import { length } from "../array-like";
import { string } from "../string";
const dm = deepMerge(
    (null as unknown as (() => { x : "test" }) & ExpectedInput<{ foo : string }> & MappableInput<{ foo? : string|Buffer }>),
    () : { x : 1 } => (null as any),
    () : { y : true } => (null as any),
    () : { y? : true } => (null as any),
    (null as unknown as (() => { z : Date }) & MappableInput<{ foo? : Buffer }>),
);
dm("", "").y

//*
const dm2 = deepMerge(
    (null as unknown as (() => number) & ExpectedInput<{ foo : string }> & MappableInput<string>),
    (null as unknown as (() => string) & MappableInput<number>),
);
const dm3 = deepMerge(
    (null as unknown as (() => number) & ExpectedInput<{ foo : string }> & MappableInput<{ foo? : string|Buffer }>),
    (null as unknown as (() => string)),
    (null as unknown as (() => { x : "test" }) & ExpectedInput<{ foo : string }> & MappableInput<{ foo? : string|Buffer }>),
);

const dm4 = deepMerge(
    length({
        min : 1
    }),
    string()
)
//*/