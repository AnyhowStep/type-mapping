import {pipe} from "../operator";
import {instanceOfObject} from "../object";
import {naturalNumber, inclusiveRange} from "../number";
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
                naturalNumber(),
                inclusiveRange(args)
            ),
            (name : string, mixed : Object, byteLengthDelegate) : { readonly byteLength : number} => {
                byteLengthDelegate(`${name}.byteLength`, (mixed as any).byteLength);
                return mixed as any;
            }
        )
    );
}