import * as tape from "tape";
import * as tm from "../../../../../../dist";

interface Tree {
    value : number,
    left? : Tree,
    right? : Tree,
}

tape(__filename, t => {
    /**
        deferred makes it possible to have cyclic mappers.
        TODO Give this a better name?
    */
    const deferredTree = tm.deferred<Tree>();
    const f = tm.object({
        value : tm.finiteNumber(),
        left : tm.optional(deferredTree),
        right : tm.optional(deferredTree),
    });
    deferredTree.setImplementation(f);

    const obj = {
        value : 4,
        left : {
            value : 89,
            right : {
                value : 6,
                left : undefined,
            }
        }
    };
    t.false(f("x", obj) == obj);
    t.deepEqual(f("x", obj), {
        value : 4,
        left : {
            value : 89,
            left : undefined,
            right : {
                value : 6,
                left : undefined,
                right : undefined,
            }
        },
        right : undefined,
    });

    t.false(tm.tryMap(f, "x", null as any).success);
    t.false(tm.tryMap(f, "x", undefined as any).success);
    t.false(tm.tryMap(f, "x", BigInt(0) as any).success);
    t.false(tm.tryMap(f, "x", BigInt(1) as any).success);
    t.false(tm.tryMap(f, "x", new Date() as any).success);
    t.false(tm.tryMap(f, "x", [] as any).success);
    t.false(tm.tryMap(f, "x", [true] as any).success);
    t.false(tm.tryMap(f, "x", function () {} as any).success);
    t.false(tm.tryMap(f, "x", NaN as any).success);
    t.false(tm.tryMap(f, "x", -Infinity as any).success);
    t.false(tm.tryMap(f, "x", +Infinity as any).success);
    t.false(tm.tryMap(f, "x", "test" as any).success);
    t.false(tm.tryMap(f, "x", "1" as any).success);
    t.false(tm.tryMap(f, "x", 0 as any).success);
    t.false(tm.tryMap(f, "x", 1 as any).success);
    t.false(tm.tryMap(f, "x", true as any).success);
    t.false(tm.tryMap(f, "x", false as any).success);
    t.false(tm.tryMap(f, "x", new Number(1) as any).success);
    t.false(tm.tryMap(f, "x", new String("str") as any).success);
    t.false(tm.tryMap(f, "x", Buffer.from("str") as any).success);

    t.end();
});