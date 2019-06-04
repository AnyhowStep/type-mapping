import {
    AnySafeMapper,
    IsExpectedInputOptional,
    IsOptional,
    NameOf,
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

export type ExtractLiteralDstName<MapT extends SafeMapperMap> = (
    {
        [key in Extract<keyof MapT, string>] : (
            string extends NameOf<MapT[key]> ?
            never :
            NameOf<MapT[key]>
        )
    }[Extract<keyof MapT, string>]
);

export type NonOptionalExpectedInputDstName<MapT extends FieldMap> = (
    {
        [k in ExtractLiteralDstName<MapT>] : (
            IsExpectedInputOptional<
                Extract<
                    MapT[Extract<keyof MapT, string>],
                    { __name : k }
                >
            > extends true ?
            never :
            k
        )
    }[ExtractLiteralDstName<MapT>]
);
export type OptionalExpectedInputDstName<MapT extends FieldMap> = (
    {
        [k in ExtractLiteralDstName<MapT>] : (
            IsExpectedInputOptional<
                Extract<
                    MapT[Extract<keyof MapT, string>],
                    { __name : k }
                >
            > extends true ?
            k :
            never
        )
    }[ExtractLiteralDstName<MapT>]
);
export type NonOptionalMappableInputDstName<MapT extends FieldMap> = (
    {
        [k in ExtractLiteralDstName<MapT>] : (
            IsOptional<
                Extract<
                    MapT[Extract<keyof MapT, string>],
                    { __name : k }
                >
            > extends true ?
            never :
            k
        )
    }[ExtractLiteralDstName<MapT>]
);
export type OptionalMappableInputDstName<MapT extends FieldMap> = (
    {
        [k in ExtractLiteralDstName<MapT>] : (
            IsOptional<
                Extract<
                    MapT[Extract<keyof MapT, string>],
                    { __name : k }
                >
            > extends true ?
            k :
            never
        )
    }[ExtractLiteralDstName<MapT>]
);