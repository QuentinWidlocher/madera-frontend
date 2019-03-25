import { DossierTechnique } from './dossier-technique';
import { Projet } from './projet';
import { Ligne } from './ligne';

export class Devis {

    public _id: number;
    public _numero: number;
    public _creationDate: Date;
    public _editionDate: Date;
    public _dossiersTechniques: DossierTechnique[];
    public _projet: Projet;
    public _lignes: Ligne[];
    public get lignes(): Ligne[] {
        return this._lignes;
    }
    public set lignes(lignes: Ligne[]) {
        this._lignes = lignes;
    }

    constructor(id: number, numero: number, creationDate: Date, editionDate: Date, dossiersTechniques: DossierTechnique[],
                projet: Projet, lignes: Ligne[]) {
        this.id = id;
        this.numero = numero;
        this.creationDate = creationDate;
        this.editionDate = editionDate;
        this.dossiersTechniques = dossiersTechniques;
        this.projet = projet;
        this.lignes = lignes;
    }

    //#region getters and setters
    public get projet(): Projet {
        return this._projet;
    }
    public set projet(projet: Projet) {
        this._projet = projet;
    }

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