import {cast} from "../operator";
import {string} from "../string";
import {instanceOfDate} from "./instance-of-date";
import {integer} from "../number";

/**
    Unsafe because it just uses `new Date(str)`
    to convert to a `Date`.

    This may have surprising results.
    ```ts
    new Date("1").getTime() === 978325200000
    ```
*/
export function unsafeStringToDate () {
    return cast(
        string(),
        str => new Date(str),
        instanceOfDate()
    );
}

/**
    Feel free to specify your own `Date` parsing function,
    using any JS Date library you want.

    It is safe for `dateParser` to throw `Error`s.

    Do not use `Date.parse(str)` or `new Date(str)`
    as implementations vary wildly.

    If you wish to use either of those,
    use `unsafeStringToDate()` instead.
*/
export function dateToString (dateParser : (str : string) => Date) {
    return cast(
        string(),
        str => dateParser(str),
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