import * as tm from "../../../../../dist";

export const exactTypeAllowed = tm.func(tm.finiteNumber())(
    (_0 : number) => {

    }
);

export const superTypeNotAllowed = tm.func(tm.orUndefined(tm.finiteNumber()))(
    (_0 : number) => {

    }
);

export const subTypeNotAllowed = tm.func(tm.literal(1))(
    (_0 : number) => {

    }
);

export const unrelatedTypeNotAllowed = tm.func(tm.string())(
    (_0 : number) => {

    }
);

export const partialOverlapTypeNotAllowed = tm.func(tm.literal(1, "1"))(
    (_0 : number) => {

    }
);

export const partialOverlapTypeNotAllowed2 = tm.func(tm.or(tm.finiteNumber(), tm.string()))(
    (_0 : number) => {

    }
);