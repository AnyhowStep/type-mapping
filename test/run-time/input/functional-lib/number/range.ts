import * as tape from "tape";
import * as tm from "../../../../../dist";

tape(__filename, t => {
    const f = tm.range({
    });

    t.deepEqual(f("x", -7), -7);
    t.deepEqual(f("x", -6), -6);
    t.deepEqual(f("x", -5), -5);
    t.deepEqual(f("x", -4), -4);
    t.deepEqual(f("x", -3), -3);
    t.deepEqual(f("x", -2), -2);
    t.deepEqual(f("x", -1), -1);

    t.false(typeof f("x", -4) == "string");
    t.false(typeof f("x", -4) == "bigint");
    t.true(typeof f("x", -4) == "number");

    t.false(tm.tryMap(f, "x", "-7" as any).success);
    t.false(tm.tryMap(f, "x", BigInt(-7) as any).success);
    t.false(tm.tryMap(f, "x", "-1" as any).success);
    t.false(tm.tryMap(f, "x", BigInt(-1) as any).success);
    t.false(tm.tryMap(f, "x", new Date() as any).success);
    t.false(tm.tryMap(f, "x", true as any).success);
    t.false(tm.tryMap(f, "x", null as any).success);
    t.false(tm.tryMap(f, "x", undefined as any).success);

    t.end();
});
tape(__filename, t => {
    const f = tm.range({
        gtEq : -4
    });

    t.false(tm.tryMap(f, "x", -7).success);
    t.false(tm.tryMap(f, "x", -6).success);
    t.false(tm.tryMap(f, "x", -5).success);
    t.deepEqual(f("x", -4), -4);
    t.deepEqual(f("x", -3), -3);
    t.deepEqual(f("x", -2), -2);
    t.deepEqual(f("x", -1), -1);

    t.end();
});
tape(__filename, t => {
    const f = tm.range({
        gt : -4
    });

    t.false(tm.tryMap(f, "x", -7).success);
    t.false(tm.tryMap(f, "x", -6).success);
    t.false(tm.tryMap(f, "x", -5).success);
    t.false(tm.tryMap(f, "x", -4).success);
    t.deepEqual(f("x", -3), -3);
    t.deepEqual(f("x", -2), -2);
    t.deepEqual(f("x", -1), -1);

    t.end();
});
tape(__filename, t => {
    const f = tm.range({
        ltEq : -4
    });

    t.deepEqual(f("x", -7), -7);
    t.deepEqual(f("x", -6), -6);
    t.deepEqual(f("x", -5), -5);
    t.deepEqual(f("x", -4), -4);
    t.false(tm.tryMap(f, "x", -3).success);
    t.false(tm.tryMap(f, "x", -2).success);
    t.false(tm.tryMap(f, "x", -1).success);

    t.end();
});
tape(__filename, t => {
    const f = tm.range({
        lt : -4
    });

    t.deepEqual(f("x", -7), -7);
    t.deepEqual(f("x", -6), -6);
    t.deepEqual(f("x", -5), -5);
    t.false(tm.tryMap(f, "x", -4).success);
    t.false(tm.tryMap(f, "x", -3).success);
    t.false(tm.tryMap(f, "x", -2).success);
    t.false(tm.tryMap(f, "x", -1).success);

    t.end();
});
tape(__filename, t => {
    const f = tm.range({
        gtEq : -2,
        gt : -4,
    });

    t.false(tm.tryMap(f, "x", -7).success);
    t.false(tm.tryMap(f, "x", -6).success);
    t.false(tm.tryMap(f, "x", -5).success);
    t.false(tm.tryMap(f, "x", -4).success);
    t.false(tm.tryMap(f, "x", -3).success);
    t.deepEqual(f("x", -2), -2);
    t.deepEqual(f("x", -1), -1);

    t.end();
});
tape(__filename, t => {
    const f = tm.range({
        gtEq : -3,
        gt : -4,
    });

    t.false(tm.tryMap(f, "x", -7).success);
    t.false(tm.tryMap(f, "x", -6).success);
    t.false(tm.tryMap(f, "x", -5).success);
    t.false(tm.tryMap(f, "x", -4).success);
    t.deepEqual(f("x", -3), -3);
    t.deepEqual(f("x", -2), -2);
    t.deepEqual(f("x", -1), -1);

    t.end();
});
tape(__filename, t => {
    const f = tm.range({
        gtEq : -4,
        gt : -4,
    });

    t.false(tm.tryMap(f, "x", -7).success);
    t.false(tm.tryMap(f, "x", -6).success);
    t.false(tm.tryMap(f, "x", -5).success);
    t.false(tm.tryMap(f, "x", -4).success);
    t.deepEqual(f("x", -3), -3);
    t.deepEqual(f("x", -2), -2);
    t.deepEqual(f("x", -1), -1);

    t.end();
});
tape(__filename, t => {
    const f = tm.range({
        gtEq : -5,
        gt : -4,
    });

    t.false(tm.tryMap(f, "x", -7).success);
    t.false(tm.tryMap(f, "x", -6).success);
    t.false(tm.tryMap(f, "x", -5).success);
    t.false(tm.tryMap(f, "x", -4).success);
    t.deepEqual(f("x", -3), -3);
    t.deepEqual(f("x", -2), -2);
    t.deepEqual(f("x", -1), -1);

    t.end();
});
tape(__filename, t => {
    const f = tm.range({
        gtEq : -6,
        gt : -4,
    });

    t.false(tm.tryMap(f, "x", -7).success);
    t.false(tm.tryMap(f, "x", -6).success);
    t.false(tm.tryMap(f, "x", -5).success);
    t.false(tm.tryMap(f, "x", -4).success);
    t.deepEqual(f("x", -3), -3);
    t.deepEqual(f("x", -2), -2);
    t.deepEqual(f("x", -1), -1);

    t.end();
});

