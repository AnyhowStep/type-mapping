import * as tm from "../../../../src";

declare function acceptsOf<F extends tm.AnyTypeMapDelegate> (f : F) : tm.AcceptsOf<F>;

const acceptsFunctionOrDate = (_name : string, _mixed : Function|Date) => {
    return undefined;
};
const acceptsFunctionOrBuffer = (_name : string, _mixed : Function|Buffer) => {
    return undefined;
};
declare const unionType : typeof acceptsFunctionOrDate | typeof acceptsFunctionOrBuffer;

export const expectUnion = acceptsOf(unionType);