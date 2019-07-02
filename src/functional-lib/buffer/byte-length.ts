import {pipe} from "../operator";
import {instanceOfObject} from "../object";
import {unsignedInteger, range} from "../number";
import {SafeMapper, tryMapHandled} from "../../mapper";
import { makeMappingError } from "../../error-util";

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
    const expected = (
        (args.min == undefined) ?
        (
            (args.max == undefined) ?
            `value with "length" property` :
            `value of length less than, or equal to ${args.max.toString()}`
        ) :
        (
            (args.max == undefined) ?
            `value of length greater than, or equal to ${args.min.toString()}` :
            (args.min == args.max) ?
            `value of length ${args.min.toString()}` :
            `value of length between ${args.min.toString()} and ${args.max.toString()}`
        )
    );
    return pipe(
        instanceOfObject(),
        (name : string, mixed : Object) : { readonly byteLength : number} => {
            const byteLengthResult = tryMapHandled(byteLengthDelegate, `${name}.byteLength`, (mixed as any).byteLength);
            if (byteLengthResult.success) {
                return mixed as any;
            } else {
                throw makeMappingError({
                    message : `${name} must be ${expected}`,
                    inputName : name,
                    actualValue : mixed,
                    expected : expected,

                    propertyErrors : [
                        byteLengthResult.mappingError,
                    ],
                });
            }
        }
    );
}