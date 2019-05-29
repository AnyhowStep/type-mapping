import {
    SafeMapper,
    AnySafeMapper,
    OutputOf,
    AnyMapper,
    AssertPipeable,
    MappableInputOf,
    ExpectedInputOf,
    WithExpectedInput,
    withExpectedInput,
    getNameOrEmptyString,
    WithName,
    withName,
    NameOf,
    OptionalFlagOf,
    getOptionalFlagOrFalse,
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
    ArrayLikeMapper,
    ArrayMapper,
    ArrayLikeToArrayMapper,
    StringIndexerMapper,
    UnsafeStringIndexerMapper,
    arrayLike,
    array,
    arrayLikeToArray,
    unsafeStringIndexer,
    stringIndexer,
} from "./mapper-lib";
import {LiteralType} from "./primitive";
import {setFunctionName} from "./type-util";

export interface FluentMapper<F extends AnySafeMapper> {
    (name : string, mixed : unknown) : OutputOf<F>;

    __expectedInput? : [ExpectedInputOf<F>];
    __mappableInput? : [MappableInputOf<F>];
    __optional : OptionalFlagOf<F>;
    name : NameOf<F>,

    //== mapper/operation ==

    withExpectedInput<AcceptT extends MappableInputOf<F>> () : (
        FluentMapper<
            WithExpectedInput<F, AcceptT>
        >
    );

    //== field ==

    withName<
        NameT extends string
    > (
        name : NameT
    ) : (
        FluentMapper<WithName<F, NameT>>
    );

    //== array-like ==

    arrayLike () : FluentMapper<ArrayLikeMapper<F>>;

    //== array ==

    array () : FluentMapper<ArrayMapper<F>>;

    arrayLikeToArray () : FluentMapper<ArrayLikeToArrayMapper<F>>;

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

    rename<
        SrcKeyT extends string,
        DstKeyT extends string
    > (
        srcKey : SrcKeyT,
        dstKey : DstKeyT
    ) : (
        FluentMapper<RenameMapper<SrcKeyT, DstKeyT, F>>
    );

    unsafeStringIndexer () : FluentMapper<UnsafeStringIndexerMapper<F>>;

    stringIndexer () : FluentMapper<StringIndexerMapper<F>>;

    //== operator ==

    cast<DstF extends AnySafeMapper> (
        castDelegate : CastDelegate<OutputOf<F>, MappableInputOf<DstF>>,
        dstDelegate : DstF
    ) : (
        FluentMapper<CastMapper<F, DstF>>
    );

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

    unsafePipe<ArrT extends AnyMapper[]> (...arr : ArrT) : FluentMapper<SafeMapper<unknown>>;
}

