import * as tape from "tape";
import * as tm from "../../../../../dist";

tape(__filename, t => {
    let value = 1;
    let arr : string[] = [];
    const foo = tm.func(tm.finiteNumber(), ...[tm.string()])(
        (v : number, ...a : string[]) => {
            value = v;
            arr = a;
        }
    )

    foo(5);
    t.deepEqual(value, 5);
    t.deepEqual(arr, []);
    t.throws(() => {
        foo("6" as any);
    });
    t.deepEqual(value, 5);
    t.deepEqual(arr, []);

    foo(6, "a", "b", "c");
    t.deepEqual(value, 6);
    t.deepEqual(arr, ["a", "b", "c"]);
    t.throws(() => {
        foo(7, "a", "b", "c", 5 as any);
    });
    t.deepEqual(value, 6);
    t.deepEqual(arr, ["a", "b", "c"]);

    t.end();
});
