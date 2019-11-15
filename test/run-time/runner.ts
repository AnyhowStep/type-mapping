import {getAllTsFiles} from "./util";
import * as tape from "tape";

const start = new Date().getTime();
const paths = getAllTsFiles(__dirname + "/input");
for (let i=0; i<paths.length; ++i) {
    const path = paths[i];
    console.log("path", i, "/", paths.length, path);
    require(path);
}

const mid = new Date().getTime();
tape(__filename, async (t) => {
    const loadTimeTaken = mid-start;
    console.log("Run-time tests loaded in", loadTimeTaken/1000.0, "s");

    const end = new Date().getTime();
    const testTimeTaken = end-mid;
    console.log("Run-time tests completed in", testTimeTaken/1000.0, "s");
    t.end();
});