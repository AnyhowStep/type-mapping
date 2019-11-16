function toKeyEnum<ArrT extends string[]> (...arr : ArrT) : { [k in ArrT[number]] : k } {
    return arr.reduce(
        (memo, k : ArrT[number]) => {
            memo[k] = k;
            return memo;
        },
        {} as { [k in ArrT[number]] : k }
    );
}
/**
 * @todo More error codes
 */
export const ErrorCode = toKeyEnum(
    /**
     * + `expectedMeta.gt`
     */
    "EXPECTED_GREATER_THAN",

    /**
     * + `expectedMeta.lt`
     */
    "EXPECTED_LESS_THAN",

    /**
     * + `expectedMeta.gtEq`
     */
    "EXPECTED_GREATER_THAN_OR_EQUAL_TO",

    /**
     * + `expectedMeta.ltEq`
     */
    "EXPECTED_LESS_THAN_OR_EQUAL_TO",

    /**
     * + `expected`
     */
    "EXPECTED_TYPE",

    /**
     * + `expectedMeta.min`
     * + `expectedMeta.max`
     */
    "EXPECTED_LENGTH",

    /**
     * + `expectedMeta.min`
     * + `expectedMeta.max`
     */
    "EXPECTED_BYTE_LENGTH",

    /**
     * + `expectedMeta.mappableValue`
     * + `expectedMeta.outputValue`
     * + `expectedMeta.entries`
     */
    "EXPECTED_ENUM_KEY",

    /**
     * + `expectedMeta.mappableValue`
     * + `expectedMeta.outputValue`
     * + `expectedMeta.entries`
     */
    "EXPECTED_ENUM_VALUE",

    /**
     * + `expectedMeta.mappableValue`
     * + `expectedMeta.outputValue`
     * + `expectedMeta.desiredValue`
     * + `expectedMeta.validKeys`
     */
    "EXPECTED_ONE_ENUM_VALUE_OR_VALID_ENUM_KEY",

    /**
     * + `expectedMeta.maxPrecision`
     * + `expectedMeta.maxScale`
     * + `expectedMeta.curPrecision`
     * + `expectedMeta.curScale`
     */
    "EXPECTED_DECIMAL_PRECISION_LESS_THAN_OR_EQUAL_TO",
    /**
     * + `expectedMeta.maxPrecision`
     * + `expectedMeta.maxScale`
     * + `expectedMeta.curPrecision`
     * + `expectedMeta.curScale`
     */
    "EXPECTED_DECIMAL_SCALE_LESS_THAN_OR_EQUAL_TO",
);