export function fluentMapper<F extends AnySafeMapper> (f : F) : FluentMapper<F> {
    const result = function (name : string, mixed : unknown) : OutputOf<F> {
        return f(name, mixed);
    };
    result.__optional = getOptionalFlagOrFalse(f);
    result.name = getNameOrEmptyString(f);
    setFunctionName(result, result.name);

    //== mapper/operation

    result.withExpectedInput = <AcceptT extends MappableInputOf<F>> () : (
        FluentMapper<
            WithExpectedInput<F, AcceptT>
        >
    ) => {
        return fluentMapper(withExpectedInput(f)<AcceptT>());
    };

    result.withName = <
        NameT extends string
    > (
        name : NameT
    ) : (
        FluentMapper<WithName<F, NameT>>
    ) => {
        return fluentMapper(withName(f, name));
    };

    //== array-like ==

    result.arrayLike = () : FluentMapper<ArrayLikeMapper<F>> => {
        return fluentMapper(arrayLike(f));
    };

    //== array ==

    result.array = () : FluentMapper<ArrayMapper<F>> => {
        return fluentMapper(array(f));
    };

    result.arrayLikeToArray = () : FluentMapper<ArrayLikeToArrayMapper<F>> => {
        return fluentMapper(arrayLikeToArray(f));
    };


    // == object

    result.derive = <
        SrcKeyT extends string,
        DstKeyT extends string
    > (
        srcKey : SrcKeyT,
        dstKey : DstKeyT
    ) : (
        FluentMapper<DeriveMapper<SrcKeyT, DstKeyT, F>>
    ) => {
        return fluentMapper(derive(srcKey, dstKey, f));
    };

    result.rename = <
        SrcKeyT extends string,
        DstKeyT extends string
    > (
        srcKey : SrcKeyT,
        dstKey : DstKeyT
    ) : (
        FluentMapper<RenameMapper<SrcKeyT, DstKeyT, F>>
    ) => {
        return fluentMapper(rename(srcKey, dstKey, f));
    };

    result.unsafeStringIndexer = () : FluentMapper<UnsafeStringIndexerMapper<F>> => {
        return fluentMapper(unsafeStringIndexer(f));
    };

    result.stringIndexer = () : FluentMapper<StringIndexerMapper<F>> => {
        return fluentMapper(stringIndexer(f));
    };

    //== operator ==

    result.cast = <DstF extends AnySafeMapper> (
        castDelegate : CastDelegate<OutputOf<F>, MappableInputOf<DstF>>,
        dstDelegate : DstF
    ) : (
        FluentMapper<CastMapper<F, DstF>>
    ) => {
        return fluentMapper(cast(f, castDelegate, dstDelegate));
    };

    result.deepMerge = function<ArrT extends SafeMapper<object>[]> (this : SafeMapper<object>, ...arr : ArrT) : (
        FluentMapper<
            DeepMergeMapper<
                Parameters<(head : Extract<F, SafeMapper<object>>, ...tail : ArrT) => unknown>
            >
        >
    ) {
        return fluentMapper(deepMerge(
            f,
            ...arr
        ));
    };

    result.excludeLiteral = <ArrT extends LiteralType[]> (...arr : ArrT) : (
        FluentMapper<ExcludeLiteralMapper<F, ArrT>>
    ) => {
        return fluentMapper(excludeLiteral(f, ...arr));
    };

    result.orUndefined = () : FluentMapper<OrUndefinedMapper<F>> => {
        return fluentMapper(orUndefined(f));
    };
    result.orNull = () : FluentMapper<OrNullMapper<F>> => {
        return fluentMapper(orNull(f));
    };
    result.orMaybe = () : FluentMapper<OrMaybeMapper<F>> => {
        return fluentMapper(orMaybe(f));
    };

    result.notUndefined = () : FluentMapper<NotUndefinedMapper<F>> => {
        return fluentMapper(notUndefined(f));
    };
    result.notNull = () : FluentMapper<NotNullMapper<F>> => {
        return fluentMapper(notNull(f));
    };
    result.notMaybe = () : FluentMapper<NotMaybeMapper<F>> => {
        return fluentMapper(notMaybe(f));
    };

    result.optional = () : FluentMapper<OptionalMapper<F>> => {
        return fluentMapper(optional(f));
    };

    result.or = <ArrT extends AnySafeMapper[]> (...arr : ArrT) : (
        FluentMapper<
            OrMapper<
                Parameters<(head : F, ...tail : ArrT) => unknown>
            >
        >
    ) => {
        return fluentMapper(or(f, ...arr));
    };

    result.pipe = (<ArrT extends AnyMapper[]> (...arr : ArrT) : FluentMapper<SafeMapper<unknown>> => {
        return fluentMapper(unsafePipe(f, ...arr));
    }) as any;

    result.unsafePipe = <ArrT extends AnyMapper[]>(...arr : ArrT) : FluentMapper<SafeMapper<unknown>> => {
        return fluentMapper(unsafePipe(...arr));
    };

    return result;
}
/*
import {stringToUnsignedInteger, inclusiveRange} from "./mapper-lib";
const n = stringToUnsignedInteger();
const x = fluentMapper(n);
x.__optional
x.__expectedInput
x.__mappableInput
const y = x
    .pipe(
        inclusiveRange({
            min : 3.141,
            max : 6.282,
        })
    )
    .derive("x", "y");
const opt = x.optional()
    .withName("qwerty");
//const x2 = x.withExpectedInput<any>();
//*/