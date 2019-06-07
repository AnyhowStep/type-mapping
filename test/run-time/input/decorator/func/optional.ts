import * as tape from "tape";
import * as tm from "../../../../../dist";

tape(__filename, t => {
    let value = 1;
    let str : string|undefined = "hello, world";
    const foo = tm.func(tm.finiteNumber(), tm.orUndefined(tm.string()))(
        (v : number, s? : string) => {
            value = v;
            str = s;
        }
    );

    foo(5);
    t.deepEqual(value, 5);
    t.deepEqual(str, undefined);
    t.throws(() => {
        foo("6" as any);
    });
    t.deepEqual(value, 5);
    t.deepEqual(str, undefined);

    foo(6, "a");
    t.deepEqual(value, 6);
    t.deepEqual(str, "a");
    t.throws(() => {
        foo(7, 5 as any);
    });
    t.deepEqual(value, 6);
    t.deepEqual(str, "a");

    t.end();
});
