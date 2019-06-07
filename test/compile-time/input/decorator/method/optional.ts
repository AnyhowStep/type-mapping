import * as tm from "../../../../../dist";

export class Clazz {
    @tm.method(tm.finiteNumber(), tm.orUndefined(tm.string()))
    exactTypeAllowed (_0 : number, _opt? : string) {
    }
}

export class ClazzSuperType {
    @tm.method(tm.finiteNumber(), tm.or(tm.undefined(), tm.string(), tm.finiteNumber()))
    superTypeNotAllowed (_0 : number, _opt? : string) {
    }
}

export class ClazzSubType {
    @tm.method(tm.finiteNumber(), tm.literal("str"))
    subTypeNotAllowed (_0 : number, _opt? : string) {
    }
}

export class ClazzUnrelatedType {
    @tm.method(tm.finiteNumber(), tm.finiteNumber())
    unrelatedTypeNotAllowed (_0 : number, _opt? : string) {
    }
}

export class ClazzPartialOverlapType {
    @tm.method(tm.finiteNumber(), tm.literal(undefined, "str", 1))
    partialOverlapTypeNotAllowed (_0 : number, _opt? : string) {
    }
}

export class ClazzPartialOverlapType2 {
    @tm.method(tm.finiteNumber(), tm.or(tm.undefined(), tm.string(), tm.finiteNumber()))
    partialOverlapTypeNotAllowed2 (_0 : number, _opt? : string) {
    }
}