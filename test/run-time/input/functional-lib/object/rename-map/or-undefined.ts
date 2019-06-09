import * as tape from "tape";
import * as tm from "../../../../../../dist";

tape(__filename, t => {
    /**
        Required during compile-time,
        optional during run-time.
    */
    const dst = tm.fields({
        a2 : tm.orUndefined(tm.finiteNumber()),
    });
    const f = tm.renameMap({
        a : dst.a2,
    });

    t.deepEqual(f("x", { a : 2 }), { a2 : 2 });
    t.deepEqual(f("x", { a : 2, a2 : 3 }), { a2 : 3 });
    t.deepEqual(f("x", { a : undefined, a2 : 3 }), { a2 : 3 });
    t.deepEqual(f("x", { a2 : 3 }), { a2 : 3 });
    t.false(tm.tryMap(f, "x", { a : "2" } as any).success);

    t.deepEqual(f("x", new Date()), { a2 : undefined });

    t.false(tm.tryMap(f, "x", null as any).success);
    t.false(tm.tryMap(f, "x", undefined as any).success);
    t.false(tm.tryMap(f, "x", BigInt(0) as any).success);
    t.false(tm.tryMap(f, "x", BigInt(1) as any).success);
    t.true(tm.tryMap(f, "x", new Date() as any).success);
    t.true(tm.tryMap(f, "x", [] as any).success);
    t.true(tm.tryMap(f, "x", [true] as any).success);
    t.true(tm.tryMap(f, "x", function () {} as any).success);
    t.false(tm.tryMap(f, "x", NaN as any).success);
    t.false(tm.tryMap(f, "x", -Infinity as any).success);
    t.false(tm.tryMap(f, "x", +Infinity as any).success);
    t.false(tm.tryMap(f, "x", "test" as any).success);
    t.false(tm.tryMap(f, "x", "1" as any).success);
    t.false(tm.tryMap(f, "x", 0 as any).success);
    t.false(tm.tryMap(f, "x", 1 as any).success);
    t.false(tm.tryMap(f, "x", true as any).success);
    t.false(tm.tryMap(f, "x", false as any).success);
    t.true(tm.tryMap(f, "x", new Number(1) as any).success);

    t.end();
});