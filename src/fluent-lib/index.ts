import * as nonGeneric from "./non-generic";
import * as generic from "./generic";
import * as mysql from "../mysql-lib";

const fluentExport = {
    ...nonGeneric,
    ...generic,
    mysql,
};
export = fluentExport;