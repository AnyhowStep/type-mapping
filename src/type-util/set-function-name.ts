export function setFunctionName (f : Function, name : string) {
    (f as any).name = name;
    Object.defineProperty(f, "name", { value : name });
}