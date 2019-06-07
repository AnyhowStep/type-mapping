import {SafeMapper} from "../../mapper";
import {FluentMapper} from "../../fluent-mapper";
import {
    bufferLength,
    integer,
    pipe,
    range,
} from "../../fluent-lib";

function bufferDelegate (
    dataTypeStr : string,
    maxLength : number,
) : {
    (desiredLengthMin : number, desiredLengthMax : number) : FluentMapper<SafeMapper<Buffer>>,
    (desiredLengthMax : number) : FluentMapper<SafeMapper<Buffer>>,
    () : FluentMapper<SafeMapper<Buffer>>,
    maxLength : number,
} {
    const result = (a? : number, b? : number) => {
        if (a == undefined) {
            return bufferLength({
                max : maxLength,
            });
        } else if (b == undefined) {
            a = pipe(
                integer(),
                range({
                    gtEq : 1,
                    ltEq : maxLength,
                })
            )(`${dataTypeStr}.desiredLengthMax`, a);
            return bufferLength({
                max : a,
            });
        } else {
            a = pipe(
                integer(),
                range({
                    gtEq : 0,
                    ltEq : maxLength,
                })
            )(`${dataTypeStr}.desiredLengthMin`, a);
            b = pipe(
                integer(),
                range({
                    gtEq : 1,
                    ltEq : maxLength,
                })
            )(`${dataTypeStr}.desiredLengthMax`, b);
            if (a > b) {
                throw new Error(`${dataTypeStr} minLength must be <= maxLength`);
            }
            return bufferLength({
                min : a,
                max : b,
            });
        }
    };
    result.maxLength = maxLength;
    return result;
}
export const binary     = bufferDelegate("BINARY"    ,           255);
export const varBinary  = bufferDelegate("VARBINARY" ,        65_535);

export const tinyBlob   = bufferDelegate("TINYBLOB"  ,           255);
export const blob       = bufferDelegate("BLOB"      ,        65_535);
export const mediumBlob = bufferDelegate("MEDIUMBLOB",    16_777_215);
export const longBlob   = bufferDelegate("LONGBLOB"  , 4_294_967_295);