import {SafeMapper} from "../../mapper";
import {toTypeStr, strictEqual, toLiteralStr} from "../../type-util";
import {LiteralType} from "../../primitive";
import {instanceOfArray} from "../array";
import {pipe} from "../operator";

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
    return pipe(
        instanceOfArray(),
        (name : string, mixed : readonly any[]) : TupleT => {
            if (mixed.length != tuple.length) {
                throw new Error(`${name} must be of length ${tuple.length}`);
            }
            for (let i=0; i<tuple.length; ++i) {
                if (!strictEqual(mixed[i], tuple[i])) {
                    throw new Error(`${name}[${i}] must be ${toLiteralStr(tuple[i])}; received ${toTypeStr(mixed[i])}`);
                }
            }
            return mixed as TupleT;
        }
    );
}
