import * as tm from "../../../../dist";

declare function acceptsOf<F extends tm.AnyMapper> (f : F) : tm.ExpectedInputOf<F>;

const acceptsDateOrFunction = (_name : string, _mixed : Date|Function) => {
    return undefined;
};
const acceptsBufferOrHTMLElement = (_name : string, _mixed : Buffer|HTMLElement) => {
    return undefined;
};
declare const unionType : typeof acceptsDateOrFunction | typeof acceptsBufferOrHTMLElement;

export const expectUnion = acceptsOf(unionType);