import { Module } from './module';
import { Composant } from './composant';
import { Produit } from './produit';

export class CoupeDePrincipe {

    public id: number;
    public code: string;
    public name: string;
    public description: string;
    public thickness: number;
    public modules: Module[];
    public produits: Produit[];

    constructor(id: number, code: string, name: string, description: string, thickness: number,
                modules: Module[], produits: Produit[]) {
        this.id = id;
        this.code = code;
        this.name = name;
        this.description = description;
        this.thickness = thickness;
        this.modules = modules;
        this.produits = produits;
    }

    public static newEmpty() {
        return new CoupeDePrincipe(undefined, undefined, undefined, undefined, undefined, undefined, undefined);
    }

    public toJSON(): string {
        let plainObject = {
            id: undefined,
            code: undefined,
            name: undefined,
            description: undefined,
            thickness: undefined,
        }

        plainObject.id = this.id;
        plainObject.code = this.code;
        plainObject.name = this.name;
        plainObject.description = this.description;
        plainObject.thickness = this.thickness;

        return JSON.stringify(plainObject);
    }

}