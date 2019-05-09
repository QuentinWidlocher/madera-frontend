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


}
