import {
    SafeMapper,
    AnySafeMapper,
    OutputOf,
    ExpectedInput,
    MappableInput,
    ExtractNameOrUnknown,
    ExtractOptionalOrUnknown,
    copyRunTimeModifier,
} from "../../mapper";
import {LiteralType} from "../../primitive";
import {toLiteralUnionStr, toLiteralStr, strictEqual} from "../../type-util";

export type ExcludeLiteralMapper<
    F extends AnySafeMapper,
    ArrT extends LiteralType[]
> = (
    & SafeMapper<Exclude<
        OutputOf<F>,
        ArrT[number]
    >>
    & (
        F extends ExpectedInput<infer T> ?
        ExpectedInput<Exclude<T, ArrT[number]>> :
        unknown
    )
    & (
        F extends MappableInput<infer T> ?
        MappableInput<Exclude<T, ArrT[number]>> :
        unknown
    )
    & ExtractNameOrUnknown<F>
    & ExtractOptionalOrUnknown<F>
);
export function excludeLiteral<
    F extends AnySafeMapper,
    ArrT extends LiteralType[]
> (f : F, ...arr : ArrT) : ExcludeLiteralMapper<F, ArrT> {
    return copyRunTimeModifier(
        f,
        (name : string, mixed : unknown) => {
            const value = f(name, mixed);
            for (const item of arr) {
                if (strictEqual(value, item)) {
                    throw new Error(`${name} must not be ${toLiteralUnionStr(arr)}; received ${toLiteralStr(item)}`);
                }
            }
            return value as any;
        }
    ) as any;
}
