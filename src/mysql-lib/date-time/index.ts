import {SafeMapper, ExpectedInput, MappableInput} from "../../mapper";
import {FluentMapper} from "../../fluent-mapper";
import {
    or,
    string,
    instanceOfDate,
    match,
} from "../../fluent-lib";
import * as DateTimeUtil from "./util";
import { makeMappingError } from "../../error-util";
export {DateTimeUtil};

//Just a type alias since we don't support DATETIME(4/5/6)
export type DateTime = Date;

export function dateTime (
    fractionalSecondPrecision : 0|1|2|3/*|4|5|6*/ = 0
) : (
    FluentMapper<
        & SafeMapper<Date>
        & ExpectedInput<Date>
        & MappableInput<string | Date>
    >
) {
    return or(
        string().pipe((name : string, str : string) => {
            try {
                return DateTimeUtil.fromSqlUtc(str, fractionalSecondPrecision);
            } catch (err) {
                throw makeMappingError({
                    message : `${name} must be DATETIME(${fractionalSecondPrecision}); ${err.message}`,
                    inputName : name,
                    actualValue : str,
                    expected : `DATETIME(${fractionalSecondPrecision})`,
                });
            }
        }),
        //To work with JSON serialization
        or(
            //Hopefully, it is a JSON date string
            string(),
            /*
                We turn the Date object into its JSON representation
                because the Date object may have a millisecond part
                when we do not allow it.

                For example,
                new Date().toJSON() //2019-01-01T00:00:00.123Z

                The above is not assignable to DATETIME(0)
                But is assignable to DATETIME(3)

                -----

                new Date().toJSON() //2019-01-01T00:00:00.120Z

                The above is not assignable to DATETIME(0)
                But is assignable to DATETIME(2) or DATETIME(3)
            */
            instanceOfDate().pipe((_name, d : Date) => d.toJSON())
        ).pipe(
            match(
                /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{1,3})?Z$/,
                name => {
                    return {
                        message : `${name} must be in the format YYYY-MM-DDTHH:mm:ss.sssZ`,
                        expected : `YYYY-MM-DDTHH:mm:ss.sssZ`,
                    };
                }
            ),
            (name : string, str : string) => {
                try {
                    str = str.replace("T", " ").replace("Z", "");
                    return DateTimeUtil.fromSqlUtc(str, fractionalSecondPrecision);
                } catch (err) {
                    throw makeMappingError({
                        message : `${name} must be DATETIME(${fractionalSecondPrecision}); ${err.message}`,
                        inputName : name,
                        actualValue : str,
                        expected : `DATETIME(${fractionalSecondPrecision})`,
                    });
                }
            }
        )
    ).withExpectedInput<Date>();
}