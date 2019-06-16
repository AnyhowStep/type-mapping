import {SafeMapper, ExpectedInput, MappableInput} from "../../mapper";
import {FluentMapper, fluentMapper} from "../../fluent-mapper";
import {Enum, EnumValue} from "../../enum-util";
import * as fLib from "../../functional-lib";

export type EnumValueMapper<E extends typeof Enum> = (
    FluentMapper<
        & SafeMapper<EnumValue<E>>
        & ExpectedInput<EnumValue<E>>
        //We allow `string` because node-mysql may return strings for numbers
        & MappableInput<string|EnumValue<E>>
    >
);
export function enumValue<E extends typeof Enum> (e : E) : (
    EnumValueMapper<E>
) {
    const result = fLib.or(
        fLib.enumValue(e),
        fLib.pipe(
            fLib.stringToFiniteNumber(),
            fLib.enumValue(e)
        )
    );
    return fluentMapper(result) as any;
}