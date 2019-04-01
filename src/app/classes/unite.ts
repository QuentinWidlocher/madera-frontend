import { Caracteristique } from './caracteristique';

export class Unite {

    private _id: number;
    private _code: string;
    private _name: string;
    private _caracteristiques: Caracteristique[];

    constructor(id: number, code: string, name: string, caracteristiques: Caracteristique[]) {
        this.id = id;
        this.code = code;
        this.name = name;
        this.caracteristiques = caracteristiques;
    }

    //#region getters and setters
    public get caracteristiques(): Caracteristique[] {
        return this._caracteristiques;
    }
    public set caracteristiques(caracteristiques: Caracteristique[]) {
        this._caracteristiques = caracteristiques;
    }

    public get name(): string {
        return this._name;
    }
    public set name(name: string) {
        this._name = name;
    }

    public get code(): string {
        return this._code;
    }
    public set code(code: string) {
        this._code = code;
    }

    public get id(): number {
        return this._id;
    }
    public set id(id: number) {
        this._id = id;
    }
    //#endregion
}