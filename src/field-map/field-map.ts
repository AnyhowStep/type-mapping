import {AnySafeMapper} from "../mapper";
import {AnyField} from "../field/field";

/**
    Building individual `Field<>` instances is a paid.

    This `RawFieldMap` may be used to build
    multiple `Field<>` instances in one function call.
*/
export interface SafeMapperMap {
    [name : string] : AnySafeMapper,
};

export interface FieldMap {
    [name : string] : AnyField,
};