import * as tape from "tape";
import * as tm from "../../../../../../dist";

tape(__filename, t => {
    /**
        optional cancels runTimeRequired flag
    */
    const dst = tm.fields({
        a2 : tm.optional(tm.runTimeRequired(tm.finiteNumber())),
    });
    const f = tm.deriveMap({
        a : dst.a2,
    });

    //missing
    //undefined
    //number
    t.deepEqual(f("x", {}), { a2 : undefined });

    t.deepEqual(f("x", { a : undefined }), { a2 : undefined });
    t.deepEqual(f("x", { a : 42 }), { a2 : 42 });

    t.deepEqual(f("x", { a2 : undefined }), { a2 : undefined });
    t.deepEqual(f("x", { a2 : 42 }), { a2 : undefined });

    t.deepEqual(f("x", { a : undefined, a2 : undefined }), { a2 : undefined });
    t.deepEqual(f("x", { a : undefined, a2 : 42 }), { a2 : undefined });
    t.deepEqual(f("x", { a : 42, a2 : undefined }), { a2 : 42 });
    t.deepEqual(f("x", { a : 32, a2 : 42 }), { a2 : 32 });

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