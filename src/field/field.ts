import {SafeMapper} from "../mapper";

/**
    A field is a `SafeMapper<>` with a `name`
    that is intended to be a string literal type.

    A field is a building block of an object `Mapper<>`.
*/
export interface IField<
    NameT extends string,
    OutputT
> extends SafeMapper<OutputT> {
    name : NameT,
}
export type AnyField = (
    IField<any, any>
);