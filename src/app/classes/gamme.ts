import { Produit } from './produit';
import { FamilleGamme } from './famille-gamme';

export class Gamme {

    public id: number;
    public code: string;
    public description: string;
    public insulating: string;
    public frame: string;
    public finishes: string;
    public cover: string;
    public produits: Produit[];
    public familleGamme: FamilleGamme;

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

    public static newEmpty() {
        return new Gamme(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined);
    }

    public toJSON(): string {
        let plainObject = {
            id: undefined,
            code: undefined,
            description: undefined,
            insulating: undefined,
            frame: undefined,
            finishes: undefined,
            cover: undefined,
            produitsIds: [],
            familleGammeId: undefined,
        }

        plainObject.id = this.id;
        plainObject.description = this.description;
        plainObject.insulating = this.insulating;
        plainObject.frame = this.frame;
        plainObject.finishes = this.finishes;
        plainObject.cover = this.cover;
        plainObject.produitsIds = (this.produits !== undefined ? this.produits.map(x => x.id) : undefined);
        plainObject.familleGammeId = (this.familleGamme !== undefined ? this.familleGamme.id : undefined);

        return JSON.stringify(plainObject);
    }

}