import * as tape from "tape";
import * as tm from "../../../../../../dist";

tape(__filename, t => {
    const f = tm.derive("a", "a2", tm.optional(tm.finiteNumber()));

    t.deepEqual(f("x", { a : 2 }), { a2 : 2 });
    t.deepEqual(f("x", { a : 2, a2 : 3 }), { a2 : 2 });
    t.deepEqual(f("x", { a : undefined, a2 : 3 }), { a2 : undefined });
    t.deepEqual(f("x", { a2 : 3 }), { a2 : undefined });
    t.false(tm.tryMap(f, "x", { a : "2" } as any).success);

    /**
        The t.true() cases below might be surprising but
        they *do* satisfy `{ a? : number|undefined }`.

        ```ts
        (new Date()).a === undefined
        ```

        Limiting objects to just POJOs (Plain old JS objects) would
        heavily reduce this mapper's usability with user-defined classes,
        ```ts
        class Foo {
            a : number|undefined
        }
        const foo = new Foo();
        mapper("foo", foo); //Err, `foo` is not a POJO
        ```

        We could try to filter out the most common class instances
        that would be surprising to map successfully,
        but that just feels like a never-ending race.

        -----

        The takeaway here is that you should try to avoid maps
        where every single field is optional.
    */
    t.deepEqual(f("x", new Date()), { a2 : undefined });

    t.false(tm.tryMap(f, "x", null as any).success);
    t.false(tm.tryMap(f, "x", undefined as any).success);
    t.false(tm.tryMap(f, "x", BigInt(0) as any).success);
    t.false(tm.tryMap(f, "x", BigInt(1) as any).success);
    t.true(tm.tryMap(f, "x", new Date() as any).success);
    t.true(tm.tryMap(f, "x", [] as any).success);
    t.true(tm.tryMap(f, "x", [true] as any).success);
    t.true(tm.tryMap(f, "x", function () {} as any).success);
    t.false(tm.tryMap(f, "x", NaN as any).success);
    t.false(tm.tryMap(f, "x", -Infinity as any).success);
    t.false(tm.tryMap(f, "x", +Infinity as any).success);
    t.false(tm.tryMap(f, "x", "test" as any).success);
    t.false(tm.tryMap(f, "x", "1" as any).success);
    t.false(tm.tryMap(f, "x", 0 as any).success);
    t.false(tm.tryMap(f, "x", 1 as any).success);
    t.false(tm.tryMap(f, "x", true as any).success);
    t.false(tm.tryMap(f, "x", false as any).success);
    t.true(tm.tryMap(f, "x", new Number(1) as any).success);

    t.end();
});