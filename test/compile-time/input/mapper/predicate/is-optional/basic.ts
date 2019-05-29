import * as tm from "../../../../../../dist";

declare function isOptional<F extends tm.AnySafeMapper> (f : F) : tm.IsOptional<F>

export const doesNotExtendOptional = isOptional(tm.undefined());
export const extendsOptional_containsUndefined = isOptional(tm.optional(tm.unsignedInteger()));
export const extendsOptional_isNotUndefined = isOptional(
    tm.notUndefined(
        tm.optional(
            tm.unsignedInteger()
        )
    )
);

declare const unionOneOptionalOneNotFoo : (
    | (tm.SafeMapper<number|undefined> & tm.Optional)
    | tm.SafeMapper<number|undefined>
);
//This should be of type `boolean`.
//Whenever we use `IsOptional<F>`, we always use it as,
//`IsOptional<F> extends true`
export const unionOneOptionalOneNot = isOptional(unionOneOptionalOneNotFoo);