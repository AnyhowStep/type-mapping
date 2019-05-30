import * as tm from "../../../../../../dist";

export const a = tm.deepMerge(
    tm.or(
        tm.rename("src", "dst", tm.unsignedInteger()),
        tm.rename("src2", "dst2", tm.string())
    )
);
export const b = tm.deepMerge(
    tm.or(
        tm.rename("src", "dst", tm.unsignedInteger()),
        tm.rename("src2", "dst2", tm.string())
    ),
    tm.rename("src3", "dst3", tm.boolean())
);