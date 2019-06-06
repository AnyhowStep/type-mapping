import * as tape from "tape";
import * as tm from "../../../../../dist";

tape(__filename, t => {
    const f = tm.unknown();

    const arr = [
        new Date(NaN),
        new Date(-Infinity),
        new Date(+Infinity),
        new Date("qwerty"),
        undefined,
        null,
        BigInt(0),
        BigInt(1),
        [],
        [true],
        function () {},
        NaN,
        -Infinity,
        +Infinity,
        "test",
        "null",
        "",
        "   ",
        "{}",
        0,
        1,
        2,
        true,
        false,
        new Number(1),
    ];

    for (const value of arr) {
        if (typeof value == "number" && isNaN(value)) {
            t.true(typeof (f("x", value) as any) == "number");
            t.true(isNaN(f("x", value) as any));
        } else {
            t.true(f("x", value) === value);
        }
    }

    t.end();
});