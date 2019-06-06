import * as tape from "tape";
import * as tm from "../../../../../dist";

tape(__filename, t => {
    let value : number = 1;
    class Clazz {
        /**
            Maybe have a fluent API like,
            @tm.finiteNumber().prop()
        */
        @tm.setter(tm.finiteNumber())
        set prop0 (v : number) {
            value = v;
        }
        get prop0 () {
            return value;
        }
    }
    const c = new Clazz();

    c.prop0 = 5;
    t.deepEqual(c.prop0, 5);
    t.throws(() => {
        c.prop0 = "6" as any;
    });
    t.deepEqual(c.prop0, 5);
    t.deepEqual(JSON.stringify(c), `{}`);

    t.end();
});
tape(__filename, t => {
    let value : number = 1;
    class Clazz {
        @tm.setter(tm.stringToFiniteNumber())
        set prop0 (v : number) {
            value = v;
        }
        get prop0 () {
            return value;
        }
    }
    const c = new Clazz();

    c.prop0 = 5;
    t.deepEqual(c.prop0, 5);
    t.doesNotThrow(() => {
        c.prop0 = "6" as any;
    });
    t.deepEqual(c.prop0, 6);
    t.deepEqual(JSON.stringify(c), `{}`);

    t.end();
});