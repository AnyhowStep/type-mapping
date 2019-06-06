import * as tape from "tape";
import * as tm from "../../../../../dist";

tape(__filename, t => {
    let value = 1;
    let arr : string[] = [];
    class Clazz {
        @tm.method(tm.finiteNumber(), ...[tm.string()])
        foo (v : number, ...a : string[]) {
            value = v;
            arr = a;
        }
    }
    const c = new Clazz();

    c.foo(5);
    t.deepEqual(value, 5);
    t.deepEqual(arr, []);
    t.throws(() => {
        c.foo("6" as any);
    });
    t.deepEqual(value, 5);
    t.deepEqual(arr, []);
    t.deepEqual(JSON.stringify(c), `{}`);

    c.foo(6, "a", "b", "c");
    t.deepEqual(value, 6);
    t.deepEqual(arr, ["a", "b", "c"]);
    t.throws(() => {
        c.foo(7, "a", "b", "c", 5 as any);
    });
    t.deepEqual(value, 6);
    t.deepEqual(arr, ["a", "b", "c"]);
    t.deepEqual(JSON.stringify(c), `{}`);

    t.end();
});
