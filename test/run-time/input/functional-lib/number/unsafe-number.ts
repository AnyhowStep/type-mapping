import * as tape from "tape";
import * as tm from "../../../../../dist";

tape(__filename, t => {
    const f = tm.unsafeNumber();

    t.deepEqual(f("x", 1), 1);
    t.deepEqual(f("x", 0), 0);
    t.deepEqual(f("x", -1), -1);
    t.deepEqual(f("x", Number(1)), 1);
    t.deepEqual(f("x", Math.pow(2, 64)), Math.pow(2, 64));
    t.deepEqual(f("x", 3.141), 3.141);
    t.deepEqual(f("x", -3.141), -3.141);
    t.true(isNaN(f("x", NaN)));
    t.true(typeof f("x", NaN) == "number");
    t.deepEqual(f("x", -Infinity), -Infinity);
    t.deepEqual(f("x", +Infinity), +Infinity);

    t.false(tm.tryMap(f, "x", null as any).success);
    t.false(tm.tryMap(f, "x", undefined as any).success);
    t.false(tm.tryMap(f, "x", BigInt(0) as any).success);
    t.false(tm.tryMap(f, "x", BigInt(1) as any).success);
    t.false(tm.tryMap(f, "x", {} as any).success);
    t.false(tm.tryMap(f, "x", new Date() as any).success);
    t.false(tm.tryMap(f, "x", [] as any).success);
    t.false(tm.tryMap(f, "x", [true] as any).success);
    t.false(tm.tryMap(f, "x", function () {} as any).success);
    t.false(tm.tryMap(f, "x", "test" as any).success);
    t.false(tm.tryMap(f, "x", "1" as any).success);
    t.false(tm.tryMap(f, "x", true as any).success);
    t.false(tm.tryMap(f, "x", false as any).success);
    t.false(tm.tryMap(f, "x", new Number(1) as any).success);

    t.end();
});