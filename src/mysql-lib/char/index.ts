import {SafeMapper} from "../../mapper";
import {FluentMapper} from "../../fluent-mapper";
import {
    stringLength,
    integer,
    pipe,
    range,
} from "../../fluent-lib";

function stringDelegate (
    dataTypeStr : string,
    maxLength : number,
) : {
    (desiredLengthMin : number, desiredLengthMax : number) : FluentMapper<SafeMapper<string>>,
    (desiredLengthMax : number) : FluentMapper<SafeMapper<string>>,
    () : FluentMapper<SafeMapper<string>>,
    maxLength : number,
} {
    const result = (a? : number, b? : number) => {
        if (a == undefined) {
            return stringLength({
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
            return stringLength({
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
            return stringLength({
                min : a,
                max : b,
            });
        }
    };
    result.maxLength = maxLength;
    return result;
}
export const char     = stringDelegate("CHAR"    ,           255);
export const varChar  = stringDelegate("VARCHAR" ,        65_535);

export const tinyText   = stringDelegate("TINYTEXT"  ,           255);
export const text       = stringDelegate("TEXT"      ,        65_535);
export const mediumText = stringDelegate("MEDIUMTEXT",    16_777_215);
export const longText   = stringDelegate("LONGTEXT"  , 4_294_967_295);