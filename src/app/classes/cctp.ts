import { Produit } from './produit';

export class CCTP {

    private _id: number;
    private _code: string;
    private _description: string;
    private _feature: string;
    private _produits: Produit[];

    constructor(id: number, code: string, description: string, feature: string, produits: Produit[]) {
        this.id = id;
        this.code = code;
        this.description = description;
        this.feature = feature;
        this.produits = produits;
    }

    //#region getters and setters
    public get produits(): Produit[] {
        return this._produits;
    }
    public set produits(produits: Produit[]) {
        this._produits = produits;
    }

    public get feature(): string {
        return this._feature;
    }
    public set feature(feature: string) {
        this._feature = feature;
    }

    public get description(): string {
        return this._description;
    }
    public set description(description: string) {
        this._description = description;
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