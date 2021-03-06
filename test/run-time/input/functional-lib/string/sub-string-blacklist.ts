import * as tape from "tape";
import * as tm from "../../../../../dist";

tape(__filename, t => {
    const f = tm.subStringBlacklist([
        "a",
        "b"
    ]);

    const str = "ABC";
    t.deepEqual(f("x", str), "ABC");
    //Empty string is OK, too
    t.deepEqual(f("x", ""), "");;

    t.deepEqual(f("x", "123456"), "123456");
    t.deepEqual(f("x", "qweAty"), "qweAty");
    t.deepEqual(f("x", "qweBty"), "qweBty");
    t.deepEqual(f("x", "qwerty"), "qwerty");

    t.false(tm.tryMap(f, "x", "qweaty").success);
    t.false(tm.tryMap(f, "x", "qwebty").success);

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

tape(__filename, t => {
    const f = tm.subStringBlacklist([
        "a",
        "b"
    ], {
        caseInsensitive : true
    });

    const str = "CDEF";
    t.deepEqual(f("x", str), "CDEF");
    //Empty string is OK, too
    t.deepEqual(f("x", ""), "");;

    t.deepEqual(f("x", "123456"), "123456");
    t.false(tm.tryMap(f, "x", "qweAty").success);
    t.false(tm.tryMap(f, "x", "qweBty").success);
    t.deepEqual(f("x", "qwerty"), "qwerty");

    t.false(tm.tryMap(f, "x", "qweaty").success);
    t.false(tm.tryMap(f, "x", "qwebty").success);

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