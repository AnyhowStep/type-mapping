import * as tape from "tape";
import * as tm from "../../../../../../dist";

tape(__filename, t => {
    const called : string[] = [];
    const f = tm.unsafeDeepMerge(
        (name : string, mixed : unknown) => {
            called.push("a");
            return tm.objectFromMap({
                a : tm.finiteNumber(),
            })(name, mixed);
        },
        (name : string, mixed : unknown) => {
            called.push("b");
            return tm.objectFromMap({
                b : tm.stringToFiniteNumber(),
            })(name, mixed);
        },
    );

    const input = {
        a : 42,
        _a : 67,
        b : "999",
        _b : "888",
    };
    const output = f("x", input);
    t.deepEqual(called, ["a", "b"]);
    t.deepEqual(output, {
        a : 42,
        b : 999,
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
        (name : string, mixed : unknown) => {
            called.push("b");
            return tm.objectFromMap({
                b : tm.stringToFiniteNumber(),
            })(name, mixed);
        },
    );

    const input = {
        a : "FAIL",
        _a : 67,
        b : "999",
        _b : "888",
    };
    const result = tm.tryMap(f, "x", input as any);
    t.deepEqual(called, ["a", "b"]);
    if (result.success) {
        t.fail("Should not succeed");
    }

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
        (name : string, mixed : unknown) => {
            called.push("b");
            return tm.objectFromMap({
                b : tm.stringToFiniteNumber(),
            })(name, mixed);
        },
    );

    const input = {
        a : 42,
        _a : 67,
        b : "FAIL",
        _b : "888",
    };
    const result = tm.tryMap(f, "x", input as any);
    t.deepEqual(called, ["a", "b"]);
    if (result.success) {
        t.fail("Should not succeed");
    }

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
        (name : string, mixed : unknown) => {
            called.push("b");
            return tm.objectFromMap({
                b : tm.stringToFiniteNumber(),
            })(name, mixed);
        },
    );

    const input = {
        a : "FAIL",
        _a : 67,
        b : "FAIL",
        _b : "888",
    };
    const result = tm.tryMap(f, "x", input as any);
    t.deepEqual(called, ["a", "b"]);
    if (result.success) {
        t.fail("Should not succeed");
    }

    t.end();
});

tape(__filename, t => {
    const called : string[] = [];
    const f = tm.unsafeDeepMerge(
        (name : string, mixed : unknown) => {
            called.push("a");
            return tm.objectFromMap({
                a : tm.optional(tm.finiteNumber()),
            })(name, mixed);
        },
        (name : string, mixed : unknown) => {
            called.push("b");
            return tm.objectFromMap({
                b : tm.stringToFiniteNumber(),
            })(name, mixed);
        },
    );

    const input = {
        _a : 67,
        b : "999",
        _b : "888",
    };
    const output = f("x", input);
    t.deepEqual(called, ["a", "b"]);
    t.deepEqual(output, {
        a : undefined,
        b : 999,
    });

    t.end();
});