import {
    SafeMapper,
    AnySafeMapper,
    OutputOf,
    ExpectedInput,
    MappableInput,
    ExtractRunTimeModifierOrUnknown,
    copyRunTimeModifier,
} from "../../mapper";
import {LiteralType} from "../../primitive";
import {toLiteralUnionStr, toLiteralStr, strictEqual} from "../../type-util";
import { makeMappingError } from "../../error-util";

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
    & ExtractRunTimeModifierOrUnknown<F>
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
                    throw makeMappingError({
                        message : `${name} must not be ${toLiteralUnionStr(arr)}; received ${toLiteralStr(item)}`,
                        inputName : name,
                        actualValue : value,
                        expected : `not ${toLiteralUnionStr(arr)}`,
                    });
                }
            }
            return value as any;
        }
    ) as any;
}
