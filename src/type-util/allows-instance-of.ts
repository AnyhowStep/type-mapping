export function allowsInstanceOf (ctor : any) : boolean {
    try {
        ({} instanceof ctor);
        return true;
    } catch (e) {
        return false;
    }
}