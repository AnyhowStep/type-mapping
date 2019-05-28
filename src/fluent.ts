import {
    SafeMapper,
    AnySafeMapper,
    OutputOf,
    AnyMapper,
    AssertPipeable,
    MappableInputOf,
} from "./mapper";
import {
    OrUndefinedMapper,
    OrNullMapper,
    OrMaybeMapper,
    NotUndefinedMapper,
    NotNullMapper,
    NotMaybeMapper,
    OptionalMapper,
    OrMapper,
    ExcludeLiteralMapper,
    DeepMergeMapper,
    CastMapper,
    CastDelegate,
    cast,
    deepMerge,
    excludeLiteral,
    orUndefined,
    orNull,
    orMaybe,
    notUndefined,
    notNull,
    notMaybe,
    optional,
    or,
    unsafePipe,
    PipeMapper,
    DeriveMapper,
    derive,
    RenameMapper,
    rename,
} from "./mapper-lib";
import {LiteralType} from "./primitive";

export type FluentMapper<F extends AnySafeMapper> = (
    & IFluentMapper<OutputOf<F>>
    & F
    //& ExtractExpectedInputOrUnknown<F>
    //& ExtractMappableInputOrUnknown<F>
    //& ExtractOptionalOrUnknown<F>
);
export interface IFluentMapper<OutputT> extends SafeMapper<OutputT> {


    //== object ==

    derive<
        SrcKeyT extends string,
        DstKeyT extends string
    > (
        srcKey : SrcKeyT,
        dstKey : DstKeyT
    ) : (
        FluentMapper<DeriveMapper<SrcKeyT, DstKeyT, this>>
    );

    //Uncomment this block to warm yourself up during winter
    /*
    derive2<
        SrcKeyT extends string,
        DstKeyT extends string
    > (
        srcKey : SrcKeyT,
        dstKey : DstKeyT
    ) : (
        FluentMapper<DeriveMapper<SrcKeyT, DstKeyT, this>>
    );
    derive3<
        SrcKeyT extends string,
        DstKeyT extends string
    > (
        srcKey : SrcKeyT,
        dstKey : DstKeyT
    ) : (
        FluentMapper<DeriveMapper<SrcKeyT, DstKeyT, this>>
    );
    //*/

    //Uncomment this block to make compile-times jump from 2s to 90s
    /*
    rename<
        SrcKeyT extends string,
        DstKeyT extends string
    > (
        srcKey : SrcKeyT,
        dstKey : DstKeyT
    ) : (
        FluentMapper<RenameMapper<SrcKeyT, DstKeyT, this>>
    );
    //*/

    //== operator ==

    cast<DstF extends AnySafeMapper> (
        castDelegate : CastDelegate<OutputOf<this>, MappableInputOf<DstF>>,
        dstDelegate : DstF
    ) : (
        FluentMapper<CastMapper<this, DstF>>
    )

    deepMerge<ArrT extends SafeMapper<object>[]> (this : SafeMapper<object>, ...arr : ArrT) : (
        FluentMapper<
            DeepMergeMapper<
                Parameters<(head : Extract<this, SafeMapper<object>>, ...tail : ArrT) => unknown>
            >
        >
    );

    excludeLiteral<ArrT extends LiteralType[]> (...arr : ArrT) : (
        FluentMapper<ExcludeLiteralMapper<this, ArrT>>
    );

    orUndefined () : FluentMapper<OrUndefinedMapper<this>>;
    orNull () : FluentMapper<OrNullMapper<this>>;
    orMaybe () : FluentMapper<OrMaybeMapper<this>>;

    notUndefined () : FluentMapper<NotUndefinedMapper<this>>;
    notNull () : FluentMapper<NotNullMapper<this>>;
    notMaybe () : FluentMapper<NotMaybeMapper<this>>;

    optional () : FluentMapper<OptionalMapper<this>>;

    or<ArrT extends AnySafeMapper[]> (...arr : ArrT) : (
        FluentMapper<
            OrMapper<
                Parameters<(head : this, ...tail : ArrT) => unknown>
            >
        >
    );

