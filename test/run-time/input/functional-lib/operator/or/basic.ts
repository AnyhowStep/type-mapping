import * as tape from "tape";
import * as tm from "../../../../../../dist";

tape(__filename, t => {
    let called : string[] = [];
    const f = tm.or(
        ((name : string, mixed : unknown) => {
            called.push("a")
            return tm.stringToUnsignedInteger()(name, mixed);
        }) as ReturnType<typeof tm.stringToUnsignedInteger>,
        ((name : string, mixed : unknown) => {
            called.push("b")
            return tm.stringToInteger()(name, mixed);
        }) as ReturnType<typeof tm.stringToInteger>,
    );

    const output = f("x", "99");
    t.deepEqual(called, ["a"]);
    t.deepEqual(output, 99);

    called = [];
    const output2 = f("x", "-99");
    t.deepEqual(called, ["a", "b"]);
    t.deepEqual(output2, -99);

    called = [];
    const result = tm.tryMap(f, "x", "-99.1" as any);
    t.deepEqual(called, ["a", "b"]);
    t.false(result.success);

    t.end();
});
