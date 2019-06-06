import * as tape from "tape";
import * as tm from "../../../../../dist";

tape(__filename, t => {
    let value = 1;
    class Clazz {
        @tm.method(tm.finiteNumber())
        foo (v : number) {
            value = v;
        }
    }
    const c = new Clazz();

    c.foo(5);
    t.deepEqual(value, 5);
    t.throws(() => {
        c.foo("6" as any);
    });
    t.deepEqual(value, 5);
    t.deepEqual(JSON.stringify(c), `{}`);

    t.end();
});

tape(__filename, t => {
    let value = 1;
    class Clazz {
        @tm.method(tm.stringToFiniteNumber())
        foo (v : number) {
            value = v;
        }
    }
    const c = new Clazz();

    c.foo(5);
    t.deepEqual(value, 5);
    t.doesNotThrow(() => {
        c.foo("6" as any);
    });
    t.deepEqual(value, 6);
    t.deepEqual(JSON.stringify(c), `{}`);

    t.end();
});