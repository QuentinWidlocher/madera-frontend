import { Produit } from './produit';
import { Module } from './module';

export class CCTP {

    public id: number;
    public code: string;
    public description: string;
    public feature: string;
    public produits: Produit[];
    public modules: Module[];

    constructor(id: number, code: string, description: string, feature: string, produits: Produit[], modules: Module[]) {
        this.id = id;
        this.code = code;
        this.description = description;
        this.feature = feature;
        this.produits = produits;
        this.modules = modules;
    }

    public static newEmpty(): CCTP {
        return new CCTP(undefined, undefined, undefined, undefined, undefined, undefined);
    }

    public toJSON(): string {
        let plainObject = {
            id: undefined,
            code: undefined,
            description: undefined,
            feature: undefined,
        }

        plainObject.id = this.id;
        plainObject.code = this.code;
        plainObject.description = this.description;
        plainObject.feature = this.feature;

        return JSON.stringify(plainObject);
    }

}