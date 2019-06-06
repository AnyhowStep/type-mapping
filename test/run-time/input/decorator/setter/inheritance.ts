import * as tape from "tape";
import * as tm from "../../../../../dist";

tape(__filename, t => {
    let value : number = 9;
    class Base {
        @tm.setter(tm.finiteNumber())
        set prop0 (_v : number) {
            throw new Error("Should never be called; this is just how setters work");
        }
        get prop0 () {
            throw new Error("Should never be called; this is just how getters work");
        }
    }
    class Derived extends Base {
        @tm.setter(tm.gt(4))
        set prop0 (v : number) {
            value = v;
        }
        get prop0 () {
            return value;
        }
    }
    const c = new Derived();

    t.deepEqual(c.prop0, 9);
    c.prop0 = 5;
    t.deepEqual(c.prop0, 5);
    t.throws(() => {
        c.prop0 = "6" as any;
    });
    t.throws(() => {
        c.prop0 = 4;
    });
    t.throws(() => {
        c.prop0 = 3;
    });
    t.throws(() => {
        c.prop0 = 2;
    });
    t.throws(() => {
        c.prop0 = 1;
    });
    t.deepEqual(c.prop0, 5);
    t.deepEqual(JSON.stringify(c), `{}`);

    t.end();
});

tape(__filename, t => {
    let value : number = 9;
    class Base {
        @tm.setter(tm.gt(4))
        set prop0 (v : number) {
            value = v;
        }
        get prop0 () {
            return value;
        }
    }
    class Derived extends Base {
        @tm.setter(tm.finiteNumber())
        set prop0 (v : number) {
            super.prop0 = v;
        }
        get prop0 () {
            return super.prop0;
        }
    }
    const c = new Derived();

    t.deepEqual(c.prop0, 9);
    c.prop0 = 5;
    t.deepEqual(c.prop0, 5);
    t.throws(() => {
        c.prop0 = "6" as any;
    });
    t.throws(() => {
        c.prop0 = 4;
    });
    t.throws(() => {
        c.prop0 = 3;
    });
    t.throws(() => {
        c.prop0 = 2;
    });
    t.throws(() => {
        c.prop0 = 1;
    });
    t.deepEqual(c.prop0, 5);
    t.deepEqual(JSON.stringify(c), `{}`);

    t.end();
});