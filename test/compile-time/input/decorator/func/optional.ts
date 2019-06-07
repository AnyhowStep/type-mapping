import * as tm from "../../../../../dist";

export const exactTypeAllowed = tm.func(tm.finiteNumber(), tm.orUndefined(tm.string()))(
    (_0 : number, _opt? : string) => {

    }
);

export const superTypeNotAllowed = tm.func(tm.finiteNumber(), tm.orNull(tm.orUndefined(tm.string())))(
    (_0 : number, _opt? : string) => {

    }
);

export const subTypeNotAllowed = tm.func(tm.finiteNumber(), tm.string())(
    (_0 : number, _opt? : string) => {

    }
);

export const unrelatedTypeNotAllowed = tm.func(tm.finiteNumber(), tm.finiteNumber())(
    (_0 : number, _opt? : string) => {

    }
);

export const partialOverlapTypeNotAllowed = tm.func(tm.finiteNumber(), tm.orUndefined(tm.literal("str", 1)))(
    (_0 : number, _opt? : string) => {

    }
);

export const partialOverlapTypeNotAllowed2 = tm.func(tm.finiteNumber(), tm.or(tm.undefined(), tm.string(), tm.finiteNumber()))(
    (_0 : number, _opt? : string) => {

    }
);
