import { DossierTechnique } from './dossier-technique';

export class Plan {

    private _id: number;
    private _number: number;
    private _creationDate: Date;
    private _editionDate: Date;
    private _dossiersTechniques: DossierTechnique[];

    constructor(id: number, number: number, creationDate: Date, editionDate: Date, dossiersTechniques: DossierTechnique[]) {
        this.id = id;
        this.number = number;
        this.creationDate = creationDate;
        this.editionDate = editionDate;
        this.dossiersTechniques = dossiersTechniques;
    }

    //#region getters and setters
    public get dossiersTechniques(): DossierTechnique[] {
        return this._dossiersTechniques;
    }
    public set dossiersTechniques(dossiersTechniques: DossierTechnique[]) {
        this._dossiersTechniques = dossiersTechniques;
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

    public get number(): number {
        return this._number;
    }
    public set number(number: number) {
        this._number = number;
    }

    public get id(): number {
        return this._id;
    }
    public set id(id: number) {
        this._id = id;
    }
    //#endregion
}