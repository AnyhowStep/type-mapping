import {MappingError} from "../mapping-error";

export function tryGetPropertyError (
    mappingError : MappingError,
    inputName : string
) : MappingError|undefined {
    if (mappingError.propertyErrors == undefined) {
        return undefined;
    }
    for (const propertyError of mappingError.propertyErrors) {
        if (propertyError.inputName == inputName) {
            return propertyError;
        }
    }
    return undefined;
}