export function getFlags (r : RegExp) : string {
    if (typeof (r as any).flags == "string") {
        return (r as any).flags;
    }
    const match = r.toString().match(/[gimsuy]*$/);
    if (match == undefined) {
        return "";
    }
    return match[0];
}