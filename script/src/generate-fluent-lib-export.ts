import * as generic from "../../dist/fluent-lib/generic";
import nonGeneric = require("../../dist/fluent-lib/non-generic");
import {array} from "../../dist/fluent-lib/non-generic";

const genericKeys = Object.keys(generic);
const nonGenericKeys = Object.keys(nonGeneric)
    .filter(k => genericKeys.indexOf(k) < 0)
    .filter(k => k != "null");
console.log(genericKeys, nonGenericKeys, Object.keys(nonGeneric), nonGeneric.array, array);
console.log(`
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
`);
