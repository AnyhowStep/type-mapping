import * as tape from "tape";
import * as tm from "../../../../../dist";

tape(__filename, t => {
    enum E {
        A,
        B,
        C,
    }
    const f = tm.toEnumValue(E);

    t.deepEqual(f("x", "A"), 0);
    t.deepEqual(f("x", "B"), 1);
    t.deepEqual(f("x", "C"), 2);

    t.false(tm.tryMap(f, "x", "a" as any).success);
    t.false(tm.tryMap(f, "x", "b" as any).success);
    t.false(tm.tryMap(f, "x", "c" as any).success);

    t.deepEqual(f("x", 0), 0);
    t.deepEqual(f("x", 1), 1);
    t.deepEqual(f("x", 2), 2);

    t.false(tm.tryMap(f, "x", "1" as any).success);
    t.false(tm.tryMap(f, "x", "2" as any).success);
    t.false(tm.tryMap(f, "x", "3" as any).success);

    t.false(tm.tryMap(f, "x", new Date(NaN) as any).success);
    t.false(tm.tryMap(f, "x", new Date(-Infinity) as any).success);
    t.false(tm.tryMap(f, "x", new Date(+Infinity) as any).success);
    t.false(tm.tryMap(f, "x", new Date("qwerty") as any).success);
    t.false(tm.tryMap(f, "x", null as any).success);
    t.false(tm.tryMap(f, "x", undefined as any).success);
    t.false(tm.tryMap(f, "x", BigInt(0) as any).success);
    t.false(tm.tryMap(f, "x", BigInt(1) as any).success);
    t.false(tm.tryMap(f, "x", {} as any).success);
    t.false(tm.tryMap(f, "x", Buffer.from("test") as any).success);
    t.false(tm.tryMap(f, "x", [] as any).success);
    t.false(tm.tryMap(f, "x", [true] as any).success);
    t.false(tm.tryMap(f, "x", function () {} as any).success);
    t.false(tm.tryMap(f, "x", NaN as any).success);
    t.false(tm.tryMap(f, "x", -Infinity as any).success);
    t.false(tm.tryMap(f, "x", +Infinity as any).success);
    t.false(tm.tryMap(f, "x", "test" as any).success);
    t.false(tm.tryMap(f, "x", true as any).success);
    t.false(tm.tryMap(f, "x", false as any).success);
    t.false(tm.tryMap(f, "x", new Number(1) as any).success);

    t.end();
});

tape(__filename, t => {
    enum E {
        A = 9,
        B = 1,
        C = 9,
    }
    const f = tm.toEnumValue(E);

    t.deepEqual(f("x", "A"), 9);
    t.deepEqual(f("x", "B"), 1);
    t.deepEqual(f("x", "C"), 9);

    t.false(tm.tryMap(f, "x", "a" as any).success);
    t.false(tm.tryMap(f, "x", "b" as any).success);
    t.false(tm.tryMap(f, "x", "c" as any).success);

    t.deepEqual(f("x", 1), 1);
    t.deepEqual(f("x", 9), 9);

    t.false(tm.tryMap(f, "x", 4 as any).success);
    t.false(tm.tryMap(f, "x", 5 as any).success);
    t.false(tm.tryMap(f, "x", 6 as any).success);

    t.false(tm.tryMap(f, "x", "1" as any).success);
    t.false(tm.tryMap(f, "x", "2" as any).success);
    t.false(tm.tryMap(f, "x", "3" as any).success);

    t.end();
});