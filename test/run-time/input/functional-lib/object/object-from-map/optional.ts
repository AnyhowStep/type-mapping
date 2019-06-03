import * as tape from "tape";
import * as tm from "../../../../../../dist";

tape(__filename, t => {
    const f = tm.objectFromMap({
        a : tm.withName(tm.finiteNumber(), "something"),
        b : tm.optional(tm.withName(tm.stringToFiniteNumber(), "else")),
    });

    t.deepEqual(f("x", { a : 2 }), { a : 2, b : undefined });
    t.deepEqual(f("x", { a : 6, other : 2 }), { a : 6, b : undefined });
    t.deepEqual(f("x", { a : 2, b : undefined }), { a : 2, b : undefined });
    t.deepEqual(f("x", { a : 6, other : 2, b : undefined }), { a : 6, b : undefined });
    t.deepEqual(f("x", { a : 2, b : "21" }), { a : 2, b : 21 });
    t.deepEqual(f("x", { a : 6, other : 2, b : 21 }), { a : 6, b : 21 });
    t.false(tm.tryMap(f, "x", { a2 : 2 } as any).success);
    t.false(tm.tryMap(f, "x", { a : "2" } as any).success);
    t.false(tm.tryMap(f, "x", { a : 2, b : "not-a-number" } as any).success);

    t.false(tm.tryMap(f, "x", null as any).success);
    t.false(tm.tryMap(f, "x", undefined as any).success);
    t.false(tm.tryMap(f, "x", BigInt(0) as any).success);
    t.false(tm.tryMap(f, "x", BigInt(1) as any).success);
    t.false(tm.tryMap(f, "x", new Date() as any).success);
    t.false(tm.tryMap(f, "x", [] as any).success);
    t.false(tm.tryMap(f, "x", [true] as any).success);
    t.false(tm.tryMap(f, "x", function () {} as any).success);
    t.false(tm.tryMap(f, "x", NaN as any).success);
    t.false(tm.tryMap(f, "x", -Infinity as any).success);
    t.false(tm.tryMap(f, "x", +Infinity as any).success);
    t.false(tm.tryMap(f, "x", "test" as any).success);
    t.false(tm.tryMap(f, "x", "1" as any).success);
    t.false(tm.tryMap(f, "x", 0 as any).success);
    t.false(tm.tryMap(f, "x", 1 as any).success);
    t.false(tm.tryMap(f, "x", true as any).success);
    t.false(tm.tryMap(f, "x", false as any).success);
    t.false(tm.tryMap(f, "x", new Number(1) as any).success);

    t.end();
});
