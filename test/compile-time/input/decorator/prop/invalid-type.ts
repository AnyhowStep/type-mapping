import * as tm from "../../../../../dist";

export class Clazz {
    @tm.prop(tm.finiteNumber())
    exactTypeAllowed : number = 1;
}

export class ClazzSuperType {
    @tm.prop(tm.orUndefined(tm.finiteNumber()))
    superTypeNotAllowed : number = 1;
}

export class ClazzSubType {
    @tm.prop(tm.literal(1))
    subTypeNotAllowed : number = 1;
}

export class ClazzUnrelatedType {
    @tm.prop(tm.string())
    unrelatedTypeNotAllowed : number = 1;
}

export class ClazzPartialOverlapType {
    @tm.prop(tm.literal(1, "1"))
    partialOverlapTypeNotAllowed : number = 1;
}

export class ClazzPartialOverlapType2 {
    @tm.prop(tm.or(tm.finiteNumber(), tm.string()))
    partialOverlapTypeNotAllowed2 : number = 1;
}