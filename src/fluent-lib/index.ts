import * as generic from "./generic";
import * as nonGeneric from "./non-generic";

const fluentExport = {
    ...generic,
    ...nonGeneric,
};
export = fluentExport;