export function stringRepeat (str : string, count : number) : string {
    let result = "";
    for (let i=0; i<count; ++i) {
        result += str;
    }
    return result;
}