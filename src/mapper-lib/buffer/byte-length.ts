import {pipe} from "../operator";
import {instanceOfObject} from "../object";
import {unsignedInteger, range} from "../number";
import {SafeMapper} from "../../mapper";
import {cache} from "../operator";

export function byteLength (args : {
    min? : number,
    max? : number,
}) : SafeMapper<{ readonly byteLength : number}> {
    return pipe(
        instanceOfObject(),
        cache(
            pipe(
                unsignedInteger(),
                range({
                    gtEq : args.min,
                    ltEq : args.max,
                })
            ),
            (name : string, mixed : Object, byteLengthDelegate) : { readonly byteLength : number} => {
                byteLengthDelegate(`${name}.byteLength`, (mixed as any).byteLength);
                return mixed as any;
            }
        )
    );
}