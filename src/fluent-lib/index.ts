import * as nonGeneric from "./non-generic";
import * as generic from "./generic";

const fluentExport = {
    ...nonGeneric,
    ...generic,
};
export = fluentExport;