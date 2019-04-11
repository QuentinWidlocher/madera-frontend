export class DeferredQuery {

    public data: object;
    public method: string;
    public type: string;

    constructor(data: object, method: string, type: string) {
        this.data = data;
        this.method = method;
        this.type = type;
    }
}