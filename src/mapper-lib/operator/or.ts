import {AnySafeMapper, SafeMapper} from "../../mapper";
import {OutputOf} from "../../mapper";
import {indentErrorMessage} from "../../error-util";
import {ExpectedInput} from "../../mapper";
import {ExpectedInputOfImpl} from "../../mapper";
import {MappableInput} from "../../mapper";
import {MappableInputOfImpl} from "../../mapper";

export type OrMapper<ArrT extends AnySafeMapper[]> = (
    & SafeMapper<OutputOf<ArrT[number]>>
    & ExpectedInput<
        ExpectedInputOfImpl<ArrT[number]>[0]
    >
    & MappableInput<
        MappableInputOfImpl<ArrT[number]>[0]
    >
);
export function or<ArrT extends AnySafeMapper[]> (...arr : ArrT) : (
    OrMapper<ArrT>
 ) {
    return (name : string, mixed : unknown) : OutputOf<ArrT[number]> => {
        const messages : string[] = [];
        for (const d of arr) {
            try {
                return d(name, mixed);
            } catch (err) {
                messages.push(indentErrorMessage(err.message));
            }
        }
        throw new Error(`${name} is invalid.\n${messages.join(" or\n")}`);
    };
}

/*
or(
    (null as unknown as ((() => 1) & ExpectedInput<number>)),
    (null as unknown as ((() => 2) & ExpectedInput<string>)),
    (null as unknown as ((() => 3) & ExpectedInput<boolean>))
).__accepts
*/