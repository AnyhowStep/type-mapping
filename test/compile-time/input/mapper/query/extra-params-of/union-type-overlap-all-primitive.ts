import * as tm from "../../../../../../dist";

declare function extraParamsOf<F extends tm.AnyExtendedMapper> (f : F) : tm.ExtraParamsOf<F>;

const acceptsNumberOrString = (_name : string, _ : unknown, _mixed : number|string) => {
    return undefined;
};
const acceptsStringOrBoolean = (_name : string, _ : unknown, _mixed : string|boolean) => {
    return undefined;
};
declare const unionType : typeof acceptsNumberOrString | typeof acceptsStringOrBoolean;

export const expectString = extraParamsOf(unionType)[0];