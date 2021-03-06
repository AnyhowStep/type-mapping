import * as tape from "tape";
import * as tm from "../../../../../../dist";

tape(__filename, t => {
    const f = tm.arrayLike(tm.finiteNumberToFiniteNumberString());

    const arr0 = { length : 0 };
    t.true(f("x", arr0) == arr0);
    const arr1 = { length : 3, 0 : "3", 1 : "2", 2 : "1" };
    t.true(f("x", arr1) == arr1);
    const arr2 = { length : 3, 0 : "3", 1 : "2", 2 : 1 };
    t.deepEqual(f("x", arr2), ["3", "2", "1"]);

    //This makes me uncomfortable but makes sense.
    t.deepEqual(f("x", "12345"), "12345");

    t.false(tm.tryMap(f, "x", new Date(NaN) as any).success);
    t.false(tm.tryMap(f, "x", new Date(-Infinity) as any).success);
    t.false(tm.tryMap(f, "x", new Date(+Infinity) as any).success);
    t.false(tm.tryMap(f, "x", new Date("qwerty") as any).success);
    t.false(tm.tryMap(f, "x", undefined as any).success);
    t.false(tm.tryMap(f, "x", null as any).success);
    t.false(tm.tryMap(f, "x", BigInt(0) as any).success);
    t.false(tm.tryMap(f, "x", BigInt(1) as any).success);
    t.false(tm.tryMap(f, "x", [true] as any).success);
    //This succeeds and makes sense. But it makes me uncomfortable.
    t.true(tm.tryMap(f, "x", function () {} as any).success);
    const foo = function () {};
    t.deepEqual(f("x", foo), foo);
    t.false(tm.tryMap(f, "x", function (_arg0 : any) {} as any).success);
    t.deepEqual(f("x", Object.assign(
        function (_arg0 : any) {},
        {
            0 : 1
        }
    )), ["1"]);
    t.false(tm.tryMap(f, "x", NaN as any).success);
    t.false(tm.tryMap(f, "x", -Infinity as any).success);
    t.false(tm.tryMap(f, "x", +Infinity as any).success);
    t.false(tm.tryMap(f, "x", "test" as any).success);
    t.false(tm.tryMap(f, "x", "null" as any).success);
    //t.false(tm.tryMap(f, "x", "" as any).success);
    t.deepEqual(f("x", ""), "");
    t.false(tm.tryMap(f, "x", "   " as any).success);
    t.false(tm.tryMap(f, "x", "{}" as any).success);
    t.false(tm.tryMap(f, "x", 0 as any).success);
    t.false(tm.tryMap(f, "x", 1 as any).success);
    t.false(tm.tryMap(f, "x", 2 as any).success);
    t.false(tm.tryMap(f, "x", true as any).success);
    t.false(tm.tryMap(f, "x", false as any).success);
    t.false(tm.tryMap(f, "x", new Number(1) as any).success);

    t.end();
});