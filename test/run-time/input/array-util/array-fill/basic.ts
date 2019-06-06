import * as tape from "tape";
import * as arrayUtil from "../../../../../dist/array-util";

tape(__filename, t => {
    for (let i=0; i<10; ++i) {
        const arr = [];
        for (let j=0; j<i; ++j) {
            arr.push(j);
        }
        const arr2 = arrayUtil.arrayFill(arr, 99);
        //Same instance
        t.true(arr == arr2);
        for (const item of arr) {
            t.deepEqual(item, 99);
        }
    }

    t.end();
});