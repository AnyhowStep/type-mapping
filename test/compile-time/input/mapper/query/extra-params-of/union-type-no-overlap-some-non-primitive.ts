import * as tm from "../../../../../../dist";

declare function extraParamsOf<F extends tm.AnyExtendedMapper> (f : F) : tm.ExtraParamsOf<F>;

const acceptsNumberOrFunction = (_name : string, _ : unknown, _mixed : number|Function) => {
    return undefined;
};
const acceptsBooleanOrDate = (_name : string, _ : unknown, _mixed : boolean|Date) => {
    return undefined;
};
declare const unionType : typeof acceptsNumberOrFunction | typeof acceptsBooleanOrDate;

export const expectUnion = extraParamsOf(unionType)[0];