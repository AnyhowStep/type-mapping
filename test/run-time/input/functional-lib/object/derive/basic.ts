import * as tape from "tape";
import * as tm from "../../../../../../dist";

tape(__filename, t => {
    const f = tm.derive("a", "a2", tm.finiteNumber());

    t.deepEqual(f("x", { a : 2 }), { a2 : 2 });
    t.deepEqual(f("x", { a : 2, a2 : 3 }), { a2 : 2 });
    t.false(tm.tryMap(f, "x", { a2 : 2 } as any).success);
    t.false(tm.tryMap(f, "x", { a : "2" } as any).success);

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

tape(__filename, t => {
    const f = tm.derive("a", "a2", tm.orUndefined(tm.finiteNumber()));

    t.deepEqual(f("x", { a : 2 }), { a2 : 2 });
    t.deepEqual(f("x", { a : 2, a2 : 3 }), { a2 : 2 });
    /**
        `a` is missing so it uses `undefined`.
    */
    t.deepEqual(f("x", { a2 : 2 } as any), { a2 : undefined });
    t.false(tm.tryMap(f, "x", { a : "2" } as any).success);

    t.deepEqual(f("x", { a : undefined }), { a2 : undefined });
    t.deepEqual(f("x", { a : undefined, a2 : 3 }), { a2 : undefined });
    t.deepEqual(f("x", { a : 5, a2 : undefined }), { a2 : 5 });
    /**
        `a` is missing so it uses `undefined`.
    */
    t.deepEqual(f("x", { a2 : 2 } as any), { a2 : undefined });
    /**
        `a` is missing so it uses `undefined`.
        Not because `a2` set it to `undefined`.
    */
    t.deepEqual(f("x", { a2 : undefined } as any), { a2 : undefined });
    t.false(tm.tryMap(f, "x", { a : "2" } as any).success);

    /**
        The non-objects fail because an object is expected.
        The objects pass because `a` is required during compile-time
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