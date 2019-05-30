import * as tm from "../../../../../../dist";

export const a = tm.deepMerge(
    tm.rename("src", "dst", tm.unsignedInteger())
);
export const b = tm.deepMerge(
    tm.rename("src", "dst", tm.unsignedInteger()),
    tm.rename("src2", "dst2", tm.string())
);
export const c = tm.deepMerge(
    tm.unsignedInteger(),
    tm.string()
);