import {AnySafeMapper, Name, ExtendedMapper, OutputOf, MappableInputOf, AnyMapper, AssertPipeable} from "../mapper";
import * as m from "../functional-lib";
import {fluentMapper, FluentMapper} from "../fluent-mapper";
import {Enum, EnumKey} from "../enum-util";
import {ToOneEnumValueMapper, ToOneEnumKeyMapper, ObjectFromArrayMapper, ObjectFromMapMapper, CastDelegate, PipeMapper, PartialObjectFromMapMapper, PartialObjectFromArrayMapper} from "../functional-lib";
import {LiteralType} from "../primitive";
import { FieldMap, SafeMapperMap } from "../field-map";

export function arrayLike<F extends AnySafeMapper> (f : F) {
    return fluentMapper(m.arrayLike<F>(f));
}

export function arrayLikeToArray<F extends AnySafeMapper> (f : F) {
    return fluentMapper(m.arrayLikeToArray<F>(f));
}
export function array<F extends AnySafeMapper> (f : F) {
    return fluentMapper(m.array<F>(f));
}

export type FluentCastEnumFlyweight<E extends typeof Enum> = (
    {
        toValue : {
            [k in EnumKey<E>] : (
                FluentMapper<ToOneEnumValueMapper<E, k>>
            )
        },
        toKey : {
            [k in EnumKey<E>] : (
                FluentMapper<ToOneEnumKeyMapper<E, k>>
            )
        },
    }
);
export function castEnumFlyweight<E extends typeof Enum> (e : E) : FluentCastEnumFlyweight<E> {
    const src = m.castEnumFlyweight<E>(e);
    const result : FluentCastEnumFlyweight<E> = {
        toValue : {},
        toKey : {},
    } as any;
    for (let k in src.toValue) {
        if (!src.toValue.hasOwnProperty(k)) {
            continue;
        }
        (result.toValue as any)[k] = fluentMapper((src.toValue as any)[k]);
    }
    for (let k in src.toKey) {
        if (!src.toKey.hasOwnProperty(k)) {
            continue;
        }
        (result.toKey as any)[k] = fluentMapper((src.toKey as any)[k]);
    }
    return result;
}

export function toEnumValue<E extends typeof Enum> (e : E) {
    return fluentMapper(m.toEnumValue<E>(e));
}
export function toEnumKey<E extends typeof Enum> (e : E) {
    return fluentMapper(m.toEnumKey<E>(e));
}
export function toOneEnumValue<E extends typeof Enum, K extends EnumKey<E>> (e : E, k : K) {
    return fluentMapper(m.toOneEnumValue<E, K>(e, k));
}
export function toOneEnumKey<E extends typeof Enum, K extends EnumKey<E>> (e : E, k : K) {
    return fluentMapper(m.toOneEnumKey<E, K>(e, k));
}

export function enumKey<E extends typeof Enum> (e : E) {
    return fluentMapper(m.enumKey<E>(e));
}
export function enumValue<E extends typeof Enum> (e : E) {
    return fluentMapper(m.enumValue<E>(e));
}

export function literal<ArrT extends LiteralType[]> (...arr : ArrT) {
    return fluentMapper(m.literal<ArrT>(...arr));
}

export function deriveMap<MapT extends FieldMap> (map : MapT) {
    return fluentMapper(m.deriveMap<MapT>(map));
}
export function derive<
    SrcKeyT extends string,
    DstKeyT extends string,
    F extends AnySafeMapper
> (
    srcKey : SrcKeyT,
    dstKey : DstKeyT,
    f : F
) {
    return fluentMapper(m.derive<SrcKeyT, DstKeyT, F>(srcKey, dstKey, f));
}
export function instanceOf<T> (ctor : new (...args : any[]) => T) {
    return fluentMapper(m.instanceOf<T>(ctor));
}
export function objectFromArray<ArrT extends (AnySafeMapper & Name<string>)[]> (...arr : ArrT) {
    return fluentMapper(m.objectFromArray<ArrT>(...arr));
}
export function objectFromMap<MapT extends SafeMapperMap> (map : MapT) {
    return fluentMapper(m.objectFromMap<MapT>(map));
}
export function object<ArrT extends (AnySafeMapper & Name<string>)[]> (...arr : ArrT) : (
    FluentMapper<ObjectFromArrayMapper<ArrT>>
);
export function object<
    MapT extends SafeMapperMap
> (
    map : MapT
) : (
    FluentMapper<ObjectFromMapMapper<MapT>>
);
export function object (...arr : any[]) {
    return fluentMapper(m.object(...arr));
}
export function partialDeriveMap<MapT extends FieldMap> (map : MapT) {
    return fluentMapper(m.partialDeriveMap<MapT>(map));
}
export function partialObjectFromArray<ArrT extends (AnySafeMapper & Name<string>)[]> (...arr : ArrT) {
    return fluentMapper(m.partialObjectFromArray<ArrT>(...arr));
}
export function partialObjectFromMap<MapT extends SafeMapperMap> (map : MapT) {
    return fluentMapper(m.partialObjectFromMap<MapT>(map));
}
export function partialObject<ArrT extends (AnySafeMapper & Name<string>)[]> (...arr : ArrT) : (
    FluentMapper<PartialObjectFromArrayMapper<ArrT>>
);
export function partialObject<
    MapT extends SafeMapperMap
> (
    map : MapT
) : (
    FluentMapper<PartialObjectFromMapMapper<MapT>>
);
export function partialObject (...arr : any[]) {
    return fluentMapper(m.partialObject(...arr));
}
export function partialRenameMap<MapT extends FieldMap> (map : MapT) {
    return fluentMapper(m.partialRenameMap<MapT>(map));
}
export function renameMap<MapT extends FieldMap> (map : MapT) {
    return fluentMapper(m.renameMap<MapT>(map));
}
export function rename<
    SrcKeyT extends string,
    DstKeyT extends string,
    F extends AnySafeMapper
