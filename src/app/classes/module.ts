import { Produit } from './produit';
import { Caracteristique } from './caracteristique';
import { CoupeDePrincipe } from './coupe-de-principe';

export class Module {
    public id: number;
    public description: string;
    public creationDate: Date;
    public editionDate: Date;
    public produits: Produit[];
    public caracteristiques: Caracteristique[];

    public coupeDePrincipe: CoupeDePrincipe;
    public coupeDePrincipeId: number;

    constructor(id: number, description: string, creationDate: Date, editionDate: Date, produits: Produit[],
                caracteristiques: Caracteristique[], coupeDePrincipe: CoupeDePrincipe) {
        this.id = id;
        this.description = description;
        this.creationDate = creationDate;
        this.editionDate = editionDate;
        this.produits = produits;
        this.caracteristiques = caracteristiques;
        this.coupeDePrincipe = coupeDePrincipe;
    }

}