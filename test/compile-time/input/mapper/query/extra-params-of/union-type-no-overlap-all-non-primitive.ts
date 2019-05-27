import * as tm from "../../../../../../dist";

declare function extraParamsOf<F extends tm.AnyExtendedMapper> (f : F) : tm.ExtraParamsOf<F>;

const acceptsDateOrFunction = (_name : string, _ : unknown, _mixed : Date|Function) => {
    return undefined;
};
const acceptsBufferOrHTMLElement = (_name : string, _ : unknown, _mixed : Buffer|HTMLElement) => {
    return undefined;
};
declare const unionType : typeof acceptsDateOrFunction | typeof acceptsBufferOrHTMLElement;

export const expectUnion = extraParamsOf(unionType)[0];