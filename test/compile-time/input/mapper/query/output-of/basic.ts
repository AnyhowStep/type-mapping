import * as tm from "../../../../../../dist";

declare function outputOf<F extends tm.AnyMapper> (f : F) : tm.OutputOf<F>;

const returnNumber = (_name : string, _mixed : unknown) => {
    return 4;
};
export const expectNumber = outputOf(returnNumber);

const return4 = (_name : string, _mixed : unknown) => {
    return 4 as 4;
};
export const expect4 = outputOf(return4);

const returnStringOrUndefined = (_name : string, _mixed : unknown) => {
    return undefined as string|undefined;
};
export const expectStringOrUndefined = outputOf(returnStringOrUndefined);
