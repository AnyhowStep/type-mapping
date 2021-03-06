import * as tape from "tape";
import * as tm from "../../../../../../dist";

tape(__filename, t => {
    const f = tm.implementsArrayLike();

    const arr0 : number[] = [];
    t.true(f("x", arr0) == arr0);
    const arr1 = [1,2,3];
    t.true(f("x", arr1) == arr1);
    const arr2 = [1,2,"3"];
    t.true(f("x", arr2) == arr2);

    const str = "abc";
    t.true(f("x", str) == str);

    const foo = function (_arg0 : any) {};
    t.true(f("x", foo) as any == foo);

    t.false(tm.tryMap(f, "x", new Date(NaN) as any).success);
    t.false(tm.tryMap(f, "x", new Date(-Infinity) as any).success);
    t.false(tm.tryMap(f, "x", new Date(+Infinity) as any).success);
    t.false(tm.tryMap(f, "x", new Date("qwerty") as any).success);
    t.false(tm.tryMap(f, "x", undefined as any).success);
    t.false(tm.tryMap(f, "x", null as any).success);
    t.false(tm.tryMap(f, "x", BigInt(0) as any).success);
    t.false(tm.tryMap(f, "x", BigInt(1) as any).success);
    t.true(tm.tryMap(f, "x", function () {} as any).success);
    t.false(tm.tryMap(f, "x", NaN as any).success);
    t.false(tm.tryMap(f, "x", -Infinity as any).success);
    t.false(tm.tryMap(f, "x", +Infinity as any).success);
    t.true(tm.tryMap(f, "x", "test" as any).success);
    t.true(tm.tryMap(f, "x", "null" as any).success);
    t.true(tm.tryMap(f, "x", "" as any).success);
    t.true(tm.tryMap(f, "x", "   " as any).success);
    t.true(tm.tryMap(f, "x", "{}" as any).success);
    t.false(tm.tryMap(f, "x", 0 as any).success);
    t.false(tm.tryMap(f, "x", 1 as any).success);
    t.false(tm.tryMap(f, "x", 2 as any).success);
    t.false(tm.tryMap(f, "x", true as any).success);
    t.false(tm.tryMap(f, "x", false as any).success);
    t.false(tm.tryMap(f, "x", new Number(1) as any).success);

    t.end();
});