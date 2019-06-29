export function toPropertyAccess (name : string) : string {
    if (/\s|\./.test(name)) {
        return `[${JSON.stringify(name)}]`;
    } else {
        return `.${name}`;
    }
}