> (
    srcKey : SrcKeyT,
    dstKey : DstKeyT,
    f : F
) {
    return fluentMapper(m.rename<SrcKeyT, DstKeyT, F>(srcKey, dstKey, f));
}
export function unsafeStringIndexer<F extends AnySafeMapper> (f : F) {
    return fluentMapper(m.unsafeStringIndexer<F>(f));
}
export function stringIndexer<F extends AnySafeMapper> (f : F) {
    return fluentMapper(m.stringIndexer<F>(f));
}

export function cache<
    CachedT,
    F extends ExtendedMapper<any, any, [CachedT]>
> (
    cached : CachedT,
    f : F
) {
    return fluentMapper(m.cache<CachedT, F>(cached, f));
}
export function cast<
    SrcF extends AnySafeMapper,
    DstF extends AnySafeMapper
> (
    srcDelegate : SrcF,
    castDelegate : CastDelegate<OutputOf<SrcF>, MappableInputOf<DstF>>,
    dstDelegate : DstF
) {
    return fluentMapper(m.cast<SrcF, DstF>(srcDelegate, castDelegate, dstDelegate));
}
export function unsafeDeepMerge<ArrT extends AnySafeMapper[]> (
    ...arr : ArrT
) {
    return fluentMapper(m.unsafeDeepMerge<ArrT>(...arr));
}
export function deepMerge<F extends AnySafeMapper, ArrT extends AnySafeMapper[]> (
    f : F,
    ...arr : ArrT
) {
    return fluentMapper(m.deepMerge<F, ArrT>(f, ...arr));
}
export function excludeLiteral<
    F extends AnySafeMapper,
    ArrT extends LiteralType[]
> (f : F, ...arr : ArrT) {
    return fluentMapper(m.excludeLiteral<F, ArrT>(f, ...arr));
}

export function orUndefined<F extends AnySafeMapper> (f : F) {
    return fluentMapper(m.orUndefined<F>(f));
}
export function orNull<F extends AnySafeMapper> (f : F) {
    return fluentMapper(m.orNull<F>(f));
}
export function orMaybe<F extends AnySafeMapper> (f : F) {
    return fluentMapper(m.orMaybe<F>(f));
}
export function notUndefined<F extends AnySafeMapper> (f : F) {
    return fluentMapper(m.notUndefined<F>(f));
}
export function notNull<F extends AnySafeMapper> (f : F) {
    return fluentMapper(m.notNull<F>(f));
}
export function notMaybe<F extends AnySafeMapper> (f : F) {
    return fluentMapper(m.notMaybe<F>(f));
}
export function optional<F extends AnySafeMapper> (f : F) {
    return fluentMapper(m.optional<F>(f));
}
export function notOptional<F extends AnySafeMapper> (f : F) {
    return fluentMapper(m.notOptional<F>(f));
}

export function unsafeOr<ArrT extends AnySafeMapper[]> (...arr : ArrT) {
    return fluentMapper(m.unsafeOr<ArrT>(...arr));
}
export function or<
    F extends AnySafeMapper,
    ArrT extends AnySafeMapper[]
> (
    f : F,
    ...arr : ArrT
) {
    return fluentMapper(m.or<F, ArrT>(f, ...arr));
}

export function pipe<
    F0 extends AnySafeMapper,
    F1 extends AnyMapper
> (
    f0 : F0,
    f1 : AssertPipeable<F0, F1>
) : (
    FluentMapper<PipeMapper<F0, F1>>
);
export function pipe<
    F0 extends AnySafeMapper,
    F1 extends AnyMapper,
    F2 extends AnyMapper
> (
    f0 : F0,
    f1 : AssertPipeable<F0, F1>,
    f2 : AssertPipeable<F1, F2>
) : (
    FluentMapper<PipeMapper<F0, F2>>
);
export function pipe<
    F0 extends AnySafeMapper,
    F1 extends AnyMapper,
    F2 extends AnyMapper,
    F3 extends AnyMapper
> (
    f0 : F0,
    f1 : AssertPipeable<F0, F1>,
    f2 : AssertPipeable<F1, F2>,
    f3 : AssertPipeable<F2, F3>
) : (
    FluentMapper<PipeMapper<F0, F3>>
);
export function pipe<
    F0 extends AnySafeMapper,
    F1 extends AnyMapper,
    F2 extends AnyMapper,
    F3 extends AnyMapper,
    F4 extends AnyMapper
> (
    f0 : F0,
    f1 : AssertPipeable<F0, F1>,
    f2 : AssertPipeable<F1, F2>,
    f3 : AssertPipeable<F2, F3>,
    f4 : AssertPipeable<F3, F4>
) : (
    FluentMapper<PipeMapper<F0, F4>>
);
export function pipe<ArrT extends AnyMapper[]> (...arr : ArrT) {
    return fluentMapper(m.reallyUnsafePipe(...arr));
}
export function unsafePipe<
    SrcF extends AnySafeMapper,
    ArrT extends AnyMapper[]
> (f : SrcF, ...arr : ArrT) {
    return fluentMapper(m.unsafePipe<SrcF, ArrT>(f, ...arr));
}
export function reallyUnsafePipe<ArrT extends AnyMapper[]> (...arr : ArrT) {
    return fluentMapper(m.reallyUnsafePipe<ArrT>(...arr));
}
export function deferred<OutputT> () {
    return fluentMapper(m.deferred<OutputT>());
}