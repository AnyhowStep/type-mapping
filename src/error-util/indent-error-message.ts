export function indentErrorMessage (str : string) : string {
    str = str
        .split("\n")
        .map(str => "\t" + str)
        .join("\n");
    return `(\n${str}\n)`;
}