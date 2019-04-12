export class DeferredQuery {

    public data: object;
    public method: string;
    public type: string;
    public date: number;

    constructor(data: object, method: string, type: string) {
        this.data = data;
        this.method = method.toLowerCase();
        this.type = type.toLowerCase();
        this.date = Date.now();
    }
}