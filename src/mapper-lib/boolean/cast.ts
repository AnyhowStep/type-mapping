import {cast, or} from "../operator";
import {finiteNumber} from "../number";
import {boolean} from "./boolean";
import {string} from "../string";
import {pipe} from "../operator";
import {literal} from "../literal";

/**
    + Zero is false
    + All other finite number values are true
*/
export function finiteNumberToBoolean () {
    return cast(
        finiteNumber(),
        num => (num != 0),
        boolean()
    );
}

/**
    + `"1"` is true
    + `/^true$/i` is true
    + All other string values are false

    TODO Is this a good convention?
*/
export function stringToBoolean () {
    return cast(
        string(),
        str => (str == "1" || str.toLowerCase() == "true"),
        boolean()
    );
}

/**
    + Zero is false
    + All other finite number values are true
*/
export function finiteNumberToTrue () {
    return pipe(
        finiteNumberToBoolean(),
        literal(true)
    );
}

/**
    + Zero is false
    + All other finite number values are true
*/
export function finiteNumberToFalse () {
    return pipe(
        finiteNumberToBoolean(),
        literal(false)
    );
}

/**
    + `"1"` is true
    + `/^true$/i` is true
    + All other string values are false

    TODO Is this a good convention?
*/
export function stringToTrue () {
    return pipe(
        stringToBoolean(),
        literal(true)
    );
}

/**
    + `"1"` is true
    + `/^true$/i` is true
    + All other string values are false

    TODO Is this a good convention?
*/
export function stringToFalse () {
    return pipe(
        stringToBoolean(),
        literal(false)
    );
}

/**
    Uses `stringToBoolean()` and `finiteNumberToBoolean()` internally
*/
export function toBoolean () {
    return or(
        stringToBoolean(),
        finiteNumberToBoolean()
    );
}
/**
    Uses `stringToTrue()` and `finiteNumberToTrue()` internally
*/
export function toTrue () {
    return or(
        stringToTrue(),
        finiteNumberToTrue()
    );
}
/**
    Uses `stringToFalse()` and `finiteNumberToFalse()` internally
*/
export function toFalse () {
    return or(
        stringToFalse(),
        finiteNumberToFalse()
    );
}