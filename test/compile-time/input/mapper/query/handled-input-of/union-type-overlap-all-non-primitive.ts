import * as tm from "../../../../../../dist";

declare function handledInputOf<F extends tm.AnyMapper> (f : F) : tm.HandledInputOf<F>;

const acceptsFunctionOrDate = (_name : string, _mixed : Function|Date) => {
    return undefined;
};
const acceptsFunctionOrBuffer = (_name : string, _mixed : Function|Buffer) => {
    return undefined;
};
declare const unionType : typeof acceptsFunctionOrDate | typeof acceptsFunctionOrBuffer;

export const expectUnion = handledInputOf(unionType);