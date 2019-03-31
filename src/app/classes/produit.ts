import { Modele } from './modele';

export class Produit {
    private _id: number;
    private _description: string;
    private _creationDate: Date;
    private _editionDate: Date;
    private _modeles: Modele[];

    constructor(id: number, description: string, creationDate: Date, editionDate: Date, modeles: Modele[]) {
        this.id = id;
        this.description = description;
        this.creationDate = creationDate;
        this.editionDate = editionDate;
        this.modeles = modeles;
    }

    //#region getters and setters
    public get modeles(): Modele[] {
        return this._modeles;
    }
    public set modeles(modeles: Modele[]) {
        this._modeles = modeles;
    }
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
    public get description(): string {
        return this._description;
    }
    public set description(description: string) {
        this._description = description;
    }
    public get id(): number {
        return this._id;
    }
    public set id(id: number) {
        this._id = id;
    }
    //#endregion
}