import * as tm from "../../../../src";

declare function resultOf<F extends tm.AnyTypeMapDelegate> (f : F) : tm.ResultOf<F>;

const returnNumber = (_name : string, _mixed : unknown) => {
    return 4;
};
export const expectNumber = resultOf(returnNumber);

const return4 = (_name : string, _mixed : unknown) => {
    return 4 as 4;
};
export const expect4 = resultOf(return4);

const returnStringOrUndefined = (_name : string, _mixed : unknown) => {
    return undefined as string|undefined;
};
export const expectStringOrUndefined = resultOf(returnStringOrUndefined);
