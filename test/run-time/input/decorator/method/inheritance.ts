import * as tape from "tape";
import * as tm from "../../../../../dist";

tape(__filename, t => {
    let value : number = 9;
    class Base {
        @tm.method(tm.finiteNumber())
        foo (_v : number) {
            throw new Error("Should never be called; this is just how methods work");
        }
    }
    class Derived extends Base {
        @tm.method(tm.gt(4))
        foo (v : number) {
            value = v;
        }
    }
    const c = new Derived();

    t.deepEqual(value, 9);
    c.foo(5);
    t.deepEqual(value, 5);
    t.throws(() => {
        c.foo("6" as any);
    });
    t.throws(() => {
        c.foo(4);
    });
    t.throws(() => {
        c.foo(3);
    });
    t.throws(() => {
        c.foo(2);
    });
    t.throws(() => {
        c.foo(1);
    });
    t.deepEqual(value, 5);
    t.deepEqual(JSON.stringify(c), `{}`);

    t.end();
});

tape(__filename, t => {
    let value : number = 9;
    class Base {
        @tm.method(tm.gt(4))
        foo (v : number) {
            value = v;
        }
    }
    class Derived extends Base {
        @tm.method(tm.finiteNumber())
        foo (v : number) {
            super.foo(v);
        }
    }
    const c = new Derived();

    t.deepEqual(value, 9);
    c.foo(5);
    t.deepEqual(value, 5);
    t.throws(() => {
        c.foo("6" as any);
    });
    t.throws(() => {
        c.foo(4);
    });
    t.throws(() => {
        c.foo(3);
    });
    t.throws(() => {
        c.foo(2);
    });
    t.throws(() => {
        c.foo(1);
    });
    t.deepEqual(value, 5);
    t.deepEqual(JSON.stringify(c), `{}`);

    t.end();
});