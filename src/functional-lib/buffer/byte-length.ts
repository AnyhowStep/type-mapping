import {pipe} from "../operator";
import {instanceOfObject} from "../object";
import {unsignedInteger, range} from "../number";
import {SafeMapper} from "../../mapper";

export function byteLength (args : {
    min? : number,
    max? : number,
}) : SafeMapper<{ readonly byteLength : number}> {
    const byteLengthDelegate = pipe(
        unsignedInteger(),
        range({
            gtEq : args.min,
            ltEq : args.max,
        })
    );
    return pipe(
        instanceOfObject(),
        (name : string, mixed : Object) : { readonly byteLength : number} => {
            byteLengthDelegate(`${name}.byteLength`, (mixed as any).byteLength);
            return mixed as any;
        }
    );
}