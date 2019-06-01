import * as tape from "tape";
import * as tm from "../../../../../dist";

tape(__filename, t => {
    const f = tm.finiteNumberToBoolean();

    t.deepEqual(f("x", true), true);
    t.deepEqual(f("x", false), false);

    t.deepEqual(f("x", Boolean(true)), true);
    t.deepEqual(f("x", Boolean(false)), false);

    t.deepEqual(f("x", 1.1), true);
    t.deepEqual(f("x", 1), true);
    t.deepEqual(f("x", 0), false);
    t.deepEqual(f("x", -1), true);
    t.deepEqual(f("x", -1.1), true);

    t.false(tm.tryMap(f, "x", null as any).success);
    t.false(tm.tryMap(f, "x", undefined as any).success);
    t.false(tm.tryMap(f, "x", BigInt(0) as any).success);
    t.false(tm.tryMap(f, "x", BigInt(1) as any).success);
    t.false(tm.tryMap(f, "x", {} as any).success);
    t.false(tm.tryMap(f, "x", new Date() as any).success);
    t.false(tm.tryMap(f, "x", [] as any).success);
    t.false(tm.tryMap(f, "x", [true] as any).success);
    t.false(tm.tryMap(f, "x", function () {} as any).success);
    t.false(tm.tryMap(f, "x", NaN as any).success);
    t.false(tm.tryMap(f, "x", -Infinity as any).success);
    t.false(tm.tryMap(f, "x", +Infinity as any).success);
    t.false(tm.tryMap(f, "x", "true" as any).success);
    t.false(tm.tryMap(f, "x", "false" as any).success);
    t.false(tm.tryMap(f, "x", "" as any).success);
    t.false(tm.tryMap(f, "x", "qwerty" as any).success);
    t.false(tm.tryMap(f, "x", "1" as any).success);
    t.false(tm.tryMap(f, "x", "0" as any).success);
    t.false(tm.tryMap(f, "x", "1.0" as any).success);
    t.false(tm.tryMap(f, "x", "0.0" as any).success);
    t.false(tm.tryMap(f, "x", new Number(1.1) as any).success);
    t.false(tm.tryMap(f, "x", new Number(1) as any).success);
    t.false(tm.tryMap(f, "x", new Number(0) as any).success);
    t.false(tm.tryMap(f, "x", new Number(-1) as any).success);
    t.false(tm.tryMap(f, "x", new Number(-1.1) as any).success);
    t.false(tm.tryMap(f, "x", new Boolean(true) as any).success);
    t.false(tm.tryMap(f, "x", new Boolean(false) as any).success);

    t.end();
});