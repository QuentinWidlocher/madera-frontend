import { Produit } from './produit';
import { Caracteristique } from './caracteristique';
import { CoupeDePrincipe } from './coupe-de-principe';
import { Composant } from './composant';

export class Module {
    public id: number;
    public description: string;
    public creationDate: Date;
    public editionDate: Date;
    public labourCost: number;
    public produits: Produit[];
    public caracteristiques: Caracteristique[];
    public composants: Composant[];
    public coupeDePrincipe: CoupeDePrincipe;

    constructor(id: number, description: string, creationDate: Date, editionDate: Date, labourCost: number, produits: Produit[],
                caracteristiques: Caracteristique[], composants: Composant[], coupeDePrincipe: CoupeDePrincipe) {
        this.id = id;
        this.description = description;
        this.creationDate = creationDate;
        this.editionDate = editionDate;
        this.labourCost = labourCost;
        this.produits = produits;
        this.caracteristiques = caracteristiques;
        this.composants = composants;
        this.coupeDePrincipe = coupeDePrincipe;
    }

    public static newEmpty() {
        return new Module(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined);
    }

    public toJSON(): string {
        let plainObject = {
            id: undefined,
            description: undefined,
            creationDate: undefined,
            editionDate: undefined,
            labourCost: undefined,
            produitModule: [],
            caracteristiquesIds: [],
            composantsIds: [],
            coupeDePrincipeId: undefined,
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
        plainObject.labourCost = this.labourCost;
        plainObject.caracteristiquesIds = (this.caracteristiques !== undefined ? this.caracteristiques.map(x => x.id) : undefined);
        plainObject.composantsIds = (this.composants !== undefined ? this.composants.map(x => x.id) : undefined);
        plainObject.coupeDePrincipeId = (this.coupeDePrincipe !== undefined ? this.coupeDePrincipe.id : undefined);

        return JSON.stringify(plainObject);
    }

}