import * as tm from "../../../../../../dist";

declare function mappableInputOf<F extends tm.AnyMapper> (f : F) : tm.MappableInputOf<F>;

const acceptsFunctionOrDate = (_name : string, _mixed : Function|Date) => {
    return undefined;
};
const acceptsFunctionOrBuffer = (_name : string, _mixed : Function|Buffer) => {
    return undefined;
};
declare const unionType : typeof acceptsFunctionOrDate | typeof acceptsFunctionOrBuffer;

export const expectUnion = mappableInputOf(unionType);