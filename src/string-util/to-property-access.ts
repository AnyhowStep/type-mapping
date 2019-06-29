export function toPropertyAccess (name : number|string) : string {
    if (typeof name == "number") {
        return `[${name}]`;
    }

    if (/\s|\.|\-/.test(name)) {
        return `[${JSON.stringify(name)}]`;
    }

    if (/^\d+$/.test(name)) {
        return `[${name}]`;
    }

    if (/^\d+/.test(name)) {
        return `[${JSON.stringify(name)}]`;
    }

    return `.${name}`;
}