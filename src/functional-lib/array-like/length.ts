import {pipe} from "../operator";
import {instanceOfObject} from "../object";
import {unsignedInteger, range} from "../number";
import {SafeMapper} from "../../mapper";
import {cache} from "../operator";

export function length (args : {
    min? : number,
    max? : number,
}) : SafeMapper<{ readonly length : number}> {
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
            (name : string, mixed : Object, lengthDelegate) : { readonly length : number} => {
                lengthDelegate(`${name}.length`, (mixed as any).length);
                return mixed as any;
            }
        )
    );
}