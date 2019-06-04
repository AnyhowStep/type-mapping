import * as tape from "tape";
import * as tm from "../../../../../../dist";

tape(__filename, t => {
    let called : string[] = [];
    const f = tm.pipe(
        ((name : string, mixed : unknown) => {
            called.push("a")
            return tm.stringToInteger()(name, mixed);
        }) as ReturnType<typeof tm.stringToInteger>,
        ((name : string, mixed : unknown) => {
            called.push("b")
            return tm.stringToUnsignedInteger()(name, mixed);
        }) as ReturnType<typeof tm.stringToUnsignedInteger>,
    );

    const output = f("x", "99");
    t.deepEqual(called, ["a", "b"]);
    t.deepEqual(output, 99);

    called = [];
    const result = tm.tryMap(f, "x", "-99" as any);
    t.deepEqual(called, ["a", "b"]);
    t.false(result.success);

    called = [];
    const result2 = tm.tryMap(f, "x", "-99.1" as any);
    t.deepEqual(called, ["a"]);
    t.false(result2.success);

    t.end();
});
