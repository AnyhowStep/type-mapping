import * as tm from "../../../../../dist";

export class Clazz {
    @tm.setter(tm.finiteNumber())
    set exactTypeAllowed (v : number) {
        console.log(v);
    }
}

export class ClazzSuperType {
    @tm.setter(tm.orUndefined(tm.finiteNumber()))
    set superTypeNotAllowed (v : number) {
        console.log(v);
    }
}

export class ClazzSubType {
    @tm.setter(tm.literal(1))
    set subTypeNotAllowed (v : number) {
        console.log(v);
    }
}

export class ClazzUnrelatedType {
    @tm.setter(tm.string())
    set unrelatedTypeNotAllowed (v : number) {
        console.log(v);
    }
}

export class ClazzPartialOverlapType {
    @tm.setter(tm.literal(1, "1"))
    set partialOverlapTypeNotAllowed (v : number) {
        console.log(v);
    }
}

export class ClazzPartialOverlapType2 {
    @tm.setter(tm.or(tm.finiteNumber(), tm.string()))
    set partialOverlapTypeNotAllowed2 (v : number) {
        console.log(v);
    }
}