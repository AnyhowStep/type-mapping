import * as tape from "tape";
import * as tm from "../../../../../dist";

tape(__filename, t => {
    t.deepEqual(
        tm.TypeUtil.deepMerge({}, { x : "hi" }),
        { x : "hi" }
    );

    t.deepEqual(
        tm.TypeUtil.deepMerge({ x : "hi" }, {}),
        { x : "hi" }
    );

    t.deepEqual(
        tm.TypeUtil.deepMerge({ x : "hi" }, {  y : "bye" }),
        { x : "hi", y : "bye" }
    );

    t.deepEqual(
        tm.TypeUtil.deepMerge(Object.create(null), { x : "hi" }),
        { x : "hi" }
    );

    t.deepEqual(
        tm.TypeUtil.deepMerge({ x : "hi" }, Object.create(null)),
        { x : "hi" }
    );

    t.deepEqual(
        tm.TypeUtil.deepMerge(Object.create(null), Object.create(null)),
        {}
    );

    t.end();
});