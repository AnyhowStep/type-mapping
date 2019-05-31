export function setFunctionName (f : Function, name : string|undefined) {
    if (typeof name != "string") {
        name = "";
    }
    (f as any).name = name;
    Object.defineProperty(f, "name", { value : name });
}