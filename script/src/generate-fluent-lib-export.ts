import * as generic from "../../src/fluent-lib/generic";
import * as nonGeneric from "../../src/fluent-lib/non-generic";
import * as fs from "fs";

const genericKeys = Object.keys(generic);
const nonGenericKeys = Object.keys(nonGeneric)
    .filter(k => genericKeys.indexOf(k) < 0)
    .filter(k => k != "null");
const str = `
import {null as nil} from "./non-generic";
export {
    nil as null,
};
/**
    Export generated with \`npm run generate-fluent-lib-export\`

    The export generation script is needed because of this,
    https://github.com/microsoft/TypeScript/issues/31824
*/
export {
    ${nonGenericKeys.join(",\n    ") + ","}
} from "./non-generic";
export * from "./generic";
import * as mysql from "../mysql-lib";
export {
    mysql,
};
export * from "../field-map";
export * from "../decorator";
`;
console.log(str);
const fluentLibIndexFile = __dirname + "/../../src/fluent-lib/index.ts";
fs.writeFileSync(fluentLibIndexFile, str);
console.log("Wrote export to", fluentLibIndexFile);