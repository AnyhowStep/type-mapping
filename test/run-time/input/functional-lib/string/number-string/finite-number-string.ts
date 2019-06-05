import * as tape from "tape";
import * as tm from "../../../../../../dist";

tape(__filename, t => {
    const f = tm.finiteNumberString();

    //Output is different due to loss in precision
    t.deepEqual(f("x", "9999999999999999"), "10000000000000000");

    t.deepEqual(f("x", "123"), "123");
    t.deepEqual(f("x", "123e2"), "12300");
    t.deepEqual(f("x", "123.456e2"), "12345.6");
    t.deepEqual(f("x", "123.456e-2"), "1.23456");
    t.deepEqual(f("x", "-123"), "-123");
    t.deepEqual(f("x", "-123e2"), "-12300");
    t.deepEqual(f("x", "-123.456e2"), "-12345.6");
    t.deepEqual(f("x", "-123.456e-2"), "-1.23456");

    //Should become Infinity
    t.false(tm.tryMap(f, "x", "1e999").success);

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
    //t.true(tm.tryMap(f, "x", "test" as any).success);
    //t.true(tm.tryMap(f, "x", "1" as any).success);
    t.false(tm.tryMap(f, "x", 0 as any).success);
    t.false(tm.tryMap(f, "x", 1 as any).success);
    t.false(tm.tryMap(f, "x", true as any).success);
    t.false(tm.tryMap(f, "x", false as any).success);
    t.false(tm.tryMap(f, "x", new Number(1) as any).success);
    t.false(tm.tryMap(f, "x", new String("str") as any).success);
    t.false(tm.tryMap(f, "x", Buffer.from("str") as any).success);

    t.end();
});