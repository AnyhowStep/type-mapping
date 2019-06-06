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
    subTypeAllowed : number = 1;
}

export class ClazzUnrelatedType {
    @tm.prop(tm.string())
    unrelatedTypeNotAllowed : number = 1;
}

export class ClazzPartialOverlapType {
    @tm.prop(tm.literal(1, "1"))
    partialOverlapTypeNotAllowed : number = 1;
}