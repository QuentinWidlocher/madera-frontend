import { Produit } from './produit';
import { Caracteristique } from './caracteristique';

export class Module {
    private _id: number;
    private _description: string;
    private _creationDate: Date;
    private _editionDate: Date;
    private _produits: Produit[];
    private _caracteristiques: Caracteristique[];

    constructor(id: number, description: string, creationDate: Date, editionDate: Date, produits: Produit[],
                caracteristiques: Caracteristique[]) {
        this.id = id;
        this.description = description;
        this.creationDate = creationDate;
        this.editionDate = editionDate;
        this.produits = produits;
        this.caracteristiques = caracteristiques;
    }

    //#region getters and setters
    public get caracteristiques(): Caracteristique[] {
        return this._caracteristiques;
    }
    public set caracteristiques(caracteristiques: Caracteristique[]) {
        this._caracteristiques = caracteristiques;
    }

    public get produits(): Produit[] {
        return this._produits;
    }
    public set produits(produits: Produit[]) {
        this._produits = produits;
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