import * as tape from "tape";
import * as tm from "../../../../../dist";

tape(__filename, t => {
    for (let i=-100; i<=100; ++i) {
        const str = i.toString();
        const addOne = tm.BigIntUtil.addOneImpl(str);
        t.deepEqual(addOne, (i+1).toString());
    }

    t.end();
});