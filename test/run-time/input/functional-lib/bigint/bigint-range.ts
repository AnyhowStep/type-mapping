import * as tape from "tape";
import * as tm from "../../../../../dist";

tape(__filename, t => {
    const f = tm.bigIntRange({
    });

    t.deepEqual(f("x", BigInt(-7)).toString(), "-7");
    t.deepEqual(f("x", BigInt(-6)).toString(), "-6");
    t.deepEqual(f("x", BigInt(-5)).toString(), "-5");
    t.deepEqual(f("x", BigInt(-4)).toString(), "-4");
    t.deepEqual(f("x", BigInt(-3)).toString(), "-3");
    t.deepEqual(f("x", BigInt(-2)).toString(), "-2");
    t.deepEqual(f("x", BigInt(-1)).toString(), "-1");

    t.false(typeof f("x", BigInt(-4)) == "string");
    t.false(typeof f("x", BigInt(-4)) == "number");

    t.false(tm.tryMap(f, "x", "-7" as any).success);
    t.false(tm.tryMap(f, "x", -7 as any).success);
    t.false(tm.tryMap(f, "x", "-1" as any).success);
    t.false(tm.tryMap(f, "x", -1 as any).success);
    t.false(tm.tryMap(f, "x", new Date() as any).success);
    t.false(tm.tryMap(f, "x", true as any).success);
    t.false(tm.tryMap(f, "x", null as any).success);
    t.false(tm.tryMap(f, "x", undefined as any).success);

    t.end();
});
tape(__filename, t => {
    const f = tm.bigIntRange({
        gtEq : BigInt(-4)
    });

    t.false(tm.tryMap(f, "x", BigInt(-7)).success);
    t.false(tm.tryMap(f, "x", BigInt(-6)).success);
    t.false(tm.tryMap(f, "x", BigInt(-5)).success);
    t.deepEqual(f("x", BigInt(-4)).toString(), "-4");
    t.deepEqual(f("x", BigInt(-3)).toString(), "-3");
    t.deepEqual(f("x", BigInt(-2)).toString(), "-2");
    t.deepEqual(f("x", BigInt(-1)).toString(), "-1");

    t.end();
});
tape(__filename, t => {
    const f = tm.bigIntRange({
        gt : BigInt(-4)
    });

    t.false(tm.tryMap(f, "x", BigInt(-7)).success);
    t.false(tm.tryMap(f, "x", BigInt(-6)).success);
    t.false(tm.tryMap(f, "x", BigInt(-5)).success);
    t.false(tm.tryMap(f, "x", BigInt(-4)).success);
    t.deepEqual(f("x", BigInt(-3)).toString(), "-3");
    t.deepEqual(f("x", BigInt(-2)).toString(), "-2");
    t.deepEqual(f("x", BigInt(-1)).toString(), "-1");

    t.end();
});
tape(__filename, t => {
    const f = tm.bigIntRange({
        ltEq : BigInt(-4)
    });

    t.deepEqual(f("x", BigInt(-7)).toString(), "-7");
    t.deepEqual(f("x", BigInt(-6)).toString(), "-6");
    t.deepEqual(f("x", BigInt(-5)).toString(), "-5");
    t.deepEqual(f("x", BigInt(-4)).toString(), "-4");
    t.false(tm.tryMap(f, "x", BigInt(-3)).success);
    t.false(tm.tryMap(f, "x", BigInt(-2)).success);
    t.false(tm.tryMap(f, "x", BigInt(-1)).success);

    t.end();
});
tape(__filename, t => {
    const f = tm.bigIntRange({
        lt : BigInt(-4)
    });

    t.deepEqual(f("x", BigInt(-7)).toString(), "-7");
    t.deepEqual(f("x", BigInt(-6)).toString(), "-6");
    t.deepEqual(f("x", BigInt(-5)).toString(), "-5");
    t.false(tm.tryMap(f, "x", BigInt(-4)).success);
    t.false(tm.tryMap(f, "x", BigInt(-3)).success);
    t.false(tm.tryMap(f, "x", BigInt(-2)).success);
    t.false(tm.tryMap(f, "x", BigInt(-1)).success);

    t.end();
});
tape(__filename, t => {
    const f = tm.bigIntRange({
        gtEq : BigInt(-2),
        gt : BigInt(-4),
    });

    t.false(tm.tryMap(f, "x", BigInt(-7)).success);
    t.false(tm.tryMap(f, "x", BigInt(-6)).success);
    t.false(tm.tryMap(f, "x", BigInt(-5)).success);
    t.false(tm.tryMap(f, "x", BigInt(-4)).success);
    t.false(tm.tryMap(f, "x", BigInt(-3)).success);
    t.deepEqual(f("x", BigInt(-2)).toString(), "-2");
    t.deepEqual(f("x", BigInt(-1)).toString(), "-1");

    t.end();
});
tape(__filename, t => {
    const f = tm.bigIntRange({
        gtEq : BigInt(-3),
        gt : BigInt(-4),
    });

    t.false(tm.tryMap(f, "x", BigInt(-7)).success);
    t.false(tm.tryMap(f, "x", BigInt(-6)).success);
    t.false(tm.tryMap(f, "x", BigInt(-5)).success);
    t.false(tm.tryMap(f, "x", BigInt(-4)).success);
    t.deepEqual(f("x", BigInt(-3)).toString(), "-3");
    t.deepEqual(f("x", BigInt(-2)).toString(), "-2");
    t.deepEqual(f("x", BigInt(-1)).toString(), "-1");

    t.end();
});
tape(__filename, t => {
    const f = tm.bigIntRange({
        gtEq : BigInt(-4),
        gt : BigInt(-4),
    });

    t.false(tm.tryMap(f, "x", BigInt(-7)).success);
    t.false(tm.tryMap(f, "x", BigInt(-6)).success);
    t.false(tm.tryMap(f, "x", BigInt(-5)).success);
    t.false(tm.tryMap(f, "x", BigInt(-4)).success);
    t.deepEqual(f("x", BigInt(-3)).toString(), "-3");
    t.deepEqual(f("x", BigInt(-2)).toString(), "-2");
    t.deepEqual(f("x", BigInt(-1)).toString(), "-1");

    t.end();
});
tape(__filename, t => {
    const f = tm.bigIntRange({
        gtEq : BigInt(-5),
        gt : BigInt(-4),
    });

    t.false(tm.tryMap(f, "x", BigInt(-7)).success);
    t.false(tm.tryMap(f, "x", BigInt(-6)).success);
    t.false(tm.tryMap(f, "x", BigInt(-5)).success);
    t.false(tm.tryMap(f, "x", BigInt(-4)).success);
    t.deepEqual(f("x", BigInt(-3)).toString(), "-3");
    t.deepEqual(f("x", BigInt(-2)).toString(), "-2");
    t.deepEqual(f("x", BigInt(-1)).toString(), "-1");

    t.end();
});
tape(__filename, t => {
    const f = tm.bigIntRange({
        gtEq : BigInt(-6),
        gt : BigInt(-4),
    });

    t.false(tm.tryMap(f, "x", BigInt(-7)).success);
    t.false(tm.tryMap(f, "x", BigInt(-6)).success);
    t.false(tm.tryMap(f, "x", BigInt(-5)).success);
    t.false(tm.tryMap(f, "x", BigInt(-4)).success);
    t.deepEqual(f("x", BigInt(-3)).toString(), "-3");
    t.deepEqual(f("x", BigInt(-2)).toString(), "-2");
    t.deepEqual(f("x", BigInt(-1)).toString(), "-1");

    t.end();
});

