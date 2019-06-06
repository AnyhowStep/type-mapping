import * as tape from "tape";
import * as tm from "../../../../../../dist";

tape(__filename, t => {
    const f = tm.unsignedIntegerString();

    //Output is different due to loss in precision
    t.deepEqual(f("x", "9999999999999999"), "10000000000000000");

    t.deepEqual(f("x", "123"), "123");
    t.deepEqual(f("x", "123e2"), "12300");
    t.false(tm.tryMap(f, "x", "123.456e2").success);
    t.false(tm.tryMap(f, "x", "123.456e-2").success);
    t.false(tm.tryMap(f, "x", "-123").success);
    t.false(tm.tryMap(f, "x", "-123e2").success);
    t.false(tm.tryMap(f, "x", "-123.456e2").success);
    t.false(tm.tryMap(f, "x", "-123.456e-2").success);
    t.deepEqual(f("x", "123000e200"), "1.23e+205");
    t.deepEqual(f("x", "123000e1"), "1230000");
    t.deepEqual(f("x", "123000e+1"), "1230000");
    t.deepEqual(f("x", "123000e+0"), "123000");
    t.deepEqual(f("x", "123000e0"), "123000");
    t.deepEqual(f("x", "123000e-0"), "123000");
    t.deepEqual(f("x", "123000e-1"), "12300");
    t.deepEqual(f("x", "123000e-2"), "1230");
    t.deepEqual(f("x", "123000e-3"), "123");
    t.false(tm.tryMap(f, "x", "123000e-4").success);

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