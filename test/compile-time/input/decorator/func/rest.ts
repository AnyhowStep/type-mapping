import * as tm from "../../../../../dist";

export const exactTypeAllowed = tm.func(tm.finiteNumber(), ...[tm.string()])(
    (_0 : number, ..._rest : string[]) => {

    }
);

export const superTypeNotAllowed = tm.func(tm.finiteNumber(), ...[tm.orUndefined(tm.string())])(
    (_0 : number, ..._rest : string[]) => {

    }
);

export const subTypeNotAllowed = tm.func(tm.finiteNumber(), ...[tm.literal("str")])(
    (_0 : number, ..._rest : string[]) => {

    }
);

export const unrelatedTypeNotAllowed = tm.func(tm.finiteNumber(), ...[tm.finiteNumber()])(
    (_0 : number, ..._rest : string[]) => {

    }
);

export const partialOverlapTypeNotAllowed = tm.func(tm.finiteNumber(), ...[tm.literal("str", 1)])(
    (_0 : number, ..._rest : string[]) => {

    }
);

export const partialOverlapTypeNotAllowed2 = tm.func(tm.finiteNumber(), ...[tm.or(tm.string(), tm.finiteNumber())])(
    (_0 : number, ..._rest : string[]) => {

    }
);