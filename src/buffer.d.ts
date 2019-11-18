//This declaration lets us avoid using @types/node
interface Buffer extends ArrayBuffer {
    ___doesNotExist? : any;
}