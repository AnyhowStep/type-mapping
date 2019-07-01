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
} from "../../mapper";
import {pipe} from "../operator";
import {instanceOfObject} from "./instance-of-object";
import {toPropertyAccess} from "../../string-util";
import {makeMappingError} from "../../error-util";

/**
    Use with `and()` or `deepMerge()`

    Derives property `dstKey` from `srcKey`.

    Example 1,

    ```ts
    const f = tm.derive("x", "y", tm.stringToUnsignedInteger())

    f("obj", { x : "34" })              //Gives us { y : 34 }
    f("obj", { y : "34" })              //Error; expected `x`
    f("obj", { x : "34", y : "99" })    //Gives us { y : 34 }
    f("obj", { })                       //Error; expected `x`
    f("obj", { x : undefined })         //Error; expected `x` to be `string|number`
    f("obj", { y : undefined })         //Error; expected `x`
    ```

    Example 2,

    ```ts
    const f = tm.derive("x", "y", tm.optional(tm.stringToUnsignedInteger()))

    f("obj", { x : "34" })              //Gives us { y : 34 }
    f("obj", { y : "34" })              //Gives us { y : undefined }
    f("obj", { x : "34", y : "99" })    //Gives us { y : 34 }
    f("obj", { })                       //Gives us { y : undefined }
    f("obj", { x : undefined })         //Gives us { y : undefined }
    f("obj", { y : undefined })         //Gives us { y : undefined }
    ```

    Example 3,

    ```ts
    const f = tm.derive("x", "y", tm.orUndefined(tm.stringToUnsignedInteger()))

    f("obj", { x : "34" })              //Gives us { y : 34 }
    f("obj", { y : "34" })              //Error; expected `x`
    f("obj", { x : "34", y : "99" })    //Gives us { y : 34 }
    f("obj", { })                       //Error; expected `x`
    f("obj", { x : undefined })         //Gives us { y : undefined }
    f("obj", { y : undefined })         //Error; expected `x`
    ```

    ```ts
    //derive<>() can be used while keeping the old field,
    const f = tm.deepMerge(
        tm.object({
            x : tm.unsignedIntegerString()
        }),
        tm.derive("x", "y", tm.stringToUnsignedInteger())
    );
    ```

*/
export type DeriveMapper<
    SrcKeyT extends string,
    DstKeyT extends string,
    F extends AnySafeMapper
> = (
    & SafeMapper<
        { [dst in DstKeyT] : OutputOf<F> }
    >
    & ExpectedInput<
        IsExpectedInputOptional<F> extends true ?
        { [src in SrcKeyT]? : ExpectedInputOf<F> } :
        { [src in SrcKeyT] : ExpectedInputOf<F> }
    >
    & MappableInput<
        IsOptional<F> extends true ?
        { [src in SrcKeyT]? : MappableInputOf<F> } :
        { [src in SrcKeyT] : MappableInputOf<F> }
    >
    & ExtractRunTimeModifierOrUnknown<F>
);
export function derive<
    SrcKeyT extends string,
    DstKeyT extends string,
    F extends AnySafeMapper
> (
    srcKey : SrcKeyT,
    dstKey : DstKeyT,
    f : F
) : (
    DeriveMapper<SrcKeyT, DstKeyT, F>
) {
    /**
        TODO
                        | `orUndefined` | `optional` | `runTimeRequired()`
        compile-time    | -no-effect    | optional   | -no-effect-
        run-time        | optional      | optional   | required
    */
    const runTimeRequired = getRunTimeRequiredFlagOrFalse(f);
    const result = pipe(
        instanceOfObject(),
        (name : string, mixed : Object) : ({ [dst in DstKeyT] : OutputOf<F> }) => {
            if (!Object.prototype.hasOwnProperty.call(mixed, srcKey)) {
                if (runTimeRequired) {
                    throw makeMappingError({
                        message : `${name}${toPropertyAccess(srcKey)} must be explicitly set`,
                        inputName : `${name}${toPropertyAccess(srcKey)}`,
                        actualValue : undefined,
                        expected : `explicitly set`,
                    });
                }
            }

            const obj : (
                { [dst in DstKeyT] : OutputOf<F> }
            ) = {
                [dstKey] : f(
                    `${name}${toPropertyAccess(srcKey)}`,
                    (mixed as any)[srcKey]
                ),
            } as any;
            return obj;
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

const __0 = derive("x", "y", _0);
const __1 = derive("x", "y", _1);
const __2 = derive("x", "y", _2);
const __3 = derive("x", "y", _3);

const __01 = derive("x", "y", _01);
const __02 = derive("x", "y", _02);
const __03 = derive("x", "y", _03);

const __12 = derive("x", "y", _12);
const __13 = derive("x", "y", _13);

const __23 = derive("x", "y", _23);
*/