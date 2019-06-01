import * as tape from "tape";
import * as tm from "../../../../../dist";

tape(__filename, t => {
    const f = tm.bigIntLtEq(BigInt(5));

    t.deepEqual(f("x", BigInt(4)).toString(), "4");
    t.deepEqual(f("x", BigInt(5)).toString(), "5");
    t.false(tm.tryMap(f, "x", BigInt(6)).success);
    t.false(tm.tryMap(f, "x", BigInt(7)).success);

    t.false(typeof f("x", BigInt(5)) == "string");
    t.false(typeof f("x", BigInt(5)) == "number");

    t.false(tm.tryMap(f, "x", "7" as any).success);
    t.false(tm.tryMap(f, "x", 7 as any).success);
    t.false(tm.tryMap(f, "x", "1" as any).success);
    t.false(tm.tryMap(f, "x", 1 as any).success);
    t.false(tm.tryMap(f, "x", new Date() as any).success);
    t.false(tm.tryMap(f, "x", true as any).success);
    t.false(tm.tryMap(f, "x", null as any).success);
    t.false(tm.tryMap(f, "x", undefined as any).success);

    t.end();
});