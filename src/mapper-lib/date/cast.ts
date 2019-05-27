import {cast} from "../operator";
import {string} from "../string";
import {instanceOfDate} from "./instance-of-date";
import {integer} from "../number";

export function stringToDate () {
    return cast(
        string(),
        str => new Date(str),
        instanceOfDate()
    );
}

/**
    Convert the number of seconds since the Unix Epoch
    to a `Date`.


    The Unix Epoch is January 1st, 1970 at UTC.
*/
export function unixTimestampSecondsToDate () {
    return cast(
        integer(),
        //Multiply by 1000 because `Date` ctor expects
        //milliseconds since Unix Epoch
        num => new Date(num * 1000),
        instanceOfDate()
    );
}

/**
    Convert the number of milliseconds since the Unix Epoch
    to a `Date`.


    The Unix Epoch is January 1st, 1970 at UTC.
*/
export function unixTimestampMillisecondsToDate () {
    return cast(
        integer(),
        num => new Date(num),
        instanceOfDate()
    );
}