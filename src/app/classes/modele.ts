import { DossierTechnique } from './dossier-technique';
import { Utilisateur } from './utilisateur';
import { Produit } from './produit';

export class Modele {
    public id: number;
    public description: string;
    public creationDate: Date;
    public editionDate: Date;
    public dossiersTechniques: DossierTechnique[];
    public produits: Produit[];
    public utilisateur: Utilisateur;

    constructor(id: number, description: string, creationDate: Date, editionDate: Date, dossiersTechniques: DossierTechnique[],
                produits: Produit[], utilisateur: Utilisateur) {
        this.id = id;
        this.description = description;
        this.creationDate = creationDate;
        this.editionDate = editionDate;
        this.dossiersTechniques = dossiersTechniques;
        this.produits = produits;
        this.utilisateur = utilisateur;
    }

    public static newEmpty() {
        return new Modele(undefined, undefined, undefined, undefined, undefined, undefined, undefined);
    }

    public toJSON(): string {
        let plainObject = {
            id: undefined,
            description: undefined,
            creationDate: undefined,
            editionDate: undefined,
            modeleProduit: [],
            userId: undefined,
        }

        plainObject.id = this.id;
        plainObject.description = this.description;
        plainObject.creationDate = (this.creationDate !== undefined ? this.creationDate.toISOString().slice(0, 19).replace('T', ' ') : undefined);
        plainObject.editionDate = (this.editionDate !== undefined ? this.editionDate.toISOString().slice(0, 19).replace('T', ' ') : undefined);
        this.produits.forEach(produit => {
            plainObject.modeleProduit.push({ 
                modeleId: this.id,
                produitId: produit.id
             })
        });
        plainObject.userId = (this.utilisateur !== undefined ? this.utilisateur.id : undefined);

        return JSON.stringify(plainObject);
    }

}