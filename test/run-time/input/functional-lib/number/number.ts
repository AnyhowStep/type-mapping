import * as tape from "tape";
import * as tm from "../../../../../dist";

tape(__filename, t => {
    const f = tm.finiteNumber();

    t.deepEqual(f("x", 1), 1);
    t.deepEqual(f("x", Math.pow(2, 64)), Math.pow(2, 64));

    t.false(tm.tryMap(f, "x", NaN).success);
    t.false(tm.tryMap(f, "x", -Infinity).success);
    t.false(tm.tryMap(f, "x", +Infinity).success);
    t.false(tm.tryMap(f, "x", "test" as any).success);
    t.false(tm.tryMap(f, "x", "1" as any).success);
    t.false(tm.tryMap(f, "x", true as any).success);
    t.false(tm.tryMap(f, "x", false as any).success);

    t.end();
});