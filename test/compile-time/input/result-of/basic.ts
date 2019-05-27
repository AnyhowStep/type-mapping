import * as tm from "../../../../dist";

declare function OutputOf<F extends tm.AnyMapper> (f : F) : tm.OutputOf<F>;

const returnNumber = (_name : string, _mixed : unknown) => {
    return 4;
};
export const expectNumber = OutputOf(returnNumber);

const return4 = (_name : string, _mixed : unknown) => {
    return 4 as 4;
};
export const expect4 = OutputOf(return4);

const returnStringOrUndefined = (_name : string, _mixed : unknown) => {
    return undefined as string|undefined;
};
export const expectStringOrUndefined = OutputOf(returnStringOrUndefined);
