import * as tape from "tape";
import * as tm from "../../../../../dist";

tape(__filename, t => {
    const f = tm.bufferLength({
        min : 3,
        max : 5,
    });

    const b = Buffer.from("test1");
    t.true(f("x", b) == b);
    t.false(tm.tryMap(f, "x", Buffer.from("")).success);
    t.false(tm.tryMap(f, "x", Buffer.from("1")).success);
    t.false(tm.tryMap(f, "x", Buffer.from("12")).success);
    console.log("toStr", Buffer.from("123").toString());
    f("x", Buffer.from("123"));
    t.true(tm.tryMap(f, "x", Buffer.from("123")).success);
    t.true(tm.tryMap(f, "x", Buffer.from("1234")).success);
    t.true(tm.tryMap(f, "x", Buffer.from("12345")).success);
    t.false(tm.tryMap(f, "x", Buffer.from("123456")).success);
    t.false(tm.tryMap(f, "x", Buffer.from("1234567")).success);


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
    t.false(tm.tryMap(f, "x", "test" as any).success);
    t.false(tm.tryMap(f, "x", "1" as any).success);
    t.false(tm.tryMap(f, "x", 1 as any).success);
    t.false(tm.tryMap(f, "x", true as any).success);
    t.false(tm.tryMap(f, "x", false as any).success);
    t.false(tm.tryMap(f, "x", new Number(1) as any).success);

    t.end();
});
tape(__filename, t => {
    const f = tm.bufferLength({
        min : 3,
        max : 3,
    });

    const b = Buffer.from("te2");
    t.true(f("x", b) == b);
    t.false(tm.tryMap(f, "x", Buffer.from("")).success);
    t.false(tm.tryMap(f, "x", Buffer.from("1")).success);
    t.false(tm.tryMap(f, "x", Buffer.from("12")).success);
    t.true(tm.tryMap(f, "x", Buffer.from("123")).success);
    t.false(tm.tryMap(f, "x", Buffer.from("1234")).success);
    t.false(tm.tryMap(f, "x", Buffer.from("12345")).success);
    t.false(tm.tryMap(f, "x", Buffer.from("123456")).success);
    t.false(tm.tryMap(f, "x", Buffer.from("1234567")).success);

    t.end();
});
tape(__filename, t => {
    t.throws(() => {
        tm.bufferLength({
            min : 4,
            max : 3,
        });
    });

    t.end();
});