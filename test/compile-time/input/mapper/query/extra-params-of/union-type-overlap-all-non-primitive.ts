import * as tm from "../../../../../../dist";

declare function extraParamsOf<F extends tm.AnyExtendedMapper> (f : F) : tm.ExtraParamsOf<F>;

const acceptsFunctionOrDate = (_name : string, _ : unknown, _mixed : Function|Date) => {
    return undefined;
};
const acceptsFunctionOrBuffer = (_name : string, _ : unknown, _mixed : Function|Buffer) => {
    return undefined;
};
declare const unionType : typeof acceptsFunctionOrDate | typeof acceptsFunctionOrBuffer;

export const expectUnion = extraParamsOf(unionType)[0];