import * as tm from "../../../../../dist";

export class Clazz {
    @tm.method(tm.finiteNumber())
    exactTypeAllowed (_0 : number) {
    }
}

export class ClazzSuperType {
    @tm.method(tm.orUndefined(tm.finiteNumber()))
    superTypeNotAllowed (_0 : number) {
    }
}

export class ClazzSubType {
    @tm.method(tm.literal(1))
    subTypeNotAllowed (_0 : number) {
    }
}

export class ClazzUnrelatedType {
    @tm.method(tm.string())
    unrelatedTypeNotAllowed (_0 : number) {
    }
}

export class ClazzPartialOverlapType {
    @tm.method(tm.literal(1, "1"))
    partialOverlapTypeNotAllowed (_0 : number) {
    }
}

export class ClazzPartialOverlapType2 {
    @tm.method(tm.or(tm.finiteNumber(), tm.string()))
    partialOverlapTypeNotAllowed2 (_0 : number) {
    }
}