import {SafeMapper, ExpectedInput, MappableInput} from "../../mapper";
import {FluentMapper} from "../../fluent-mapper";
import {finiteNumberToFiniteNumberString} from "../../fluent-lib";

//Alias for now
export type Decimal = string;

/*
    For now, returns a string.
    Converting to a number risks losing precision.
*/
export function decimal () : (
    FluentMapper<
        & SafeMapper<Decimal>
        & ExpectedInput<Decimal>
        & MappableInput<Decimal | number>
    >
) {
    return finiteNumberToFiniteNumberString();
}
