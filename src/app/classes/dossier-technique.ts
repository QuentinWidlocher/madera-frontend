import { Projet } from './projet';
import { Devis } from './devis';
import { Utilisateur } from './utilisateur';
import { Plan } from './plan';
import { Modele } from './modele';

export class DossierTechnique {

    public id: number;
    public numero: number;
    public creationDate: Date;
    public editionDate: Date;
    public projet: Projet;
    public devis: Devis[];
    public utilisateur: Utilisateur;
    public plan: Plan;
    public modele: Modele;

    constructor(id: number, numero: number, creationDate: Date, editionDate: Date, projet: Projet, devis: Devis[],
                utilisateur: Utilisateur, plan: Plan, modele: Modele) {
        this.id = id;
        this.numero = numero;
        this.creationDate = creationDate;
        this.editionDate = editionDate;
        this.projet = projet;
        this.devis = devis;
        this.utilisateur = utilisateur;
        this.plan = plan;
        this.modele = modele;
    }


}