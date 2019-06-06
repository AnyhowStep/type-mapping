import * as tm from "../../../../../dist";

export class Clazz {
    @tm.method(tm.finiteNumber(), ...[tm.string()])
    exactTypeAllowed (_0 : number, ..._rest : string[]) {
    }
}

export class ClazzSuperType {
    @tm.method(tm.finiteNumber(), ...[tm.orUndefined(tm.string())])
    superTypeNotAllowed (_0 : number, ..._rest : string[]) {
    }
}

export class ClazzSubType {
    @tm.method(tm.finiteNumber(), ...[tm.literal("str")])
    subTypeNotAllowed (_0 : number, ..._rest : string[]) {
    }
}

export class ClazzUnrelatedType {
    @tm.method(tm.finiteNumber(), ...[tm.finiteNumber()])
    unrelatedTypeNotAllowed (_0 : number, ..._rest : string[]) {
    }
}

export class ClazzPartialOverlapType {
    @tm.method(tm.finiteNumber(), ...[tm.literal("str", 1)])
    partialOverlapTypeNotAllowed (_0 : number, ..._rest : string[]) {
    }
}

export class ClazzPartialOverlapType2 {
    @tm.method(tm.finiteNumber(), ...[tm.or(tm.string(), tm.finiteNumber())])
    partialOverlapTypeNotAllowed2 (_0 : number, ..._rest : string[]) {
    }
}