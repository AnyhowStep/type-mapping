import {SafeMapper} from "../../mapper";
import {toTypeStr, toLiteralStr} from "../../type-util";
import {pipe} from "../operator";
import {length} from "../array-like";
import {stringRepeat} from "../../string-util";
import {makeMappingError} from "../../error-util";

export function string () : SafeMapper<string> {
    return (name : string, mixed : unknown) : string => {
        if (typeof mixed != "string") {
            throw makeMappingError({
                message : `${name} must be string; received ${toTypeStr(mixed)}`,
                inputName : name,
                actualValue : mixed,
                expected : "string",
            });
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
                throw makeMappingError({
                    message : `${name} must be JSON Object string`,
                    inputName : name,
                    actualValue : str,
                    expected : "JSON Object string",
                });
            }

            try {
                JSON.parse(str);
            } catch (err) {
                throw makeMappingError({
                    message : `${name} must be valid JSON Object string; ${err.message}`,
                    inputName : name,
                    actualValue : str,
                    expected : "valid JSON Object string",
                });
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
        string(),
        length(args)
    ) as any;
}

export function stringExactLength (length : number) : SafeMapper<string> {
    return stringLength({
        min : length,
        max : length,
    });
}

export interface MatchMapperErrorDelegate {
    (name : string) : (
        | string
        | {
            message : string,
            expected : string,
        }
    );
}
export function match (regex : RegExp, errorDelegate? : MatchMapperErrorDelegate) : SafeMapper<string> {
    return pipe(
        string(),
        (name : string, mixed : string) : string => {
            if (regex.test(mixed)) {
                return mixed;
            } else {
                if (errorDelegate == undefined) {
                    throw makeMappingError({
                        message : `${name} must match ${regex.toString()}`,
                        inputName : name,
                        actualValue : mixed,
                        expected : regex.toString(),
                    });
                } else {
                    const errResult = errorDelegate(name);
                    if (typeof errResult == "string") {
                        throw makeMappingError({
                            message : errResult,
                            inputName : name,
                            actualValue : mixed,
                            expected : regex.toString(),
                        });
                    } else {
                        throw makeMappingError({
                            message : errResult.message,
                            inputName : name,
                            actualValue : mixed,
                            expected : errResult.expected,
                        });
                    }
                }
            }
        }
    );
}

export function notMatch (regex : RegExp, errorDelegate? : MatchMapperErrorDelegate) : SafeMapper<string> {
    return pipe(
        string(),
        (name : string, mixed : string) : string => {
            if (regex.test(mixed)) {
                if (errorDelegate == undefined) {
                    throw makeMappingError({
                        message : `${name} must not match ${regex.toString()}`,
                        inputName : name,
                        actualValue : mixed,
                        expected : `not ${regex.toString()}`,
                    });
                } else {
                    const errResult = errorDelegate(name);
                    if (typeof errResult == "string") {
                        throw makeMappingError({
                            message : errResult,
                            inputName : name,
                            actualValue : mixed,
                            expected : `not ${regex.toString()}`,
                        });
                    } else {
                        throw makeMappingError({
                            message : errResult.message,
                            inputName : name,
                            actualValue : mixed,
                            expected : errResult.expected,
                        });
                    }
                }
            } else {
                return mixed;
            }
        }
    );
}

/**
 *
 * Alias for `emailAddress()`
 *  @see {@link emailAddress}
 *
 * @deprecated
 */
export function email () : SafeMapper<string> {
    return emailAddress();
}

/**
 * Runs the regex `/^.+@.+$/` on the string.
 * Doesn't exactly follow a standard.
 *
 * You may roll your own email address validator,
 * but it's better to just send a confirmation
 * email to check the email address is valid.
 */
export function emailAddress () : SafeMapper<string> {
    return match(
        /^.+@.+$/,
        name => {
            return {
                message : `${name} must be an email address`,
                expected : `email address`,
            };
        }
    );
}

/**
 * + Allows empty string.
 * + Allows digits 0-9.
 * + Allows uppercase A-F.
 * + Allows lowercase a-f.
 */
export function hexadecimalString () : SafeMapper<string> {
    return match(
        /^[a-fA-F0-9]*$/,
        name => {
            return {
                message : `${name} must be a hexadecimal string`,
                expected : `hexadecimal string`,
            };
        }
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

    const blacklistStr = blacklist.map(s => toLiteralStr(s)).join(", ");
    const expected = `not ${blacklistStr}`;
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
                throw makeMappingError({
                    message : `${name} must not contain the following: ${blacklistStr}; found ${found.map(s => toLiteralStr(s)).join(", ")}`,
                    inputName : name,
                    actualValue : original,
                    expected : expected,
                });
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