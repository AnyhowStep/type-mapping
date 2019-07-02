import {pipe} from "../operator";
import {instanceOfObject} from "../object";
import {unsignedInteger, range} from "../number";
import {SafeMapper, tryMapHandled} from "../../mapper";
import {string} from "../string";
import {or} from "../operator";
import {toPropertyAccess} from "../../string-util";
import {makeMappingError} from "../../error-util";

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
        or(
            instanceOfObject(),
            string()
        ),
        (name : string, mixed : Object) : { readonly length : number} => {
            const lengthResult = tryMapHandled(lengthDelegate, `${name}${toPropertyAccess("length")}`, (mixed as any).length);
            if (lengthResult.success) {
                return mixed as any;
            } else {
                throw makeMappingError({
                    message : `${name} must be ${expected}`,
                    inputName : name,
                    actualValue : mixed,
                    expected : expected,

                    propertyErrors : [
                        lengthResult.mappingError,
                    ],
                });
            }
        }
    );
}