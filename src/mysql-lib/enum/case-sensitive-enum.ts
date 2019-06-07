import {SafeMapper} from "../../mapper";
import {FluentMapper} from "../../fluent-mapper";
import {literal} from "../../fluent-lib";

/**
    TODO Handle case-insensitive enum collations

    -----

    https://dev.mysql.com/doc/refman/5.5/en/enum.html

    When retrieved, values stored into an ENUM column are displayed using the lettercase
    that was used in the column definition.

    Note that ENUM columns can be assigned a character set and collation.

    For binary or case-sensitive collations,
    lettercase is taken into account when assigning values to the column.
*/
export function caseSensitiveEnum<ElementArr extends string[]> (
    ...elements : ElementArr
) : (
    FluentMapper<SafeMapper<ElementArr[number]>>
) {
    if (elements.length > 65535) {
        throw new Error(`ENUM type can only have up to 65,535 elements`);
    }
    return literal(...elements);
}