tape(__filename, t => {
    const f = tm.bigIntRange({
        ltEq : BigInt(-2),
        lt : BigInt(-4),
    });

    t.deepEqual(f("x", BigInt(-7)).toString(), "-7");
    t.deepEqual(f("x", BigInt(-6)).toString(), "-6");
    t.deepEqual(f("x", BigInt(-5)).toString(), "-5");
    t.false(tm.tryMap(f, "x", BigInt(-4)).success);
    t.false(tm.tryMap(f, "x", BigInt(-3)).success);
    t.false(tm.tryMap(f, "x", BigInt(-2)).success);
    t.false(tm.tryMap(f, "x", BigInt(-1)).success);

    t.end();
});
tape(__filename, t => {
    const f = tm.bigIntRange({
        ltEq : BigInt(-3),
        lt : BigInt(-4),
    });

    t.deepEqual(f("x", BigInt(-7)).toString(), "-7");
    t.deepEqual(f("x", BigInt(-6)).toString(), "-6");
    t.deepEqual(f("x", BigInt(-5)).toString(), "-5");
    t.false(tm.tryMap(f, "x", BigInt(-4)).success);
    t.false(tm.tryMap(f, "x", BigInt(-3)).success);
    t.false(tm.tryMap(f, "x", BigInt(-2)).success);
    t.false(tm.tryMap(f, "x", BigInt(-1)).success);

    t.end();
});
tape(__filename, t => {
    const f = tm.bigIntRange({
        ltEq : BigInt(-4),
        lt : BigInt(-4),
    });

    t.deepEqual(f("x", BigInt(-7)).toString(), "-7");
    t.deepEqual(f("x", BigInt(-6)).toString(), "-6");
    t.deepEqual(f("x", BigInt(-5)).toString(), "-5");
    t.false(tm.tryMap(f, "x", BigInt(-4)).success);
    t.false(tm.tryMap(f, "x", BigInt(-3)).success);
    t.false(tm.tryMap(f, "x", BigInt(-2)).success);
    t.false(tm.tryMap(f, "x", BigInt(-1)).success);

    t.end();
});
tape(__filename, t => {
    const f = tm.bigIntRange({
        ltEq : BigInt(-5),
        lt : BigInt(-4),
    });

    t.deepEqual(f("x", BigInt(-7)).toString(), "-7");
    t.deepEqual(f("x", BigInt(-6)).toString(), "-6");
    t.deepEqual(f("x", BigInt(-5)).toString(), "-5");
    t.false(tm.tryMap(f, "x", BigInt(-4)).success);
    t.false(tm.tryMap(f, "x", BigInt(-3)).success);
    t.false(tm.tryMap(f, "x", BigInt(-2)).success);
    t.false(tm.tryMap(f, "x", BigInt(-1)).success);

    t.end();
});
tape(__filename, t => {
    const f = tm.bigIntRange({
        ltEq : BigInt(-6),
        lt : BigInt(-4),
    });

    t.deepEqual(f("x", BigInt(-7)).toString(), "-7");
    t.deepEqual(f("x", BigInt(-6)).toString(), "-6");
    t.false(tm.tryMap(f, "x", BigInt(-5)).success);
    t.false(tm.tryMap(f, "x", BigInt(-4)).success);
    t.false(tm.tryMap(f, "x", BigInt(-3)).success);
    t.false(tm.tryMap(f, "x", BigInt(-2)).success);
    t.false(tm.tryMap(f, "x", BigInt(-1)).success);

    t.end();
});

