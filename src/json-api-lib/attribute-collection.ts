import {SafeMapper} from "../mapper";
import {FluentMapper} from "../fluent-mapper";
import * as fLib from "../fluent-lib";

/**
 *  @see {@link attributeCollection}
 */
export interface AttributeCollection {
    /**
     * The JSON:API spec outlines many restrictions on field names of an `AttributeCollection`.
     *
     * However, we do not implement any of them at the moment.
     *
     * @todo Implement restrictions on field names?
     *
     */
    [field : string] : unknown;
}
/**
 * Must be a plain-old-JavaScript-object in this implementation
 *
 * -----
 *
 * https://jsonapi.org/format/1.0/#document-resource-object-attributes
 *
 * The value of the `attributes` key **MUST** be an object (an “attributes object”).
 * Members of the attributes object (“attributes”) represent information about the resource object in which it’s defined.
 *
 * Attributes may contain any valid JSON value.
 *
 * Complex data structures involving JSON objects and arrays are allowed as attribute values.
 * However, any object that constitutes or is contained in an attribute **MUST NOT**
 * contain a `relationships` or `links` member, as those members are reserved by this specification for future use.
 *
 * Although has-one foreign keys (e.g. `author_id`) are often stored internally alongside other
 * information to be represented in a resource object, these keys **SHOULD NOT** appear as attributes.
 *
 * -----
 *
 * https://jsonapi.org/format/1.0/#document-resource-object-fields
 *
 * A resource object’s attributes and its relationships are collectively called its “fields”.
 *
 * Fields for a resource object **MUST** share a common namespace with each other and with `type` and `id`.
 * In other words, a resource can not have an attribute and relationship with the same name,
 * nor can it have an attribute or relationship named `type` or `id`.
 *
 * -----
 *
 * https://jsonapi.org/format/1.0/#document-member-names
 *
 * All member names used in a JSON:API document **MUST** be treated as
 * case sensitive by clients and servers, and they **MUST** meet all of the following conditions:
 *
 * + Member names **MUST** contain at least one character.
 * + Member names **MUST** contain only the allowed characters listed below.
 * + Member names **MUST** start and end with a “globally allowed character”, as defined below.
 *
 * To enable an easy mapping of member names to URLs,
 * it is **RECOMMENDED** that member names use only non-reserved,
 * URL safe characters specified in [RFC 3986](http://tools.ietf.org/html/rfc3986#page-13).
 *
 * ### Allowed Characters
 *
 * The following “globally allowed characters” **MAY** be used anywhere in a member name:
 *
 * + U+0061 to U+007A, “a-z”
 * + U+0041 to U+005A, “A-Z”
 * + U+0030 to U+0039, “0-9”
 * + U+0080 and above (non-ASCII Unicode characters; not recommended, not URL safe)
 *
 * Additionally, the following characters are allowed in member names, except as the first or last character:
 *
 * + U+002D HYPHEN-MINUS, “-“
 * + U+005F LOW LINE, “_”
 * + U+0020 SPACE, “ “ (not recommended, not URL safe)
 *
 *
 * ### Reserved Characters
 *
 * The following characters **MUST NOT** be used in member names:
 *
 * + U+002B PLUS SIGN, “+” (used for ordering)
 * + U+002C COMMA, “,” (used as a separator between relationship paths)
 * + U+002E PERIOD, “.” (used as a separator within relationship paths)
 * + U+005B LEFT SQUARE BRACKET, “[” (used in sparse fieldsets)
 * + U+005D RIGHT SQUARE BRACKET, “]” (used in sparse fieldsets)
 * + U+0021 EXCLAMATION MARK, “!”
 * + U+0022 QUOTATION MARK, ‘”’
 * + U+0023 NUMBER SIGN, “#”
 * + U+0024 DOLLAR SIGN, “$”
 * + U+0025 PERCENT SIGN, “%”
 * + U+0026 AMPERSAND, “&”
 * + U+0027 APOSTROPHE, “’”
 * + U+0028 LEFT PARENTHESIS, “(“
 * + U+0029 RIGHT PARENTHESIS, “)”
 * + U+002A ASTERISK, “*”
 * + U+002F SOLIDUS, “/”
 * + U+003A COLON, “:”
 * + U+003B SEMICOLON, “;”
 * + U+003C LESS-THAN SIGN, “<”
 * + U+003D EQUALS SIGN, “=”
 * + U+003E GREATER-THAN SIGN, “>”
 * + U+003F QUESTION MARK, “?”
 * + U+0040 COMMERCIAL AT, “@”
 * + U+005C REVERSE SOLIDUS, “\”
 * + U+005E CIRCUMFLEX ACCENT, “^”
 * + U+0060 GRAVE ACCENT, “`”
 * + U+007B LEFT CURLY BRACKET, “{“
 * + U+007C VERTICAL LINE, “|”
 * + U+007D RIGHT CURLY BRACKET, “}”
 * + U+007E TILDE, “~”
 * + U+007F DELETE
 * + U+0000 to U+001F (C0 Controls)
 *
 *  @see {@link pojo}
 *  @see {@link AttributeCollection}
 *
 * -----
 *
 * The JSON:API spec outlines many restrictions on field names of an `AttributeCollection`.
 *
 * However, we do not implement any of them at the moment.
 *
 * @todo Implement restrictions on field names?
 *
 */
export const attributeCollection : () => FluentMapper<SafeMapper<AttributeCollection>> = fLib.pojo;
