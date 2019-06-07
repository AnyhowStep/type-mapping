import {pipe} from "../operator";
import {instanceOfObject} from "../object";
import {unsignedInteger, range} from "../number";
import {SafeMapper} from "../../mapper";
import {string} from "../string";
import {or} from "../operator";

export function length (args : {
    min? : number,
    max? : number,
}) : SafeMapper<{ readonly length : number}> {
    const lengthDelegate = pipe(
        unsignedInteger(),
        range({
            gtEq : args.min,
            ltEq : args.max,
        })
    );
    return pipe(
        or(
            instanceOfObject(),
            string()
        ),
        (name : string, mixed : Object) : { readonly length : number} => {
            lengthDelegate(`${name}.length`, (mixed as any).length);
            return mixed as any;
        }
    );
}