tape(__filename, t => {
    t.throws(() => {
        tm.bigIntRange({
            gtEq : BigInt(-2),
            ltEq : BigInt(-4),
        });
    });

    t.end();
});
tape(__filename, t => {
    const f = tm.bigIntRange({
        gtEq : BigInt(-4),
        ltEq : BigInt(-2),
    });

    t.false(tm.tryMap(f, "x", BigInt(-7)).success);
    t.false(tm.tryMap(f, "x", BigInt(-6)).success);
    t.false(tm.tryMap(f, "x", BigInt(-5)).success);
    t.deepEqual(f("x", BigInt(-4)).toString(), "-4");
    t.deepEqual(f("x", BigInt(-3)).toString(), "-3");
    t.deepEqual(f("x", BigInt(-2)).toString(), "-2");
    t.false(tm.tryMap(f, "x", BigInt(-1)).success);

    t.end();
});
tape(__filename, t => {
    const f = tm.bigIntRange({
        gtEq : BigInt(-4),
        ltEq : BigInt(-4),
    });

    t.false(tm.tryMap(f, "x", BigInt(-7)).success);
    t.false(tm.tryMap(f, "x", BigInt(-6)).success);
    t.false(tm.tryMap(f, "x", BigInt(-5)).success);
    t.deepEqual(f("x", BigInt(-4)).toString(), "-4");
    t.false(tm.tryMap(f, "x", BigInt(-3)).success);
    t.false(tm.tryMap(f, "x", BigInt(-2)).success);
    t.false(tm.tryMap(f, "x", BigInt(-1)).success);

    t.end();
});

