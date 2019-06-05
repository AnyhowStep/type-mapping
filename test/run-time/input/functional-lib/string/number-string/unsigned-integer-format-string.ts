import * as tape from "tape";
import * as tm from "../../../../../../dist";

tape(__filename, t => {
    const f = tm.unsignedIntegerFormatString();

    const str = "+123e-789";
    t.true(f("x", str) == str);

    t.false(tm.tryMap(f, "x", "").success);
    t.false(tm.tryMap(f, "x", "aab").success);
    t.false(tm.tryMap(f, "x", "ab@").success);
    t.false(tm.tryMap(f, "x", "@abcd").success);

    t.true(tm.tryMap(f, "x", "123").success);
    t.true(tm.tryMap(f, "x", "+123").success);
    t.false(tm.tryMap(f, "x", "-123").success);
    t.false(tm.tryMap(f, "x", "123.456").success);
    t.false(tm.tryMap(f, "x", "+123.456").success);
    t.false(tm.tryMap(f, "x", "-123.456").success);
    t.true(tm.tryMap(f, "x", "123e789").success);
    t.true(tm.tryMap(f, "x", "+123E789").success);
    t.false(tm.tryMap(f, "x", "-123e789").success);
    t.true(tm.tryMap(f, "x", "123e-789").success);
    t.true(tm.tryMap(f, "x", "+123E-789").success);
    t.false(tm.tryMap(f, "x", "-123e-789").success);
    t.true(tm.tryMap(f, "x", "123e+789").success);
    t.true(tm.tryMap(f, "x", "+123E+789").success);
    t.false(tm.tryMap(f, "x", "-123e+789").success);
    t.false(tm.tryMap(f, "x", "123.456e789").success);
    t.false(tm.tryMap(f, "x", "+123.456e789").success);
    t.false(tm.tryMap(f, "x", "-123.456E789").success);
    t.false(tm.tryMap(f, "x", "123.456e-789").success);
    t.false(tm.tryMap(f, "x", "+123.456e-789").success);
    t.false(tm.tryMap(f, "x", "-123.456E-789").success);
    t.false(tm.tryMap(f, "x", "123.456e+789").success);
    t.false(tm.tryMap(f, "x", "+123.456e+789").success);
    t.false(tm.tryMap(f, "x", "-123.456E+789").success);

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