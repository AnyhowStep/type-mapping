import {MappingError} from "../mapping-error";

export interface MakeMappingErrorArgs {
    /**
     * The default message of the error
     */
    message : string,

    /**
     * The name of the input
     */
    inputName : string,
    /**
     * The actual value received
     */
    actualValue : unknown,
    /**
     * A description of what kind of value is expected
     *
     * In general, you should set this to be a `string`.
     */
    expected : string|undefined,
    expectedMeta? : {
        [k : string] : unknown,
        errorCode? : string,
        mappableValues? : unknown[],
        outputValues? : unknown[],
    },

    /**
     * In general, used by `object` or `array` mappers
     */
    propertyErrors? : MappingError[],
    /**
     * In general, used by mappers like `or()`.
     * Mappers that perform union operations.
     */
    unionErrors? : MappingError[],
    /**
     * In general, used by mappers like `deepMerge()`.
     * Mappers that perform intersection operations.
     */
    intersectionErrors? : MappingError[],

    /**
     * If set to a `string`, it will overwrite the stack of the result.
     */
    stack? : string,
}
export function makeMappingError (args : MakeMappingErrorArgs) : MappingError {
    const err : MappingError = new Error(args.message) as any;
    Object.defineProperty(
        err,
        "inputName",
        {
            value : args.inputName,
            enumerable : false,
        }
    );
    Object.defineProperty(
        err,
        "actualValue",
        {
            value : args.actualValue,
            enumerable : false,
        }
    );
    Object.defineProperty(
        err,
        "expected",
        {
            value : args.expected,
            enumerable : false,
        }
    );
    Object.defineProperty(
        err,
        "expectedMeta",
        {
            value : args.expectedMeta,
            enumerable : false,
        }
    );
    if ("propertyErrors" in args) {
        Object.defineProperty(
            err,
            "propertyErrors",
            {
                value : args.propertyErrors,
                enumerable : false,
            }
        );
    }
    if ("unionErrors" in args) {
        Object.defineProperty(
            err,
            "unionErrors",
            {
                value : args.unionErrors,
                enumerable : false,
            }
        );
    }
    if ("intersectionErrors" in args) {
        Object.defineProperty(
            err,
            "intersectionErrors",
            {
                value : args.intersectionErrors,
                enumerable : false,
            }
        );
    }
    if (typeof args.stack == "string") {
        Object.defineProperty(
            err,
            "stack",
            {
                value : args.stack,
                enumerable : false,
            }
        );
    }
    return err;
}