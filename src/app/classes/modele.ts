import { DossierTechnique } from './dossier-technique';
import { Utilisateur } from './utilisateur';
import { Produit } from './produit';

export class Modele {
    private _id: number;
    private _description: string;
    private _creationDate: Date;
    private _editionDate: Date;
    private _dossiersTechniques: DossierTechnique[];
    private _produits: Produit[];
    private _utilisateur: Utilisateur;

    constructor(id: number, description: string, creationDate: Date, editionDate: Date, dossiersTechniques: DossierTechnique[],
                produits: Produit[], utilisateur: Utilisateur) {
        this.id = id;
        this.description = description;
        this.creationDate = creationDate;
        this.editionDate = editionDate;
        this.dossiersTechniques = dossiersTechniques;
        this.produits = produits;
        this.utilisateur = utilisateur;
    }

    //#region getters and setters
    public get produits(): Produit[] {
        return this._produits;
    }
    public set produits(produits: Produit[]) {
        this._produits = produits;
    }
    public get utilisateur(): Utilisateur {
        return this._utilisateur;
    }
    public set utilisateur(utilisateur: Utilisateur) {
        this._utilisateur = utilisateur;
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