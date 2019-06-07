import {SafeMapper, ExpectedInput, MappableInput} from "../../mapper";
import {FluentMapper} from "../../fluent-mapper";
import {stringToFiniteNumber} from "../../fluent-lib";

/**
    TS `number` type is actually a `double` type
*/
export function double () : (
    FluentMapper<
        & SafeMapper<number>
        & ExpectedInput<number>
        & MappableInput<string | number>
    >
) {
    return stringToFiniteNumber();
}

/**
    Alias for DOUBLE for now.
    JS doesn't have `float` type.

    This means that it is possible
    to send a value to MySQL and
    lose precision.
*/
export function float () {
    return double();
}