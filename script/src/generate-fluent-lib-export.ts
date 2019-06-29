import * as generic from "../../src/fluent-lib/generic";
import * as nonGeneric from "../../src/fluent-lib/non-generic";
import * as fs from "fs";

const genericKeys = Object.keys(generic);
const nonGenericKeys = Object.keys(nonGeneric)
    .filter(k => genericKeys.indexOf(k) < 0)
    .filter(k => k != "null");
const str = `
/// <reference path="../buffer.d.ts" />
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
export * from "./field-map-ctor";

import * as EnumUtil from "../enum-util";
export {EnumUtil};
import * as BigIntUtil from "../bigint-util";
export {BigIntUtil};
export * from "../decorator";
import * as ErrorUtil from "../error-util";
export {ErrorUtil};
export * from "../field";
import * as jsonApi from "../json-api-lib";
export {jsonApi};
export * from "../mapper";
import * as mysql from "../mysql-lib";
export {mysql};
import * as TypeUtil from "../type-util";
export {TypeUtil};
export * from "../fluent-mapper";
export * from "../mapping-error";
export * from "../primitive";
`;
console.log(str);
const fluentLibIndexFile = __dirname + "/../../src/fluent-lib/index.ts";
fs.writeFileSync(fluentLibIndexFile, str);
console.log("Wrote export to", fluentLibIndexFile);