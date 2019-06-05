import * as tape from "tape";
import * as tm from "../../../../../dist";

tape(__filename, t => {
    const f = tm.notMatch(/^a+b/);

    const str = "baab";
    t.true(f("x", str) == str);

    t.false(tm.tryMap(f, "x", "aab").success);
    t.false(tm.tryMap(f, "x", "ab").success);
    t.false(tm.tryMap(f, "x", "abcd").success);
    t.false(tm.tryMap(f, "x", "aabcde").success);
    t.false(tm.tryMap(f, "x", "abbab").success);

    try {
        tm.notMatch(/^a+b/, name => `${name} must be awesome`)("x", "aab");
        t.fail("Should not succeed");
    } catch (err) {
        t.deepEqual(err.message, "x must be awesome")
    }

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