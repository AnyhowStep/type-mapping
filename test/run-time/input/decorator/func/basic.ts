import * as tape from "tape";
import * as tm from "../../../../../dist";

tape(__filename, t => {
    let value = 1;
    const foo = tm.func(tm.finiteNumber())(
        (v : number) => {
            value = v;
        }
    );

    foo(5);
    t.deepEqual(value, 5);
    t.throws(() => {
        foo("6" as any);
    });
    t.deepEqual(value, 5);

    t.end();
});

tape(__filename, t => {
    let value = 1;
    const foo = tm.func(tm.stringToFiniteNumber())(
        (v : number) => {
            value = v;
        }
    );

    foo(5);
    t.deepEqual(value, 5);
    t.doesNotThrow(() => {
        foo("6" as any);
    });
    t.deepEqual(value, 6);

    t.end();
});

tape(__filename, t => {
    let value = 1;
    const foo = tm.func(tm.stringToFiniteNumber())(
        (v : number) => {
            value = v;
        }
    );

    t.throws(() => {
        (foo as any)();
    });
    t.deepEqual(value, 1);
    t.doesNotThrow(() => {
        foo("6" as any);
    });
    t.deepEqual(value, 6);

    t.end();
});

tape(__filename, t => {
    let value : number|null = 1;
    const foo = tm.func(tm.or(tm.stringToFiniteNumber(), tm.undefinedToNull()))(
        (v : number|null) => {
            value = v;
        }
    );

    t.doesNotThrow(() => {
        (foo as any)();
    });
    t.deepEqual(value, null);
    t.doesNotThrow(() => {
        foo("6" as any);
    });
    t.deepEqual(value, 6);
    t.doesNotThrow(() => {
        (foo as any)();
    });
    t.deepEqual(value, null);

    t.end();
});