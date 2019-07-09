import {
    AnySafeMapper,
    SafeMapper,
    OutputOf,
    ExpectedInputOf,
    MappableInputOf,
    ExpectedInput,
    MappableInput,
    ExtractRunTimeModifierOrUnknown,
    IsOptional,
    IsExpectedInputOptional,
    copyRunTimeModifier,
    getRunTimeRequiredFlagOrFalse,
    tryMapHandled,
} from "../../mapper";
import {pipe} from "../operator";
import {instanceOfObject} from "./instance-of-object";
import {toPropertyAccess} from "../../string-util";
import {makeMappingError} from "../../error-util";

/**
    Use with `and()` or `deepMerge()`

    Renames a property from `srcKey` to `dstKey`.

    Example 1,

    ```ts
    const f = tm.rename("x", "y", tm.stringToUnsignedInteger())

    f("obj", { x : "34" })              //Gives us { y : 34 }
    f("obj", { y : "34" })              //Gives us { y : 34 }
    f("obj", { x : "34", y : "99" })    //Gives us { y : 99 }
    f("obj", { })                       //Error
    f("obj", { x : undefined })         //Error
    f("obj", { y : undefined })         //Error
    ```

    Example 2,

    ```ts
    const f = tm.rename("x", "y", tm.optional(tm.stringToUnsignedInteger()))

    f("obj", { x : "34" })              //Gives us { y : 34 }
    f("obj", { y : "34" })              //Gives us { y : 34 }
    f("obj", { x : "34", y : "99" })    //Gives us { y : 99 }
    f("obj", { })                       //Gives us { y : undefined }
    f("obj", { x : undefined })         //Gives us { y : undefined }
    f("obj", { y : undefined })         //Gives us { y : undefined }
    ```

    Example 3,

    ```ts
    const f = tm.rename("x", "y", tm.orUndefined(tm.stringToUnsignedInteger()))

    f("obj", { x : "34" })              //Gives us { y : 34 }
    f("obj", { y : "34" })              //Gives us { y : 34 }
    f("obj", { x : "34", y : "99" })    //Gives us { y : 99 }
    f("obj", { })                       //Error
    f("obj", { x : undefined })         //Gives us { y : undefined }
    f("obj", { y : undefined })         //Gives us { y : undefined }
    ```
*/
export type RenameMapper<
    SrcKeyT extends string,
    DstKeyT extends string,
    F extends AnySafeMapper
> = (
    & SafeMapper<
        { [dst in DstKeyT] : OutputOf<F> }
    >
    & ExpectedInput<
        IsExpectedInputOptional<F> extends true ?
        { [dst in DstKeyT]? : ExpectedInputOf<F> } :
        { [dst in DstKeyT] : ExpectedInputOf<F> }
    >
    & MappableInput<
        IsOptional<F> extends true ?
        (
            | { [src in SrcKeyT]? : MappableInputOf<F> }
            | { [dst in DstKeyT]? : MappableInputOf<F> }
        ) :
        (
            | { [src in SrcKeyT] : MappableInputOf<F> }
            | { [dst in DstKeyT] : MappableInputOf<F> }
        )
    >
    & ExtractRunTimeModifierOrUnknown<F>
);
export function rename<
    SrcKeyT extends string,
    DstKeyT extends string,
    F extends AnySafeMapper
> (
    srcKey : SrcKeyT,
    dstKey : DstKeyT,
    f : F
) : (
    RenameMapper<SrcKeyT, DstKeyT, F>
) {
    const runTimeRequired = getRunTimeRequiredFlagOrFalse(f);
    const result = pipe(
        instanceOfObject(),
        (name : string, mixed : Object) : ({ [dst in DstKeyT] : OutputOf<F> }) => {
            let unsafeKey : string = "";
            let unsafeName : string = "";
            let unsafeValue : unknown = undefined;
            if (Object.prototype.hasOwnProperty.call(mixed, dstKey)) {
                unsafeKey = dstKey;
                unsafeName = `${name}${toPropertyAccess(dstKey)}`;
                unsafeValue = (mixed as any)[dstKey];
            } else if (Object.prototype.hasOwnProperty.call(mixed, srcKey)) {
                unsafeKey = srcKey;
                unsafeName = `${name}${toPropertyAccess(srcKey)}`;
                unsafeValue = (mixed as any)[srcKey];
            } else if (runTimeRequired) {
                const expected = `object with explicitly set property ${JSON.stringify(dstKey)}`;
                throw makeMappingError({
                    message : `${name} must be ${expected}`,
                    inputName : name,
                    actualValue : mixed,
                    expected,
                    expectedMeta : {
                        srcKey,
                        dstKey,
                    },

                    propertyErrors : [
                        makeMappingError({
                            message : `${name}${toPropertyAccess(dstKey)} must be explicitly set`,
                            inputName : `${name}${toPropertyAccess(dstKey)}`,
                            actualValue : undefined,
                            expected : `explicitly set`,
                        }),
                    ],
                });
            } else {
                unsafeKey = dstKey;
                unsafeName = `${name}${toPropertyAccess(dstKey)}`;
                unsafeValue = undefined;
            }

            const dstResult = tryMapHandled(
                f,
                unsafeName,
                unsafeValue
            );
            if (dstResult.success) {
                const obj : (
                    { [dst in DstKeyT] : OutputOf<F> }
                ) = {
                    [dstKey] : dstResult.value,
                } as any;
                return obj;
            }

            if (dstResult.mappingError.expected == undefined) {
                throw makeMappingError({
                    message : `${name} must be valid object. ${dstResult.mappingError.message}`,
                    inputName : name,
                    actualValue : mixed,
                    expected : `valid object`,
                    expectedMeta : {
                        srcKey,
                        dstKey,
                    },

                    propertyErrors : [
                        dstResult.mappingError,
                    ],
                });
            } else {
                const expected = `object with ${dstResult.mappingError.expected} property ${JSON.stringify(unsafeKey)}`;
                throw makeMappingError({
                    message : `${name} must be ${expected}`,
                    inputName : name,
                    actualValue : mixed,
                    expected,
                    expectedMeta : {
                        srcKey,
                        dstKey,
                    },

                    propertyErrors : [
                        dstResult.mappingError,
                    ],
                });
            }
        }
    );
    return copyRunTimeModifier(
        f,
        result
    ) as any;
}
/*
const a = unsignedInteger();
const b = optional(unsignedInteger());
const c = string();
const d = optional(string());

declare const _0 : typeof a;
declare const _1 : typeof b;
declare const _2 : typeof c;
declare const _3 : typeof d;

declare const _01 : (typeof a) | (typeof b);
declare const _02 : (typeof a) | (typeof c);
declare const _03 : (typeof a) | (typeof d);

declare const _12 : (typeof b) | (typeof c);
declare const _13 : (typeof b) | (typeof d);

declare const _23 : (typeof c) | (typeof d);

const __0 = rename("x", "y", _0);
const __1 = rename("x", "y", _1);
const __2 = rename("x", "y", _2);
const __3 = rename("x", "y", _3);

const __01 = rename("x", "y", _01);
const __02 = rename("x", "y", _02);
const __03 = rename("x", "y", _03);

const __12 = rename("x", "y", _12);
const __13 = rename("x", "y", _13);

const __23 = rename("x", "y", _23);
*/