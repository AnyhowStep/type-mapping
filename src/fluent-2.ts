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
    PipeMapper,
    DeriveMapper,
    RenameMapper,
    cast,
    /*deepMerge,
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
    derive,
    rename,*/
} from "./mapper-lib";
import {LiteralType} from "./primitive";

export type FluentMapper<F extends AnySafeMapper> = F & {


    //== object ==

    derive<
        SrcKeyT extends string,
        DstKeyT extends string
    > (
        srcKey : SrcKeyT,
        dstKey : DstKeyT
    ) : (
        FluentMapper<DeriveMapper<SrcKeyT, DstKeyT, F>>
    );

    //This block no longer takes forever to check
    //*
    derive2<
        SrcKeyT extends string,
        DstKeyT extends string
    > (
        srcKey : SrcKeyT,
        dstKey : DstKeyT
    ) : (
        FluentMapper<DeriveMapper<SrcKeyT, DstKeyT, F>>
    );
    //*
    derive3<
        SrcKeyT extends string,
        DstKeyT extends string
    > (
        srcKey : SrcKeyT,
        dstKey : DstKeyT
    ) : (
        FluentMapper<DeriveMapper<SrcKeyT, DstKeyT, F>>
    );
    //*/

    //This block no longer takes forever to check
    //*
    rename<
        SrcKeyT extends string,
        DstKeyT extends string
    > (
        srcKey : SrcKeyT,
        dstKey : DstKeyT
    ) : (
        FluentMapper<RenameMapper<SrcKeyT, DstKeyT, F>>
    );
    //*/

    //== operator ==

    cast<DstF extends AnySafeMapper> (
        castDelegate : CastDelegate<OutputOf<F>, MappableInputOf<DstF>>,
        dstDelegate : DstF
    ) : (
        FluentMapper<CastMapper<F, DstF>>
    )

    deepMerge<ArrT extends SafeMapper<object>[]> (this : SafeMapper<object>, ...arr : ArrT) : (
        FluentMapper<
            DeepMergeMapper<
                Parameters<(head : Extract<F, SafeMapper<object>>, ...tail : ArrT) => unknown>
            >
        >
    );

    excludeLiteral<ArrT extends LiteralType[]> (...arr : ArrT) : (
        FluentMapper<ExcludeLiteralMapper<F, ArrT>>
    );

    orUndefined () : FluentMapper<OrUndefinedMapper<F>>;
    orNull () : FluentMapper<OrNullMapper<F>>;
    orMaybe () : FluentMapper<OrMaybeMapper<F>>;

    notUndefined () : FluentMapper<NotUndefinedMapper<F>>;
    notNull () : FluentMapper<NotNullMapper<F>>;
    notMaybe () : FluentMapper<NotMaybeMapper<F>>;

    optional () : FluentMapper<OptionalMapper<F>>;

    or<ArrT extends AnySafeMapper[]> (...arr : ArrT) : (
        FluentMapper<
            OrMapper<
                Parameters<(head : F, ...tail : ArrT) => unknown>
            >
        >
    );

    pipe<
        F1 extends AnyMapper
    > (
        f1 : AssertPipeable<F, F1>
    ) : (
        FluentMapper<PipeMapper<F, F1>>
    );
    pipe<
        F1 extends AnyMapper,
        F2 extends AnyMapper
    > (
        f1 : AssertPipeable<F, F1>,
        f2 : AssertPipeable<F1, F2>
    ) : (
        FluentMapper<PipeMapper<F, F2>>
    );
    pipe<
        F1 extends AnyMapper,
        F2 extends AnyMapper,
        F3 extends AnyMapper
    > (
        f1 : AssertPipeable<F, F1>,
        f2 : AssertPipeable<F1, F2>,
        f3 : AssertPipeable<F2, F3>
    ) : (
        FluentMapper<PipeMapper<F, F3>>
    );
    pipe<
        F1 extends AnyMapper,
        F2 extends AnyMapper,
        F3 extends AnyMapper,
        F4 extends AnyMapper
    > (
        f1 : AssertPipeable<F, F1>,
        f2 : AssertPipeable<F1, F2>,
        f3 : AssertPipeable<F2, F3>,
        f4 : AssertPipeable<F3, F4>
    ) : (
        FluentMapper<PipeMapper<F, F4>>
    );
}

/**
    MODIFIES THE FUNCTION `f`!
    DOES NOT RETURN A NEW FUNCTION.
*/
export function fluentMapper<F extends AnySafeMapper> (f : F) : FluentMapper<F> {
    const result : FluentMapper<F> = f as any;

    /*
        You may comment one or two of the `as any` parts
        to make it take a long time to check.
    */
    result.cast = (<DstF extends AnySafeMapper> (
        castDelegate : CastDelegate<OutputOf<F>, MappableInputOf<DstF>>,
        dstDelegate : DstF
    ) : (
        FluentMapper<CastMapper<F, DstF>>
    ) => {
        //Comment the `as any` part to make this take a long time to check
        return fluentMapper(cast(f, castDelegate, dstDelegate)) as any;
    //Comment the `as any` part to make this take a long time to check
    }) as any;


    /*
        Uncomment to cause a compile error.
        You'll see a very long error message.

        196,300+ characters
    */
    /*
    result.cast = (<DstF extends AnySafeMapper> (
        castDelegate : CastDelegate<OutputOf<F>, MappableInputOf<DstF>>,
        dstDelegate : DstF
    ) : (
        FluentMapper<CastMapper<F, DstF>>
    ) => {
        return cast(f, castDelegate, dstDelegate);
    }) as any;
    //*/

    return result;
}

/*
import {stringToNaturalNumber, inclusiveRange} from "./mapper-lib";
const x = fluentMapper(stringToNaturalNumber())
    .pipe(
        inclusiveRange({
            min : 3.141,
            max : 6.282,
        })
    )
    .derive("x", "y");
*/