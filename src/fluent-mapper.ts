import {
    AnySafeMapper,
    SafeMapper,
    OutputOf,
    AnyMapper,
    AssertPipeable,
    MappableInputOf,
    ExpectedInputOf,
    HandledInputOf,
    WithExpectedInput,
    withExpectedInput,
    getNameOrEmptyString,
    WithName,
    withName,
    NameOf,
    OptionalFlagOf,
    getOptionalFlagOrFalse,
    TryMapResult,
    _debugIsExpectedInput,
    _DebugIsExpectedInput,
    _DebugIsHandledInput,
    _DebugIsMappableInput,
    _DebugIsOutput,
    map,
    mapExpected,
    mapMappable,
    mapHandled,
    tryMap,
    tryMapExpected,
    tryMapMappable,
    tryMapHandled,
    ExpectMappableInput,
    expectMappableInput,
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
    CastMapper,
    CastDelegate,
    cast,
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
    UnsafePipeMapper,
    DeepMergeMapper,
    deepMerge,
    NotOptionalMapper,
    notOptional,
    DeferredMapper,
} from "./functional-lib";
import {LiteralType} from "./primitive";
import {setFunctionName} from "./type-util";

export interface FluentMapper<F extends AnySafeMapper> {
    (name : string, mixed : unknown) : OutputOf<F>;

    __expectedInput? : [ExpectedInputOf<F>];
    __mappableInput? : [MappableInputOf<F>];
    __optional : OptionalFlagOf<F>;
    __name : NameOf<F>,

    //== mapper/debug ==

    _debugIsExpectedInput<X>(
        this : _DebugIsExpectedInput<F, X>,
        _x : X
    ) : void;
    _debugIsHandledInput<X>(
        this : _DebugIsHandledInput<F, X>,
        _x : X
    ) : void;
    _debugIsMappableInput<X>(
        this : _DebugIsMappableInput<F, X>,
        _x : X
    ) : void;
    _debugIsOutput<X>(
        this : _DebugIsOutput<F, X>,
        _x : X
    ) : void;

    //== mapper/operation ==

    map (name : string, mixed : ExpectedInputOf<F>) : OutputOf<F>;
    mapExpected (name : string, mixed : ExpectedInputOf<F>) : OutputOf<F>;
    mapMappable (name : string, mixed : MappableInputOf<F>) : OutputOf<F>;
    mapHandled (name : string, mixed : HandledInputOf<F>) : OutputOf<F>;

    tryMap (name : string, mixed : ExpectedInputOf<F>) : TryMapResult<OutputOf<F>>;
    tryMapExpected (name : string, mixed : ExpectedInputOf<F>) : TryMapResult<OutputOf<F>>;
    tryMapMappable (name : string, mixed : MappableInputOf<F>) : TryMapResult<OutputOf<F>>;
    tryMapHandled (name : string, mixed : HandledInputOf<F>) : TryMapResult<OutputOf<F>>;

    expectMappableInput () : (
        FluentMapper<
            ExpectMappableInput<F>
        >
    );

    withExpectedInput<AcceptT extends MappableInputOf<F>> () : (
        FluentMapper<
            WithExpectedInput<F, AcceptT>
        >
    );

    withName<NameT extends string>(
        name : NameT
    ) : (
        FluentMapper<WithName<F, NameT>>
    )

    //== array ==

    array () : FluentMapper<ArrayMapper<F>>;

    arrayLikeToArray () : FluentMapper<ArrayLikeToArrayMapper<F>>;

    //== array-like ==

    arrayLike () : FluentMapper<ArrayLikeMapper<F>>;

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

