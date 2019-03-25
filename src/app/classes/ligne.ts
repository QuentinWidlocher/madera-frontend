import { Devis } from './devis';

export class Ligne {

    public _id: number;
    public _quantite: number;
    public _remise: number;
    public _remarques: string;
    public _devis: Devis;

    constructor(id: number, quantite: number, remise: number, remarques: string, devis: Devis) {
        this.id = id;
        this.quantite = quantite;
        this.remise = remise;
        this.remarques = remarques;
        this.devis = devis;
    }

    //#region getter and setters
    public get devis(): Devis {
        return this._devis;
    }
    public set devis(devis: Devis) {
        this._devis = devis;
    }

    public get remarques(): string {
        return this._remarques;
    }
    public set remarques(remarques: string) {
        this._remarques = remarques;
    }

    public get remise(): number {
        return this._remise;
    }
    public set remise(remise: number) {
        this._remise = remise;
    }

    public get quantite(): number {
        return this._quantite;
    }
    public set quantite(quantite: number) {
        this._quantite = quantite;
    }

    public get id(): number {
        return this._id;
    }
    public set id(id: number) {
        this._id = id;
    }

    //#endregion
}