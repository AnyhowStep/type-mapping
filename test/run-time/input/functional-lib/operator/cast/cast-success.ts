import * as tape from "tape";
import * as tm from "../../../../../../dist";

tape(__filename, t => {
    const called : string[] = [];
    const f = tm.cast(
        (name : string, mixed : unknown) : [string, string]=> {
            called.push("src");
            if (typeof mixed != "string") {
                throw new Error(`${name} must be string`);
            }
            return [name, mixed];
        },
        (src) : [string, number] => {
            called.push("cast");
            const n = parseInt(src[1]);
            if (!isFinite(n)) {
                throw new Error(`Parsed integer is not finite`);
            }
            return ["casted", n];
        },
        (name : string, mixed : unknown) : [string, number] => {
            called.push("dst");
            const v = (mixed as any)[1]
            if (typeof v != "number") {
                throw new Error(`${name} must be number`);
            }
            if (v < 10) {
                throw new Error(`${name} must be >= 10`);
            }
            return [name, v];
        }
    );

    const input = "15";
    const result = tm.tryMap(f, "x", input as any);
    t.deepEqual(called, ["dst", "src", "cast", "dst"]);
    if (result.success) {
        t.deepEqual(result.value[0], "x");//"(string(x) as Array as Array)");
        t.deepEqual(result.value[1], 15);
    } else {
        t.fail("Should cast successfully");
    }

    t.end();
});
