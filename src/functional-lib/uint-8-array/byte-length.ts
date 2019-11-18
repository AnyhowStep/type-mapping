import {pipe} from "../operator";
import {instanceOfObject} from "../object";
import {unsignedInteger, range} from "../number";
import {SafeMapper, tryMapHandled} from "../../mapper";
import {makeMappingError} from "../../error-util";
import {ErrorCode} from "../../error-code";

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
            `value with "byteLength" property` :
            `value of byteLength less than, or equal to ${args.max.toString()}`
        ) :
        (
            (args.max == undefined) ?
            `value of byteLength greater than, or equal to ${args.min.toString()}` :
            (args.min == args.max) ?
            `value of byteLength ${args.min.toString()}` :
            `value of byteLength between ${args.min.toString()} and ${args.max.toString()}`
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
                    expectedMeta : {
                        errorCode : ErrorCode.EXPECTED_BYTE_LENGTH,
                        min : args.min,
                        max : args.max,
                    },

                    propertyErrors : [
                        byteLengthResult.mappingError,
                    ],
                });
            }
        }
    );
}