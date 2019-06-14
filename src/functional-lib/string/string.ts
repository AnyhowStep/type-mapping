import {SafeMapper} from "../../mapper";
import {toTypeStr} from "../../type-util";
import {pipe} from "../operator";
import {length} from "../array-like";
import {stringRepeat} from "../../string-util";

export function string () : SafeMapper<string> {
    return (name : string, mixed : unknown) : string => {
        if (typeof mixed != "string") {
            throw new Error(`${name} must be string; received ${toTypeStr(mixed)}`);
        }
        return mixed;
    };
}

/**
    Calls `JSON.parse()` once.
*/
export function jsonObjectString () : SafeMapper<string> {
    return pipe(
        string(),
        (name : string, str : string) : string => {
            if (!/^\s*\{/.test(str)) {
                throw new Error(`${name} must be JSON Object string`);
            }

            try {
                JSON.parse(str);
            } catch (err) {
                throw new Error(`${name} must be JSON Object string; ${err.message}`);
            }

            return str;
        }
    );
}

export function stringLength (args : {
    min? : number,
    max? : number,
}) : SafeMapper<string> {
    return pipe(
        length(args),
        string()
    );
}

export function stringExactLength (length : number) : SafeMapper<string> {
    return stringLength({
        min : length,
        max : length,
    });
}

export function match (regex : RegExp, errorMessageDelegate? : (name : string) => string) : SafeMapper<string> {
    return pipe(
        string(),
        (name : string, mixed : string) : string => {
            if (regex.test(mixed)) {
                return mixed;
            } else {
                if (errorMessageDelegate == undefined) {
                    throw new Error(`${name} must match ${regex.source}`);
                } else {
                    throw new Error(errorMessageDelegate(name));
                }
            }
        }
    );
}

export function notMatch (regex : RegExp, errorMessageDelegate? : (name : string) => string) : SafeMapper<string> {
    return pipe(
        string(),
        (name : string, mixed : string) : string => {
            if (regex.test(mixed)) {
                if (errorMessageDelegate == undefined) {
                    throw new Error(`${name} must not match ${regex.source}`);
                } else {
                    throw new Error(errorMessageDelegate(name));
                }
            } else {
                return mixed;
            }
        }
    );
}

/**
    Alias for `emailAddress()`
    @see emailAddress
*/
export function email () : SafeMapper<string> {
    return emailAddress();
}

/**
    Runs the regex `/^.+@.+$/` on the string.
    Doesn't exactly follow a standard.

    You may roll your own email address validator,
    but it's better to just send a confirmation
    email to check the email address is valid.
*/
export function emailAddress () : SafeMapper<string> {
    return match(
        /^.+@.+$/,
        name => `${name} must be an email address`
    );
}

/**
    + Allows empty string.
    + Allows digits 0-9.
    + Allows uppercase A-F.
    + Allows lowercase a-f.
*/
export function hexadecimalString () : SafeMapper<string> {
    return match(
        /^[a-fA-F0-9]*$/,
        name => `${name} must be a hexadecimal string`
    );
}

export function toUpperCase () : SafeMapper<string> {
    return pipe(
        string(),
        (_name : string, str : string) : string => {
            return str.toUpperCase();
        }
    )
}

export function toLowerCase () : SafeMapper<string> {
    return pipe(
        string(),
        (_name : string, str : string) : string => {
            return str.toLowerCase();
        }
    )
}

//The `char` must be a single character or an error is thrown
export function padLeft (minLength : number, char : string) : SafeMapper<string> {
    if (char.length != 1) {
        throw new Error(`"char" must be one character; received ${char}`);
    }
    return pipe(
        string(),
        (_name : string, str : string) : string => {
            if (str.length >= minLength) {
                return str;
            }
            return stringRepeat(char, minLength - str.length) + str;
        }
    );
}

//The `char` must be a single character or an error is thrown
export function padRight (minLength : number, char : string) : SafeMapper<string> {
    if (char.length != 1) {
        throw new Error(`"char" must be one character; received ${char}`);
    }
    return pipe(
        string(),
        (_name : string, str : string) : string => {
            if (str.length >= minLength) {
                return str;
            }
            return str + stringRepeat(char, minLength - str.length);
        }
    );
}

export function subStringBlacklist (blacklist : string[], configuration : {
    //Defaults to false
    caseInsensitive? : boolean
} = {}) : SafeMapper<string> {
    //We do not mind === here.
    const caseInsensitive = (configuration.caseInsensitive === true);

    if (caseInsensitive) {
        blacklist = blacklist.map(
            subString => subString.toLowerCase()
        );
    }
    return pipe(
        string(),
        (name : string, original : string) : string => {
            const str = caseInsensitive ?
                original.toLowerCase() :
                original;

            const found : string[] = [];
            for (const subString of blacklist) {
                if (str.indexOf(subString) >= 0) {
                    found.push(subString);
                }
            }

            if (found.length == 0) {
                return original;
            } else {
                throw new Error(`${name} must not contain the following: ${blacklist.join(", ")}; found ${found.join(", ")}`);
            }
        }
    );
}

export function toTrimmed () : SafeMapper<string> {
    return pipe(
        string(),
        (_name : string, str : string) => {
            return str.trim();
        }
    );
}