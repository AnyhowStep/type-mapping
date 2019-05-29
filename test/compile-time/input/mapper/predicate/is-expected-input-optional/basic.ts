import * as tm from "../../../../../../dist";

declare function isOptional<F extends tm.AnySafeMapper> (f : F) : tm.IsOptional<F>
declare function isExpectedInputOptional<F extends tm.AnySafeMapper> (f : F) : tm.IsExpectedInputOptional<F>

export const doesNotExtendOptional = isExpectedInputOptional(tm.undefined());
export const extendsOptional_containsUndefined = isExpectedInputOptional(tm.optional(tm.unsignedInteger()));
export const extendsOptional_isNotUndefined = isExpectedInputOptional(
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
//This should be of type `false`.
//Because `IsOptional<F>` is `boolean` and does not extend `true`
export const unionOneOptionalOneNot = isExpectedInputOptional(unionOneOptionalOneNotFoo);

const isOptionalButExpectedInputDoesNotContainUndefinedFoo = (
    tm.withExpectedInput(
        tm.optional(tm.unsignedInteger())
    )<number>()
);
export const isOptionalButExpectedInputDoesNotContainUndefined = isOptional(
    isOptionalButExpectedInputDoesNotContainUndefinedFoo
);
export const isOptionalButExpectedInputDoesNotContainUndefined2 = isExpectedInputOptional(
    isOptionalButExpectedInputDoesNotContainUndefinedFoo
);