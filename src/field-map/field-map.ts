import {AnySafeMapper} from "../mapper";

/**
    Building individual `Field<>` instances is a paid.

    This `RawFieldMap` may be used to build
    multiple `Field<>` instances in one function call.
*/
export interface RawFieldMap {
    [name : string] : AnySafeMapper,
};