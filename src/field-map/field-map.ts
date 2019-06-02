import {
    AnySafeMapper,
    IsExpectedInputOptional,
    IsOptional,
} from "../mapper";
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

export type NonOptionalExpectedInputKey<MapT extends SafeMapperMap> = (
    {
        [k in Extract<keyof MapT, string>] : (
            IsExpectedInputOptional<MapT[k]> extends true ?
            never :
            k
        )
    }[Extract<keyof MapT, string>]
);
export type OptionalExpectedInputKey<MapT extends SafeMapperMap> = (
    {
        [k in Extract<keyof MapT, string>] : (
            IsExpectedInputOptional<MapT[k]> extends true ?
            k :
            never
        )
    }[Extract<keyof MapT, string>]
);

export type NonOptionalMappableInputKey<MapT extends SafeMapperMap> = (
    {
        [k in Extract<keyof MapT, string>] : (
            IsOptional<MapT[k]> extends true ?
            never :
            k
        )
    }[Extract<keyof MapT, string>]
);
export type OptionalMappableInputKey<MapT extends SafeMapperMap> = (
    {
        [k in Extract<keyof MapT, string>] : (
            IsOptional<MapT[k]> extends true ?
            k :
            never
        )
    }[Extract<keyof MapT, string>]
);