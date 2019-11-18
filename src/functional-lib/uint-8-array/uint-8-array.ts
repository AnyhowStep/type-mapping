import {SafeMapper} from "../../mapper";
import {toTypeStr} from "../../type-util";
import {pipe} from "../operator";
import {byteLength} from "./byte-length";
import {makeMappingError} from "../../error-util";
import {ErrorCode} from "../../error-code";

export function instanceOfUint8Array () : SafeMapper<Uint8Array> {
    return (name : string, mixed : unknown) : Uint8Array => {
        if (!(mixed instanceof Uint8Array)) {
            throw makeMappingError({
                message : `${name} must be instance of Uint8Array; received ${toTypeStr(mixed)}`,
                inputName : name,
                actualValue : mixed,
                expected : "Uint8Array",
                expectedMeta : {
                    errorCode : ErrorCode.EXPECTED_TYPE,
                },
            });
        }
        return mixed;
    };
}

export function uint8ArrayLength (args : {
    min? : number,
    max? : number,
}) : SafeMapper<Uint8Array> {
    return pipe(
        byteLength(args),
        instanceOfUint8Array()
    );
}

export function uint8ArrayExactLength (length : number) : SafeMapper<Uint8Array> {
    return uint8ArrayLength({
        min : length,
        max : length,
    });
}