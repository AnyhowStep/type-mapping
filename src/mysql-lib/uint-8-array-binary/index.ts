import {SafeMapper} from "../../mapper";
import {FluentMapper} from "../../fluent-mapper";
import {
    uint8ArrayLength,
    integer,
    pipe,
    range,
} from "../../fluent-lib";

function uint8ArrayDelegate (
    dataTypeStr : string,
    maxLength : number,
) : {
    (desiredLengthMin : number, desiredLengthMax : number) : FluentMapper<SafeMapper<Uint8Array>>,
    (desiredLengthMax : number) : FluentMapper<SafeMapper<Uint8Array>>,
    () : FluentMapper<SafeMapper<Uint8Array>>,
    maxLength : number,
} {
    const result = (a? : number, b? : number) => {
        if (a == undefined) {
            return uint8ArrayLength({
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
            return uint8ArrayLength({
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
            return uint8ArrayLength({
                min : a,
                max : b,
            });
        }
    };
    result.maxLength = maxLength;
    return result;
}
export const uint8ArrayBinary     = uint8ArrayDelegate("BINARY"    ,           255);
export const uint8ArrayVarBinary  = uint8ArrayDelegate("VARBINARY" ,        65_535);

export const uint8ArrayTinyBlob   = uint8ArrayDelegate("TINYBLOB"  ,           255);
export const uint8ArrayBlob       = uint8ArrayDelegate("BLOB"      ,        65_535);
export const uint8ArrayMediumBlob = uint8ArrayDelegate("MEDIUMBLOB",    16_777_215);
export const uint8ArrayLongBlob   = uint8ArrayDelegate("LONGBLOB"  , 4_294_967_295);