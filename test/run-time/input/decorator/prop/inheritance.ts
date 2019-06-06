import * as tape from "tape";
import * as tm from "../../../../../dist";

tape(__filename, t => {
    class Base {
        @tm.prop(tm.finiteNumber())
        prop0 : number = 8;
    }
    class Derived extends Base {
        @tm.prop(tm.gt(4))
        prop0 : number = 9;
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
    t.deepEqual(JSON.stringify(c), `{"prop0":5}`);

    t.end();
});

tape(__filename, t => {
    class Base {
        @tm.prop(tm.gt(4))
        prop0 : number = 8;
    }
    class Derived extends Base {
        @tm.prop(tm.finiteNumber())
        prop0 : number = 9;
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
    t.deepEqual(JSON.stringify(c), `{"prop0":5}`);

    t.end();
});