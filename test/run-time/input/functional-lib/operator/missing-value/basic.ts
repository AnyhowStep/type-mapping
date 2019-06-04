import * as tape from "tape";
import * as tm from "../../../../../../dist";

tape(__filename, t => {
    const f = tm.orUndefined(tm.finiteNumber());

    t.deepEqual((f as any).__optional, false);
    t.deepEqual(f("x", undefined), undefined);
    t.deepEqual(f("x", 32), 32);
    t.false(tm.tryMap(f, "x", null as any).success);

    t.end();
});

tape(__filename, t => {
    const f = tm.orNull(tm.finiteNumber());

    t.deepEqual((f as any).__optional, false);
    t.deepEqual(f("x", null), null);
    t.deepEqual(f("x", 32), 32);
    t.false(tm.tryMap(f, "x", undefined as any).success);
    t.end();
});

tape(__filename, t => {
    const f = tm.orMaybe(tm.finiteNumber());

    t.deepEqual((f as any).__optional, false);
    t.deepEqual(f("x", null), null);
    t.deepEqual(f("x", undefined), undefined);
    t.deepEqual(f("x", 32), 32);

    t.end();
});

tape(__filename, t => {
    const f = tm.notUndefined(tm.orMaybe(tm.finiteNumber()));

    t.deepEqual((f as any).__optional, false);
    t.deepEqual(f("x", null), null);
    t.deepEqual(f("x", 32), 32);
    t.false(tm.tryMap(f, "x", undefined as any).success);

    const g = tm.notUndefined(tm.optional(tm.finiteNumber()));
    t.deepEqual((g as any).__optional, true);
    t.false(tm.isOptional(g));

    t.end();
});

tape(__filename, t => {
    const f = tm.notNull(tm.orMaybe(tm.finiteNumber()));

    t.deepEqual((f as any).__optional, false);
    t.deepEqual(f("x", undefined), undefined);
    t.deepEqual(f("x", 32), 32);
    t.false(tm.tryMap(f, "x", null as any).success);

    const g = tm.notNull(tm.optional(tm.finiteNumber()));
    t.deepEqual(g.__optional, true);
    t.true(tm.isOptional(g));

    t.end();
});

tape(__filename, t => {
    const f = tm.notMaybe(tm.orMaybe(tm.finiteNumber()));

    t.deepEqual((f as any).__optional, false);
    t.deepEqual(f("x", 32), 32);
    t.false(tm.tryMap(f, "x", null as any).success);
    t.false(tm.tryMap(f, "x", undefined as any).success);

    const g = tm.notMaybe(tm.optional(tm.finiteNumber()));
    t.deepEqual((g as any).__optional, true);
    t.false(tm.isOptional(g));

    t.end();
});

tape(__filename, t => {
    const f = tm.optional(tm.finiteNumber());

    t.deepEqual(f.__optional, true);
    t.deepEqual(f("x", 32), 32);
    t.deepEqual(f("x", undefined), undefined);
    t.false(tm.tryMap(f, "x", null as any).success);

    t.true(tm.isOptional(f));

    t.end();
});

tape(__filename, t => {
    const f = tm.notOptional(tm.optional(tm.finiteNumber()));

    t.deepEqual((f as any).__optional, false);
    t.deepEqual(f("x", 32), 32);
    t.false(tm.tryMap(f, "x", null as any).success);
    t.false(tm.tryMap(f, "x", undefined as any).success);

    t.false(tm.isOptional(f));

    t.end();
});
