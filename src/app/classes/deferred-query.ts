export class DeferredQuery {

    private _data: object;
    private _method: string;
    private _type: string;

    constructor(data: object, method: string, type: string) {
        this.data = data;
        this.method = method;
        this.type = type;
    }

    public get type(): string {
        return this._type;
    }
    public set type(type: string) {
        this._type = type;
    }
    public get method(): string {
        return this._method;
    }
    public set method(method: string) {
        this._method = method;
    }
    public get data(): object {
        return this._data;
    }
    public set data(data: object) {
        this._data = data;
    }
}