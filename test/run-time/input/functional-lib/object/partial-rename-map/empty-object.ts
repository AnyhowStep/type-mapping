import * as tape from "tape";
import * as tm from "../../../../../../dist";

tape(__filename, t => {
    const f = tm.partialRenameMap({
    });

    t.deepEqual(f("x", {}), {});
    t.deepEqual(f("x", null), {});
    t.deepEqual(f("x", undefined), {});
    t.deepEqual(f("x", BigInt(0)), {});
    t.deepEqual(f("x", new Date()), {});
    t.deepEqual(f("x", []), {});
    t.deepEqual(f("x", NaN), {});
    t.deepEqual(f("x", Infinity), {});
    t.deepEqual(f("x", "test"), {});
    t.deepEqual(f("x", 0), {});
    t.deepEqual(f("x", true), {});
    t.deepEqual(f("x", new Number(1)), {});

    t.end();
});