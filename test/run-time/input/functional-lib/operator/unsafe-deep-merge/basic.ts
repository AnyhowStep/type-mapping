import * as tape from "tape";
import * as tm from "../../../../../../dist";

tape(__filename, t => {
    t.throws(() => {
        tm.unsafeDeepMerge();
    });
    t.end();
});

tape(__filename, t => {
    const called : string[] = [];
    const f = tm.unsafeDeepMerge(
        (name : string, mixed : unknown) => {
            called.push("a");
            return tm.objectFromMap({
                a : tm.finiteNumber(),
            })(name, mixed);
        },
    );

    const input = {
        a : 42,
        _a : 67,
    };
    const output = f("x", input);
    t.deepEqual(called, ["a"]);
    t.deepEqual(output, {
        a : 42,
    });

    t.end();
});

tape(__filename, t => {
    const called : string[] = [];
    const f = tm.unsafeDeepMerge(
        (name : string, mixed : unknown) => {
            called.push("a");
            return tm.objectFromMap({
                a : tm.finiteNumber(),
            })(name, mixed);
        },
    );

    const input = {
        a : "FAIL",
        _a : 67,
    };
    const result = tm.tryMap(f, "x", input as any);
    t.deepEqual(called, ["a"]);
    if (result.success) {
        t.fail("Should not succeed");
    }

    t.end();
});