    deepMerge<ArrT extends AnySafeMapper[]> (...arr : ArrT) : (
        FluentMapper<DeepMergeMapper<F, ArrT>>
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
    notOptional () : FluentMapper<NotOptionalMapper<F>>;

    or<ArrT extends AnySafeMapper[]> (...arr : ArrT) : (
        FluentMapper<OrMapper<F, ArrT>>
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

    unsafePipe<ArrT extends AnyMapper[]> (...arr : ArrT) : FluentMapper<UnsafePipeMapper<F>>;

    //== type ==
    /**
        Special case for `deferred<>()`
    */
    setImplementation (
        this : (
            F extends {
                setImplementation (impl : SafeMapper<OutputOf<F>>) : void,
            } ?
            unknown :
            ["Cannot call setImplementation() on non-deferred mapper"]
        ),
        impl : SafeMapper<OutputOf<F>>
    ) : void;
}

export function fluentMapper<F extends AnySafeMapper> (f : F) : FluentMapper<F> {
    const result = function (name : string, mixed : unknown) : OutputOf<F> {
        return f(name, mixed);
    };
    result.__optional = getOptionalFlagOrFalse(f);

    //== mapper/debug ==

    result._debugIsExpectedInput = function<X> (
        this : _DebugIsExpectedInput<F, X>,
        _x : X
    ) : void {
    }
    result._debugIsHandledInput = function<X> (
        this : _DebugIsHandledInput<F, X>,
        _x : X
    ) : void {
    }
    result._debugIsMappableInput = function<X> (
        this : _DebugIsMappableInput<F, X>,
        _x : X
    ) : void {
    }
    result._debugIsOutput = function<X> (
        this : _DebugIsOutput<F, X>,
        _x : X
    ) : void {
    }

    //== mapper/operation ==

    result.map = (name : string, mixed : ExpectedInputOf<F>) : OutputOf<F> => {
        return map(f, name, mixed);
    };
    result.mapExpected = (name : string, mixed : ExpectedInputOf<F>) : OutputOf<F> => {
        return mapExpected(f, name, mixed);
    };
    result.mapMappable = (name : string, mixed : MappableInputOf<F>) : OutputOf<F> => {
        return mapMappable(f, name, mixed);
    };
    result.mapHandled = (name : string, mixed : HandledInputOf<F>) : OutputOf<F> => {
        return mapHandled(f, name, mixed);
    };

    result.tryMap = (name : string, mixed : ExpectedInputOf<F>) : TryMapResult<OutputOf<F>> => {
        return tryMap(f, name, mixed);
    };
    result.tryMapExpected = (name : string, mixed : ExpectedInputOf<F>) : TryMapResult<OutputOf<F>> => {
        return tryMapExpected(f, name, mixed);
    };
    result.tryMapMappable = (name : string, mixed : MappableInputOf<F>) : TryMapResult<OutputOf<F>> => {
        return tryMapMappable(f, name, mixed);
    };
    result.tryMapHandled = (name : string, mixed : HandledInputOf<F>) : TryMapResult<OutputOf<F>> => {
        return tryMapHandled(f, name, mixed);
    };

    result.expectMappableInput = () : (
        FluentMapper<
            ExpectMappableInput<F>
        >
    ) => {
        return fluentMapper(expectMappableInput(f));
    };

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

    //== array ==

    result.array = () : FluentMapper<ArrayMapper<F>> => {
        return fluentMapper(array(f));
    };

    result.arrayLikeToArray = () : FluentMapper<ArrayLikeToArrayMapper<F>> => {
        return fluentMapper(arrayLikeToArray(f));
    };

    //== array-like ==

    result.arrayLike = () : FluentMapper<ArrayLikeMapper<F>> => {
        return fluentMapper(arrayLike(f));
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

    result.deepMerge = <ArrT extends AnySafeMapper[]> (...arr : ArrT) : (
        FluentMapper<DeepMergeMapper<F, ArrT>>
    ) => {
        const result : DeepMergeMapper<F, ArrT> = deepMerge<F, ArrT>(
            f,
            ...arr
        );
        return fluentMapper(result);
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

    result.notOptional = () : FluentMapper<NotOptionalMapper<F>> => {
        return fluentMapper(notOptional(f));
    };

    result.or = <ArrT extends AnySafeMapper[]> (...arr : ArrT) : (
        FluentMapper<OrMapper<F, ArrT>>
    ) => {
        return fluentMapper(or(f, ...arr));
    };

    result.pipe = (<ArrT extends AnyMapper[]> (...arr : ArrT) : FluentMapper<UnsafePipeMapper<F>> => {
        return fluentMapper(unsafePipe(f, ...arr));
    }) as any;

    result.unsafePipe = <ArrT extends AnyMapper[]>(...arr : ArrT) : FluentMapper<UnsafePipeMapper<F>> => {
        return fluentMapper(unsafePipe(f, ...arr));
    };

    //== type ==

    result.setImplementation = function (
        this : (
            F extends {
                setImplementation (f : SafeMapper<OutputOf<F>>) : void,
            } ?
            unknown :
            ["Cannot call setImplementation() on non-deferred mapper"]
        ),
        impl : SafeMapper<OutputOf<F>>
    ) : void {
        (f as unknown as DeferredMapper<any>).setImplementation(impl);
    };

    //const rt : FluentMapper<AnySafeMapper> = result;
    return setFunctionName(
        result,
        getNameOrEmptyString(f)
    );
}
/*
import {stringToUnsignedInteger, inclusiveRange} from "./functional-lib";
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