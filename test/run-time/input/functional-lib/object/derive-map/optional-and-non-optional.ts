import * as tape from "tape";
import * as tm from "../../../../../../dist";

tape(__filename, t => {
    const dst = tm.fields({
        a2 : tm.optional(tm.finiteNumber()),
        b2 : tm.orUndefined(tm.string())
    });
    const f = tm.deriveMap({
        a : dst.a2,
        b : dst.b2,
    });

    t.deepEqual(f("x", { a : 2, b : "hi" }), { a2 : 2, b2 : "hi" });
    t.deepEqual(f("x", { a : 2, a2 : 3, b : undefined, b2 : "bye" }), { a2 : 2, b2 : undefined });
    t.deepEqual(f("x", { a : undefined, a2 : 3, b : "test", b2 : undefined }), { a2 : undefined, b2 : "test" });
    t.deepEqual(f("x", { a2 : 3, b : "test2" }), { a2 : undefined, b2 : "test2" });
    t.false(tm.tryMap(f, "x", { a : "2", b : "test3" } as any).success);
    /*
        Required during compile-time.
        Optional during run-time.
    */
    t.deepEqual(f("x", { a : 4 } as any), { a2 : 4, b2 : undefined });

    /**
        The non-objects fail because an object is expected.
        The objects pass because `b` is required during compile-time
        but is optional during run-time.

        Use `runTimeRequired()` to make it required during run-time.
    */
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