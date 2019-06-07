import * as tape from "tape";
import * as tm from "../../../../../dist";

tape(__filename, t => {
    let value = 1;
    let str : string|undefined = "hello, world";
    class Clazz {
        @tm.method(tm.finiteNumber(), tm.orUndefined(tm.string()))
        foo (v : number, s? : string) {
            value = v;
            str = s;
        }
    }
    const c = new Clazz();

    c.foo(5);
    t.deepEqual(value, 5);
    t.deepEqual(str, undefined);
    t.throws(() => {
        c.foo("6" as any);
    });
    t.deepEqual(value, 5);
    t.deepEqual(str, undefined);
    t.deepEqual(JSON.stringify(c), `{}`);

    c.foo(6, "a");
    t.deepEqual(value, 6);
    t.deepEqual(str, "a");
    t.throws(() => {
        c.foo(7, 5 as any);
    });
    t.deepEqual(value, 6);
    t.deepEqual(str, "a");
    t.deepEqual(JSON.stringify(c), `{}`);

    t.end();
});
