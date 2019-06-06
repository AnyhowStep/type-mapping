import * as tape from "tape";
import * as tm from "../../../../../dist";

tape(__filename, t => {
    class Clazz {
        /**
            Maybe have a fluent API like,
            @tm.finiteNumber().prop()
        */
        @tm.prop(tm.finiteNumber())
        prop0 : number = 1;
    }
    const c = new Clazz();

    c.prop0 = 5;
    t.deepEqual(c.prop0, 5);
    t.throws(() => {
        c.prop0 = "6" as any;
    });
    t.deepEqual(c.prop0, 5);
    t.deepEqual(JSON.stringify(c), `{"prop0":5}`);

    t.end();
});
tape(__filename, t => {
    class Clazz {
        @tm.prop(tm.stringToFiniteNumber())
        prop0 : number = 1;
    }
    const c = new Clazz();

    c.prop0 = 5;
    t.deepEqual(c.prop0, 5);
    t.doesNotThrow(() => {
        c.prop0 = "6" as any;
    });
    t.deepEqual(c.prop0, 6);
    t.deepEqual(JSON.stringify(c), `{"prop0":6}`);

    t.end();
});