tape(__filename, t => {
    const f = tm.range({
        ltEq : -2,
        lt : -4,
    });

    t.deepEqual(f("x", -7), -7);
    t.deepEqual(f("x", -6), -6);
    t.deepEqual(f("x", -5), -5);
    t.false(tm.tryMap(f, "x", -4).success);
    t.false(tm.tryMap(f, "x", -3).success);
    t.false(tm.tryMap(f, "x", -2).success);
    t.false(tm.tryMap(f, "x", -1).success);

    t.end();
});
tape(__filename, t => {
    const f = tm.range({
        ltEq : -3,
        lt : -4,
    });

    t.deepEqual(f("x", -7), -7);
    t.deepEqual(f("x", -6), -6);
    t.deepEqual(f("x", -5), -5);
    t.false(tm.tryMap(f, "x", -4).success);
    t.false(tm.tryMap(f, "x", -3).success);
    t.false(tm.tryMap(f, "x", -2).success);
    t.false(tm.tryMap(f, "x", -1).success);

    t.end();
});
tape(__filename, t => {
    const f = tm.range({
        ltEq : -4,
        lt : -4,
    });

    t.deepEqual(f("x", -7), -7);
    t.deepEqual(f("x", -6), -6);
    t.deepEqual(f("x", -5), -5);
    t.false(tm.tryMap(f, "x", -4).success);
    t.false(tm.tryMap(f, "x", -3).success);
    t.false(tm.tryMap(f, "x", -2).success);
    t.false(tm.tryMap(f, "x", -1).success);

    t.end();
});
tape(__filename, t => {
    const f = tm.range({
        ltEq : -5,
        lt : -4,
    });

    t.deepEqual(f("x", -7), -7);
    t.deepEqual(f("x", -6), -6);
    t.deepEqual(f("x", -5), -5);
    t.false(tm.tryMap(f, "x", -4).success);
    t.false(tm.tryMap(f, "x", -3).success);
    t.false(tm.tryMap(f, "x", -2).success);
    t.false(tm.tryMap(f, "x", -1).success);

    t.end();
});
tape(__filename, t => {
    const f = tm.range({
        ltEq : -6,
        lt : -4,
    });

    t.deepEqual(f("x", -7), -7);
    t.deepEqual(f("x", -6), -6);
    t.false(tm.tryMap(f, "x", -5).success);
    t.false(tm.tryMap(f, "x", -4).success);
    t.false(tm.tryMap(f, "x", -3).success);
    t.false(tm.tryMap(f, "x", -2).success);
    t.false(tm.tryMap(f, "x", -1).success);

    t.end();
});

