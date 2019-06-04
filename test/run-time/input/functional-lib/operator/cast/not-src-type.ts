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
            if (typeof mixed != "number") {
                throw new Error(`${name} must be number`);
            }
            return [name, mixed];
        }
    );

    const input = true;
    const result = tm.tryMap(f, "x", input as any);
    t.deepEqual(called, ["dst", "src"]);
    if (result.success) {
        t.fail("Should not be able to cast");
    }

    t.end();
});
