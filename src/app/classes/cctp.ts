import { Produit } from './produit';

export class CCTP {

    public id: number;
    public code: string;
    public description: string;
    public feature: string;
    public produits: Produit[];

    constructor(id: number, code: string, description: string, feature: string, produits: Produit[]) {
        this.id = id;
        this.code = code;
        this.description = description;
        this.feature = feature;
        this.produits = produits;
    }

    public static newEmpty(): CCTP {
        return new CCTP(undefined, undefined, undefined, undefined, undefined);
    }

}