    pipe<
        F1 extends AnyMapper
    > (
        f1 : AssertPipeable<this, F1>
    ) : (
        FluentMapper<PipeMapper<this, F1>>
    );
    pipe<
        F1 extends AnyMapper,
        F2 extends AnyMapper
    > (
        f1 : AssertPipeable<this, F1>,
        f2 : AssertPipeable<F1, F2>
    ) : (
        FluentMapper<PipeMapper<this, F2>>
    );
    pipe<
        F1 extends AnyMapper,
        F2 extends AnyMapper,
        F3 extends AnyMapper
    > (
        f1 : AssertPipeable<this, F1>,
        f2 : AssertPipeable<F1, F2>,
        f3 : AssertPipeable<F2, F3>
    ) : (
        FluentMapper<PipeMapper<this, F3>>
    );
    pipe<
        F1 extends AnyMapper,
        F2 extends AnyMapper,
        F3 extends AnyMapper,
        F4 extends AnyMapper
    > (
        f1 : AssertPipeable<this, F1>,
        f2 : AssertPipeable<F1, F2>,
        f3 : AssertPipeable<F2, F3>,
        f4 : AssertPipeable<F3, F4>
    ) : (
        FluentMapper<PipeMapper<this, F4>>
    );
}

/**
    MODIFIES THE FUNCTION `f`!
    DOES NOT RETURN A NEW FUNCTION.
*/
export function fluentMapper<F extends AnySafeMapper> (f : F) : FluentMapper<F> {
    const result : FluentMapper<F> = f as any;

    result.cast = <DstF extends AnySafeMapper> (
        castDelegate : CastDelegate<OutputOf<typeof result>, MappableInputOf<DstF>>,
        dstDelegate : DstF
    ) : (
        FluentMapper<CastMapper<typeof result, DstF>>
    ) => {
        return fluentMapper(cast(result, castDelegate, dstDelegate));
    };

    result.deepMerge = function<ArrT extends SafeMapper<object>[]> (this : SafeMapper<object>, ...arr : ArrT) : (
        FluentMapper<
            DeepMergeMapper<
                Parameters<(head : Extract<typeof result, SafeMapper<object>>, ...tail : ArrT) => unknown>
            >
        >
    ) {
        return fluentMapper(deepMerge(
            result,
            ...arr
        ));
    };

    result.excludeLiteral = <ArrT extends LiteralType[]> (...arr : ArrT) : (
        FluentMapper<ExcludeLiteralMapper<typeof result, ArrT>>
    ) => {
        return fluentMapper(excludeLiteral(result, ...arr));
    };

    result.orUndefined = () : FluentMapper<OrUndefinedMapper<typeof result>> => {
        return fluentMapper(orUndefined(result));
    };
    result.orNull = () : FluentMapper<OrNullMapper<typeof result>> => {
        return fluentMapper(orNull(result));
    };
    result.orMaybe = () : FluentMapper<OrMaybeMapper<typeof result>> => {
        return fluentMapper(orMaybe(result));
    };

    result.notUndefined = () : FluentMapper<NotUndefinedMapper<typeof result>> => {
        return fluentMapper(notUndefined(result));
    };
    result.notNull = () : FluentMapper<NotNullMapper<typeof result>> => {
        return fluentMapper(notNull(result));
    };
    result.notMaybe = () : FluentMapper<NotMaybeMapper<typeof result>> => {
        return fluentMapper(notMaybe(result));
    };

    result.optional = () : FluentMapper<OptionalMapper<typeof result>> => {
        return fluentMapper(optional(result));
    };

    result.or = <ArrT extends AnySafeMapper[]> (...arr : ArrT) : (
        FluentMapper<
            OrMapper<
                Parameters<(head : typeof result, ...tail : ArrT) => unknown>
            >
        >
    ) => {
        return fluentMapper(or(result, ...arr));
    };

    result.pipe = (<ArrT extends AnyMapper[]> (...arr : ArrT) : SafeMapper<unknown> => {
        return fluentMapper(unsafePipe(result, ...arr));
    }) as any;

    result.derive = <
        SrcKeyT extends string,
        DstKeyT extends string
    > (
        srcKey : SrcKeyT,
        dstKey : DstKeyT
    ) : (
        FluentMapper<DeriveMapper<SrcKeyT, DstKeyT, typeof result>>
    ) => {
        return fluentMapper(derive(srcKey, dstKey, result));
    };

    (result as any).rename = <
        SrcKeyT extends string,
        DstKeyT extends string
    > (
        srcKey : SrcKeyT,
        dstKey : DstKeyT
    ) : (
        FluentMapper<RenameMapper<SrcKeyT, DstKeyT, typeof result>>
    ) => {
        return fluentMapper(rename(srcKey, dstKey, result));
    };


    return result;
}
/*
const x = fluentMapper(stringToNaturalNumber())
    .pipe(
        inclusiveRange({
            min : 3.141,
            max : 6.282,
        })
    )
    .derive("x", "y");

*/