import {SafeMapper} from "../../mapper";
import {FluentMapper} from "../../fluent-mapper";
import {
    array,
    notMatch,
    string,
} from "../../fluent-lib";

/**
    TODO Handle case-insensitive set collations

    -----

    https://dev.mysql.com/doc/refman/5.5/en/set.html

    When retrieved, values stored in a SET column are displayed using the lettercase
    that was used in the column definition.

    Note that SET columns can be assigned a character set and collation.

    For binary or case-sensitive collations,
    lettercase is taken into account when assigning values to the column.
*/
export function caseSenstiveSet<ElementArr extends string[]> (
    ...elements : ElementArr
) : FluentMapper<SafeMapper<string>> {
    if (elements.length > 64) {
        throw new Error(`SET type can only have up to 64 elements`);
    }
    array(notMatch(
        /\,/,
        name => `${name} must not have comma`
    ))("elements", elements);
    return string().pipe(
        (name : string, raw : string) : string => {
            const arr = raw.split(",");
            for (let e of arr) {
                if (elements.indexOf(e) < 0) {
                    throw new Error(`${name} has unknown set element; ${e}`);
                }
            }
            return raw;
        }
    );
}