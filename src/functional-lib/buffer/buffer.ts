import {SafeMapper} from "../../mapper";
import {toTypeStr} from "../../type-util";
import {pipe} from "../operator";
import {byteLength} from "./byte-length";
import {isInstanceOfBuffer} from "../../type-util/buffer-ctor";

export function instanceOfBuffer () : SafeMapper<Buffer> {
    return (name : string, mixed : unknown) : Buffer => {
        if (!isInstanceOfBuffer(mixed)) {
            throw new Error(`${name} must be instance of Buffer; received ${toTypeStr(mixed)}`);
        }
        return mixed;
    };
}

export function bufferLength (args : {
    min? : number,
    max? : number,
}) : SafeMapper<Buffer> {
    return pipe(
        byteLength(args),
        instanceOfBuffer()
    );
}

export function bufferExactLength (length : number) : SafeMapper<Buffer> {
    return bufferLength({
        min : length,
        max : length,
    });
}