tape(__filename, t => {
    t.throws(() => {
        tm.range({
            gtEq : -2,
            ltEq : -4,
        });
    });

    t.end();
});
tape(__filename, t => {
    const f = tm.range({
        gtEq : -4,
        ltEq : -2,
    });

    t.false(tm.tryMap(f, "x", -7).success);
    t.false(tm.tryMap(f, "x", -6).success);
    t.false(tm.tryMap(f, "x", -5).success);
    t.deepEqual(f("x", -4), -4);
    t.deepEqual(f("x", -3), -3);
    t.deepEqual(f("x", -2), -2);
    t.false(tm.tryMap(f, "x", -1).success);

    t.end();
});
tape(__filename, t => {
    const f = tm.range({
        gtEq : -4,
        ltEq : -4,
    });

    t.false(tm.tryMap(f, "x", -7).success);
    t.false(tm.tryMap(f, "x", -6).success);
    t.false(tm.tryMap(f, "x", -5).success);
    t.deepEqual(f("x", -4), -4);
    t.false(tm.tryMap(f, "x", -3).success);
    t.false(tm.tryMap(f, "x", -2).success);
    t.false(tm.tryMap(f, "x", -1).success);

    t.end();
});

tape(__filename, t => {
    t.throws(() => {
        tm.range({
            gtEq : -2,
            lt : -4,
        });
    });

    t.end();
});
tape(__filename, t => {
    const f = tm.range({
        gtEq : -4,
        lt : -2,
    });

    t.false(tm.tryMap(f, "x", -7).success);
    t.false(tm.tryMap(f, "x", -6).success);
    t.false(tm.tryMap(f, "x", -5).success);
    t.deepEqual(f("x", -4), -4);
    t.deepEqual(f("x", -3), -3);
    t.false(tm.tryMap(f, "x", -2).success);
    t.false(tm.tryMap(f, "x", -1).success);

    t.end();
});
tape(__filename, t => {
    t.throws(() => {
        tm.range({
            gtEq : -2,
            lt : -2,
        });
    });

    t.end();
});

tape(__filename, t => {
    t.throws(() => {
        tm.range({
            gt : -2,
            ltEq : -4,
        });
    });

    t.end();
});
tape(__filename, t => {
    const f = tm.range({
        gt : -4,
        ltEq : -2,
    });

    t.false(tm.tryMap(f, "x", -7).success);
    t.false(tm.tryMap(f, "x", -6).success);
    t.false(tm.tryMap(f, "x", -5).success);
    t.false(tm.tryMap(f, "x", -4).success);
    t.deepEqual(f("x", -3), -3);
    t.deepEqual(f("x", -2), -2);
    t.false(tm.tryMap(f, "x", -1).success);

    t.end();
});
tape(__filename, t => {
    t.throws(() => {
        tm.range({
            gt : -2,
            ltEq : -2,
        });
    });

    t.end();
});

tape(__filename, t => {
    t.throws(() => {
        tm.range({
            gt : -2,
            lt : -4,
        });
    });

    t.end();
});
tape(__filename, t => {
    const f = tm.range({
        gt : -4,
        lt : -2,
    });

    t.false(tm.tryMap(f, "x", -7).success);
    t.false(tm.tryMap(f, "x", -6).success);
    t.false(tm.tryMap(f, "x", -5).success);
    t.false(tm.tryMap(f, "x", -4).success);
    t.deepEqual(f("x", -3), -3);
    t.false(tm.tryMap(f, "x", -2).success);
    t.false(tm.tryMap(f, "x", -1).success);

    t.end();
});
tape(__filename, t => {
    t.throws(() => {
        tm.range({
            gt : -2,
            lt : -2,
        });
    });

    t.end();
});

tape(__filename, t => {
    const f = tm.range({
        gt : -3,
        lt : -2,
    });

    t.false(tm.tryMap(f, "x", -7).success);
    t.false(tm.tryMap(f, "x", -6).success);
    t.false(tm.tryMap(f, "x", -5).success);
    t.false(tm.tryMap(f, "x", -4).success);
    t.false(tm.tryMap(f, "x", -3).success);
    t.deepEqual(f("x", -2.5), -2.5);
    t.false(tm.tryMap(f, "x", -2).success);
    t.false(tm.tryMap(f, "x", -1).success);

    t.end();
});
tape(__filename, t => {
    const f = tm.range({
        gt : -2.1,
        lt : -2.0,
    });

    t.false(tm.tryMap(f, "x", -7).success);
    t.false(tm.tryMap(f, "x", -6).success);
    t.false(tm.tryMap(f, "x", -5).success);
    t.false(tm.tryMap(f, "x", -4).success);
    t.false(tm.tryMap(f, "x", -3).success);
    t.false(tm.tryMap(f, "x", -2.5).success);
    t.deepEqual(f("x", -2.05), -2.05);
    t.false(tm.tryMap(f, "x", -2).success);
    t.false(tm.tryMap(f, "x", -1).success);

    t.end();
});