tape(__filename, t => {
    t.throws(() => {
        tm.bigIntRange({
            gtEq : BigInt(-2),
            lt : BigInt(-4),
        });
    });

    t.end();
});
tape(__filename, t => {
    const f = tm.bigIntRange({
        gtEq : BigInt(-4),
        lt : BigInt(-2),
    });

    t.false(tm.tryMap(f, "x", BigInt(-7)).success);
    t.false(tm.tryMap(f, "x", BigInt(-6)).success);
    t.false(tm.tryMap(f, "x", BigInt(-5)).success);
    t.deepEqual(f("x", BigInt(-4)).toString(), "-4");
    t.deepEqual(f("x", BigInt(-3)).toString(), "-3");
    t.false(tm.tryMap(f, "x", BigInt(-2)).success);
    t.false(tm.tryMap(f, "x", BigInt(-1)).success);

    t.end();
});
tape(__filename, t => {
    t.throws(() => {
        tm.bigIntRange({
            gtEq : BigInt(-2),
            lt : BigInt(-2),
        });
    });

    t.end();
});

tape(__filename, t => {
    t.throws(() => {
        tm.bigIntRange({
            gt : BigInt(-2),
            ltEq : BigInt(-4),
        });
    });

    t.end();
});
tape(__filename, t => {
    const f = tm.bigIntRange({
        gt : BigInt(-4),
        ltEq : BigInt(-2),
    });

    t.false(tm.tryMap(f, "x", BigInt(-7)).success);
    t.false(tm.tryMap(f, "x", BigInt(-6)).success);
    t.false(tm.tryMap(f, "x", BigInt(-5)).success);
    t.false(tm.tryMap(f, "x", BigInt(-4)).success);
    t.deepEqual(f("x", BigInt(-3)).toString(), "-3");
    t.deepEqual(f("x", BigInt(-2)).toString(), "-2");
    t.false(tm.tryMap(f, "x", BigInt(-1)).success);

    t.end();
});
tape(__filename, t => {
    t.throws(() => {
        tm.bigIntRange({
            gt : BigInt(-2),
            ltEq : BigInt(-2),
        });
    });

    t.end();
});

tape(__filename, t => {
    t.throws(() => {
        tm.bigIntRange({
            gt : BigInt(-2),
            lt : BigInt(-4),
        });
    });

    t.end();
});
tape(__filename, t => {
    const f = tm.bigIntRange({
        gt : BigInt(-4),
        lt : BigInt(-2),
    });

    t.false(tm.tryMap(f, "x", BigInt(-7)).success);
    t.false(tm.tryMap(f, "x", BigInt(-6)).success);
    t.false(tm.tryMap(f, "x", BigInt(-5)).success);
    t.false(tm.tryMap(f, "x", BigInt(-4)).success);
    t.deepEqual(f("x", BigInt(-3)).toString(), "-3");
    t.false(tm.tryMap(f, "x", BigInt(-2)).success);
    t.false(tm.tryMap(f, "x", BigInt(-1)).success);

    t.end();
});
tape(__filename, t => {
    t.throws(() => {
        tm.bigIntRange({
            gt : BigInt(-2),
            lt : BigInt(-2),
        });
    });

    t.end();
});

tape(__filename, t => {
    t.throws(() => {
        tm.bigIntRange({
            gt : BigInt(-3),
            lt : BigInt(-2),
        });
    });

    t.end();
});