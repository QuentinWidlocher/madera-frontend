import { Produit } from './produit';
import { FamilleGamme } from './famille-gamme';

export class Gamme {

    private _id: number;
    private _code: string;
    private _description: string;
    private _insulating: string;
    private _frame: string;
    private _finishes: string;
    private _cover: string;
    private _produits: Produit[];
    private _familleGamme: FamilleGamme;

    constructor(id: number, code: string, description: string, insulating: string, frame: string, finishes: string, cover: string,
                produits: Produit[], familleGame: FamilleGamme) {
        this.id = id;
        this.code = code;
        this.description = description;
        this.insulating = insulating;
        this.frame = frame;
        this.finishes = finishes;
        this.cover = cover;
        this.produits = produits;
        this.familleGamme = familleGame;
    }

    //#region getters and setters
    public get familleGamme(): FamilleGamme {
        return this._familleGamme;
    }
    public set familleGamme(familleGamme: FamilleGamme) {
        this._familleGamme = familleGamme;
    }

    public get produits(): Produit[] {
        return this._produits;
    }
    public set produits(produits: Produit[]) {
        this._produits = produits;
    }

    public get cover(): string {
        return this._cover;
    }
    public set cover(cover: string) {
        this._cover = cover;
    }

    public get finishes(): string {
        return this._finishes;
    }
    public set finishes(finishes: string) {
        this._finishes = finishes;
    }

    public get frame(): string {
        return this._frame;
    }
    public set frame(frame: string) {
        this._frame = frame;
    }

    public get insulating(): string {
        return this._insulating;
    }
    public set insulating(insulating: string) {
        this._insulating = insulating;
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