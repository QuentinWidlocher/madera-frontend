import { Produit } from './produit';
import { Caracteristique } from './caracteristique';
import { CoupeDePrincipe } from './coupe-de-principe';
import { Composant } from './composant';

export class Module {
    public id: number;
    public description: string;
    public creationDate: Date;
    public editionDate: Date;
    public produits: Produit[];
    public caracteristiques: Caracteristique[];
    public composants: Composant[];
    public coupeDePrincipe: CoupeDePrincipe;

    constructor(id: number, description: string, creationDate: Date, editionDate: Date, produits: Produit[],
                caracteristiques: Caracteristique[], composants: Composant[], coupeDePrincipe: CoupeDePrincipe) {
        this.id = id;
        this.description = description;
        this.creationDate = creationDate;
        this.editionDate = editionDate;
        this.produits = produits;
        this.caracteristiques = caracteristiques;
        this.composants = composants;
        this.coupeDePrincipe = coupeDePrincipe;
    }

    public static newEmpty() {
        return new Module(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined);
    }

    public toJSON(): string {
        let plainObject = {
            id: undefined,
            description: undefined,
            creationDate: undefined,
            editionDate: undefined,
            produitModule: [],
        }

        plainObject.id = this.id;
        plainObject.description = this.description;
        plainObject.creationDate = (this.creationDate !== undefined ? this.creationDate.toISOString().slice(0, 19).replace('T', ' ') : undefined);
        plainObject.editionDate = (this.editionDate !== undefined ? this.editionDate.toISOString().slice(0, 19).replace('T', ' ') : undefined);
        this.produits.forEach(produit => {
            plainObject.produitModule.push({
                produitId: produit.id,
                moduleId: this.id
            })
        });

        return JSON.stringify(plainObject);
    }

}