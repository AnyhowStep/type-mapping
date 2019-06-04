import * as tape from "tape";
import * as tm from "../../../../../../dist";

tape(__filename, t => {
    let callCount = 0;

    const cachedObj = {
        x : 1
    };
    const f = tm.cache(
        cachedObj,
        (name : string, mixed : unknown, cached) : [string, unknown] => {
            t.true(cached == cachedObj);
            ++callCount;
            return [name, mixed];
        }
    );

    const input = {
        isInput : true,
    };
    const output = f("x", input);
    t.deepEqual(callCount, 1);
    t.true("x" == output[0]);
    t.true(input == output[1]);

    t.end();
});
