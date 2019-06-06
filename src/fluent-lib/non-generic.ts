import * as m from "../functional-lib";
import {fluentMapper, FluentMapper} from "../fluent-mapper";
import {AnySafeMapper} from "../mapper";

function omit<ObjT, K extends Extract<keyof ObjT, string>> (
    obj : ObjT,
    ...keys : K[]
) : (
    Omit<ObjT, K>
) {
    const result = {...obj};
    for (let k of keys) {
        delete result[k];
    }
    return result;
}
function toFluentExport<ObjT extends {
    [k : string] : (...args : any[]) => AnySafeMapper
}> (obj : ObjT) : (
    {
        [k in keyof ObjT] : (
            (...args : Parameters<ObjT[k]>) => FluentMapper<ReturnType<ObjT[k]>>
        )
    }
) {
    const result : any = {};
    for (let k in obj) {
        if (!obj.hasOwnProperty(k)) {
            continue;
        }
        result[k] = function (...args : any[]) {
            return fluentMapper(obj[k](...args));
        };
    }
    return result;
}
//No need for omit<>() because `fluent-lib/index.ts`
//overwrites the generic functions with the ones
//in `fluent-lib/generic.ts`
const fluentExport = toFluentExport(omit(
    m,

    //Well, we need to omit this one because
    //it doesn't return a SafeMapper<>
    "castEnumFlyweight"
));
/*
const fluentExport = toFluentExport(omit(
    m,

    /**
        List compiled with,
        function\s*[a-zA-Z0-9_]+\s*<
    * /
    "arrayLike",

    "arrayLikeToArray",
    "array",

    "castEnumFlyweight",
    "toEnumValue",
    "toEnumKey",
    "toOneEnumValue",
    "toOneEnumKey",

    "enumKey",
    "enumValue",

    "literal",

    "deriveMap",
    "derive",
    "instanceOf",
    "objectFromArray",
    "objectFromMap",
    "object",
    "partialDeriveMap",
    "partialObjectFromArray",
    "partialObjectFromMap",
    "partialObject",
    "partialRenameMap",
    "renameMap",
    "rename",
    "unsafeStringIndexer",
    "stringIndexer",

    "cache",
    "cast",
    "unsafeDeepMerge",
    "deepMerge",
    "excludeLiteral",

    "orUndefined",
    "orNull",
    "orMaybe",
    "notUndefined",
    "notNull",
    "notMaybe",
    "optional",
    "notOptional",

    "unsafeOr",
    "or",

    "pipe",
    "unsafePipe",
    "reallyUnsafePipe",

    "deferred"
));
*/
export = fluentExport;