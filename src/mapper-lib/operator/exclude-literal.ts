import {SafeMapper, AnySafeMapper} from "../../mapper";
import {OutputOf} from "../../mapper";
import {mapper} from "../../mapper";
import {ExpectedInput} from "../../mapper";
import {MappableInput} from "../../mapper";
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
);
export function excludeLiteral<
    F extends AnySafeMapper,
    ArrT extends LiteralType[]
> (delegate : F, ...arr : ArrT) : ExcludeLiteralMapper<F, ArrT> {
    return mapper<ExcludeLiteralMapper<F, ArrT>>(
        ((name : string, mixed : unknown) => {
            const value = delegate(name, mixed);
            for (const item of arr) {
                if (strictEqual(value, item)) {
                    throw new Error(`${name} must not be ${toLiteralUnionStr(arr)}; received ${toLiteralStr(item)}`);
                }
            }
            return value as any;
        })
    );
}
