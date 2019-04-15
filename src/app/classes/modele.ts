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
    public utilisateurId: number;

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

}