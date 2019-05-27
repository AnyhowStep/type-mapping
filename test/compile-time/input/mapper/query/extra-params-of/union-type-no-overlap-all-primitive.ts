import * as tm from "../../../../../../dist";

declare function extraParamsOf<F extends tm.AnyExtendedMapper> (f : F) : tm.ExtraParamsOf<F>;

const acceptsNumberOrString = (_name : string, _ : unknown, _mixed : number|string) => {
    return undefined;
};
const acceptsBooleanOrBigint = (_name : string, _ : unknown, _mixed : boolean|bigint) => {
    return undefined;
};
declare const unionType : typeof acceptsNumberOrString | typeof acceptsBooleanOrBigint;

export const expectNever = extraParamsOf(unionType)[0];