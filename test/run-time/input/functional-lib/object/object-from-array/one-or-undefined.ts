import * as tape from "tape";
import * as tm from "../../../../../../dist";

tape(__filename, t => {
    const f = tm.objectFromArray(
        //tm.orUndefined(tm.withName(tm.finiteNumber(), "a"))
        tm.withName(tm.orUndefined(tm.finiteNumber()), "a"),
        tm.withName(tm.literal("a", "b"), "b"),
    );

    t.deepEqual(f("x", { a : 2, b : "a" }), { a : 2, b : "a" });
    t.deepEqual(f("x", { a : undefined, b : "b" }), { a : undefined, b : "b" });
    t.false(tm.tryMap(f, "x", { a : "2", b : "a" } as any).success);
    t.false(tm.tryMap(f, "x", { a : 2, b : "c" } as any).success);
    t.false(tm.tryMap(f, "x", { a : "2", b : "c" } as any).success);
    t.false(tm.tryMap(f, "x", { a : 2 } as any).success);
    t.false(tm.tryMap(f, "x", { a : undefined } as any).success);
    /*
        Required during compile-time.
        Optional during run-time.
    */
    t.deepEqual(f("x", { b : "a" } as any), { a : undefined, b : "a" });

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
