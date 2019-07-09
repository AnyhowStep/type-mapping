export interface MappingError extends Error {
    /**
     * The name of the input
     */
    inputName : string,
    /**
     * If the property is missing, we don't know what the actual value is.
     * If the propery is set to `undefined`, the actual value is `undefined`
     */
    actualValue? : unknown,
    /**
     * A description of what kind of value is expected
     */
    expected? : string,
    /**
     * Metadata about the expected value.
     *
     * e.g. `gtEq`, `ltEq`
     */
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
}