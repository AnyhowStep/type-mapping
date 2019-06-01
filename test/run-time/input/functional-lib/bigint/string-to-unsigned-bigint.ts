import * as tape from "tape";
import * as tm from "../../../../../dist";

tape(__filename, t => {
    const f = tm.stringToUnsignedBigInt();

    t.deepEqual(f("x", 1n), 1n);
    t.deepEqual(f("x", BigInt(2)).toString(), BigInt(2).toString());
    t.deepEqual(f("x", BigInt(1)).toString(), BigInt(1).toString());
    t.deepEqual(f("x", BigInt(0)).toString(), BigInt(0).toString());
    t.false(tm.tryMap(f, 'x', BigInt(-1) as any).success);
    t.false(tm.tryMap(f, 'x', BigInt(-2) as any).success);

    t.deepEqual(f('x', "2").toString(), "2");
    t.deepEqual(f('x', "1").toString(), "1");
    t.deepEqual(f('x', "0").toString(), "0");
    t.false(tm.tryMap(f, 'x', "-1" as any).success);
    t.false(tm.tryMap(f, 'x', "-2" as any).success);
    t.false(tm.tryMap(f, 'x', "1.1" as any).success);
    t.false(tm.tryMap(f, 'x', "0.0" as any).success);
    t.false(tm.tryMap(f, 'x', "-1.1" as any).success);

    t.false(typeof f("x", "2") == "string");
    t.false(typeof f("x", "2") == "number");

    t.false(tm.tryMap(f, "x", 1 as any).success);
    t.false(tm.tryMap(f, "x", new Date() as any).success);
    t.false(tm.tryMap(f, "x", true as any).success);
    t.false(tm.tryMap(f, "x", null as any).success);
    t.false(tm.tryMap(f, "x", undefined as any).success);

    t.end();
});