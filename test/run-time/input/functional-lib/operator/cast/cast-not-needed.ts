import * as tape from "tape";
import * as tm from "../../../../../../dist";

tape(__filename, t => {
    const called : string[] = [];
    const f = tm.cast(
        (name : string, mixed : unknown) => {
            called.push("src");
            return [name, mixed];
        },
        (src) : [string, unknown] => {
            called.push("cast");
            return ["casted", src];
        },
        (name : string, mixed : unknown) : [string, unknown] => {
            called.push("dst");
            return [name, mixed];
        }
    );

    const input = {
        isInput : true,
    };
    const output = f("x", input);
    t.deepEqual(called, ["dst"]);
    t.true("x" == output[0]);
    t.true(input == output[1]);

    t.end();
});
