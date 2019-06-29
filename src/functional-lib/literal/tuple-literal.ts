import {SafeMapper} from "../../mapper";
import {toTypeStr, strictEqual, toLiteralStr} from "../../type-util";
import {LiteralType} from "../../primitive";
import {instanceOfArray} from "../array";
import {pipe} from "../operator";
import {makeMappingError} from "../../error-util";
import { length } from "../array-like";
import { toPropertyAccess } from "../../string-util";

export type TupleLiteralMapper<TupleT extends readonly LiteralType[]> = (
    SafeMapper<TupleT>
);
/**
 * Returns a mapper that checks if incoming data matches the tuple `TupleT`.
 *
 * ```ts
 * tupleLiteral("a", "b")("x", ["a", "b"]);       //OK!
 * tupleLiteral("a", "b")("x", ["a", "b", "c"]);  //Error
 * tupleLiteral("a", "b")("x", ["a"]);            //Error
 * tupleLiteral("a", "b")("x", ["b", "a"]);       //Error
 * ```
 *
 * @param tuple The tuple incoming data must equal to
 */
export function tupleLiteral<TupleT extends readonly LiteralType[]> (...tuple : TupleT) : (
    TupleLiteralMapper<TupleT>
) {
    const lengthDelegate = length({
        min : tuple.length,
        max : tuple.length,
    });
    return pipe(
        instanceOfArray(),
        (name : string, mixed : readonly any[]) : TupleT => {
            lengthDelegate(name, mixed);
            for (let i=0; i<tuple.length; ++i) {
                if (!strictEqual(mixed[i], tuple[i])) {
                    throw makeMappingError({
                        message : `${name}${toPropertyAccess(i)} must be ${toLiteralStr(tuple[i])}; received ${toTypeStr(mixed[i])}`,
                        inputName : `${name}${toPropertyAccess(i)}`,
                        actualValue : mixed[i],
                        expected : toLiteralStr(tuple[i]),
                    });
                }
            }
            return mixed as TupleT;
        }
    );
}
