import * as tape from "tape";
import * as tm from "../../../../../dist";

tape(__filename, t => {
    const f = tm.stringToJsonObject();

    const obj = {};
    t.false(f("x", obj) == obj);
    t.deepEqual(f("x", {}), {});
    t.deepEqual(f("x", "{}"), {});
    t.deepEqual(f("x", Buffer.from("test")), {
        type : "Buffer",
        data : [
            116,
            101,
            115,
            116,
        ],
    });
    t.deepEqual(f("x", {
        a : null,
        b : undefined,
        c : NaN,
        d : +Infinity,
        e : -Infinity,
        f : () => 1,
        g : new Date("3000-01-01T11:22:33.123Z"),
        h : new Date("-123000-01-01T11:22:33.123Z"),
        i : new Date("+123000-01-01T11:22:33.123Z"),
        j : new Date("123000-01-01T11:22:33.123Z"),
        k : new Number(3),
        l : [
            null,
            undefined,
            NaN,
            +Infinity,
            -Infinity,
            () => 1,
            new Date("3000-01-01T11:22:33.123Z"),
            new Date("-123000-01-01T11:22:33.123Z"),
            new Date("+123000-01-01T11:22:33.123Z"),
            new Date("123000-01-01T11:22:33.123Z"),
            new Number(3),
        ],
    }), {
        a : null,
        //b
        c : null,
        d : null,
        e : null,
        //f
        g : "3000-01-01T11:22:33.123Z",
        h : "-123000-01-01T11:22:33.123Z",
        i : "+123000-01-01T11:22:33.123Z",
        j : null,
        k : 3,
        l : [
            null,
            null,
            null,
            null,
            null,
            null,
            "3000-01-01T11:22:33.123Z",
            "-123000-01-01T11:22:33.123Z",
            "+123000-01-01T11:22:33.123Z",
            null,
            3,
        ],
    });

    t.false(tm.tryMap(f, "x", new Date(NaN) as any).success);
    t.false(tm.tryMap(f, "x", new Date(-Infinity) as any).success);
    t.false(tm.tryMap(f, "x", new Date(+Infinity) as any).success);
    t.false(tm.tryMap(f, "x", new Date("qwerty") as any).success);
    t.false(tm.tryMap(f, "x", null as any).success);
    t.false(tm.tryMap(f, "x", undefined as any).success);
    t.false(tm.tryMap(f, "x", BigInt(0) as any).success);
    t.false(tm.tryMap(f, "x", BigInt(1) as any).success);
    t.false(tm.tryMap(f, "x", [] as any).success);
    t.false(tm.tryMap(f, "x", [true] as any).success);
    t.false(tm.tryMap(f, "x", function () {} as any).success);
    t.false(tm.tryMap(f, "x", NaN as any).success);
    t.false(tm.tryMap(f, "x", -Infinity as any).success);
    t.false(tm.tryMap(f, "x", +Infinity as any).success);
    t.false(tm.tryMap(f, "x", "test" as any).success);
    t.false(tm.tryMap(f, "x", 0 as any).success);
    t.false(tm.tryMap(f, "x", 1 as any).success);
    t.false(tm.tryMap(f, "x", 2 as any).success);
    t.false(tm.tryMap(f, "x", true as any).success);
    t.false(tm.tryMap(f, "x", false as any).success);
    t.false(tm.tryMap(f, "x", new Number(1) as any).success);

    t.end();
});

tape(__filename, t => {
    const f = tm.stringToJsonObject();

    t.deepEqual(f("x", `{ "x" : 5 }`), { x : 5 });
    t.deepEqual(f("x", `{ "x" : 5, "arr" : [null, "hi", 4, ["nested"]] }`), { x : 5, arr : [null, "hi", 4, ["nested"]] });

    t.false(tm.tryMap(f, "x", `"test"` as any).success);
    t.false(tm.tryMap(f, "x", `1` as any).success);
    t.false(tm.tryMap(f, "x", `"1"` as any).success);
    t.false(tm.tryMap(f, "x", `true` as any).success);
    t.false(tm.tryMap(f, "x", `null` as any).success);
    t.false(tm.tryMap(f, "x", `undefined` as any).success);
    t.false(tm.tryMap(f, "x", `function () {}` as any).success);
    t.false(tm.tryMap(f, "x", `[]` as any).success);

    t.end();
});