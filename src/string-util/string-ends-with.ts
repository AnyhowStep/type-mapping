export function stringEndsWith (str : string, suffix : string) : boolean {
    if (str.length < suffix.length) {
        return false;
    }
    if (str.length == suffix.length) {
        return (str == suffix);
    }

    for (let i=0; i<suffix.length; ++i) {
        const suffixChar = suffix[suffix.length - i - 1];
        const strChar = str[str.length - i - 1];
        if (suffixChar != strChar) {
            return false;
        }
    }
    return true;
}