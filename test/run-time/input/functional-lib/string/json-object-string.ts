import * as tape from "tape";
import * as tm from "../../../../../dist";

tape(__filename, t => {
    const f = tm.jsonObjectString();

    const validCases = [
        "{}",
        `{ "x" : 1 }`,
        `{ "x" : [1,2,3,4] }`,
        `{ "x" : [1,2,3,{ "y" : { "z" : null, "a" : { "value" : "hello" } } }] }`,
    ];
    for (const validCase of validCases) {
        t.deepEqual(f("x", validCase), validCase);
    }

    t.false(tm.tryMap(f, "x", `{ x : 1 }` as any).success);
    t.false(tm.tryMap(f, "x", `[1,2,3]` as any).success);
    t.false(tm.tryMap(f, "x", `"str"` as any).success);
    t.false(tm.tryMap(f, "x", `true` as any).success);
    t.false(tm.tryMap(f, "x", `false` as any).success);
    t.false(tm.tryMap(f, "x", `null` as any).success);
    t.false(tm.tryMap(f, "x", `undefined` as any).success);
    t.false(tm.tryMap(f, "x", `1` as any).success);

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
    t.false(tm.tryMap(f, "x", "test" as any).success);
    t.false(tm.tryMap(f, "x", "1" as any).success);
    t.false(tm.tryMap(f, "x", 0 as any).success);
    t.false(tm.tryMap(f, "x", 1 as any).success);
    t.false(tm.tryMap(f, "x", true as any).success);
    t.false(tm.tryMap(f, "x", false as any).success);
    t.false(tm.tryMap(f, "x", new Number(1) as any).success);
    t.false(tm.tryMap(f, "x", new String("str") as any).success);
    t.false(tm.tryMap(f, "x", Buffer.from("str") as any).success);

    t.end();
});