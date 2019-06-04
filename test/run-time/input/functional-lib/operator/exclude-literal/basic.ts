import * as tape from "tape";
import * as tm from "../../../../../../dist";

tape(__filename, t => {
    let callCount = 0;
    const f = tm.excludeLiteral(
        (name : string, mixed : unknown) => {
            ++callCount;
            return tm.stringToFiniteNumber()(name, mixed);
        },
        42
    );

    const output = f("x", "99");
    t.deepEqual(callCount, 1);
    t.deepEqual(output, 99);

    t.end();
});

tape(__filename, t => {
    let callCount = 0;
    const f = tm.excludeLiteral(
        (name : string, mixed : unknown) => {
            ++callCount;
            return tm.stringToFiniteNumber()(name, mixed);
        },
        42
    );

    const result = tm.tryMap(f, "x", 42);
    t.deepEqual(callCount, 1);
    if (result.success) {
        t.fail("Should not succeed");
    }

    t.end();
});

tape(__filename, t => {
    let callCount = 0;
    const f = tm.excludeLiteral(
        (name : string, mixed : unknown) => {
            ++callCount;
            return tm.stringToFiniteNumber()(name, mixed);
        },
        42
    );

    const result = tm.tryMap(f, "x", "42" as any);
    t.deepEqual(callCount, 1);
    if (result.success) {
        t.fail("Should not succeed");
    }

    t.end();
});

tape(__filename, t => {
    let callCount = 0;
    const f = tm.excludeLiteral(
        (name : string, mixed : unknown) => {
            ++callCount;
            return tm.stringToFiniteNumber()(name, mixed);
        },
        42,
        55
    );

    const result = tm.tryMap(f, "x", 42);
    t.deepEqual(callCount, 1);
    if (result.success) {
        t.fail("Should not succeed");
    }

    const result2 = tm.tryMap(f, "x", 55);
    t.deepEqual(callCount, 2);
    if (result2.success) {
        t.fail("Should not succeed");
    }

    t.end();
});

tape(__filename, t => {
    let callCount = 0;
    const f = tm.excludeLiteral(
        (name : string, mixed : unknown) => {
            ++callCount;
            return tm.stringToFiniteNumber()(name, mixed);
        },
        "66"
    );

    const output = f("x", "66");
    t.deepEqual(callCount, 1);
    t.deepEqual(output, 66);

    t.end();
});
