export class DossierTechnique {

    public _id: number;
    public _numero: number;
    public _creationDate: Date;
    public _editionDate: Date;

    constructor(id: number, numero: number, creationDate: Date, editionDate: Date) {
        this.id = id;
        this.numero = numero;
        this.creationDate = creationDate;
        this.editionDate = editionDate;
    }

    //#region getters and setters
    public get editionDate(): Date {
        return this._editionDate;
    }
    public set editionDate(editionDate: Date) {
        this._editionDate = editionDate;
    }

    public get creationDate(): Date {
        return this._creationDate;
    }
    public set creationDate(creationDate: Date) {
        this._creationDate = creationDate;
    }

    public get numero(): number {
        return this._numero;
    }
    public set numero(numero: number) {
        this._numero = numero;
    }

    public get id(): number {
        return this._id;
    }
    public set id(id: number) {
        this._id = id;
    }
    //#endregion
}