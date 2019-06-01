import * as tape from "tape";
import * as tm from "../../../../../dist";

tape(__filename, t => {
    const f = tm.unsignedBigInt();

    t.deepEqual(f("x", 1n), 1n);
    t.deepEqual(f("x", BigInt(2)).toString(), BigInt(2).toString());
    t.deepEqual(f("x", BigInt(1)).toString(), BigInt(1).toString());
    t.deepEqual(f("x", BigInt(0)).toString(), BigInt(0).toString());
    t.false(tm.tryMap(f, "x", BigInt(-1)).success);
    t.false(tm.tryMap(f, "x", BigInt(-4)).success);

    t.false(tm.tryMap(f, "x", "1" as any).success);
    t.false(tm.tryMap(f, "x", 1 as any).success);
    t.false(tm.tryMap(f, "x", new Date() as any).success);
    t.false(tm.tryMap(f, "x", true as any).success);
    t.false(tm.tryMap(f, "x", null as any).success);
    t.false(tm.tryMap(f, "x", undefined as any).success);

    t.end();
});