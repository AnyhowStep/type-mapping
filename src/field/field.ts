import {SafeMapper, Name} from "../mapper";

/**
    A field is a `SafeMapper<>` with a `name`
    that is intended to be a string literal type.

    A field is a building block of an object `Mapper<>`.
*/
export type Field<OutputT, NameT extends string> = (
    & SafeMapper<OutputT>
    & Name<NameT>
);
export type AnyField = (
    Field<any, string>
);