import { Projet } from './projet';
import { Devis } from './devis';
import { Utilisateur } from './utilisateur';
import { Plan } from './plan';
import { Modele } from './modele';

export class DossierTechnique {

    public id: number;
    public creationDate: Date;
    public editionDate: Date;
    public projet: Projet;
    public plans: Plan[];
    public modele: Modele;

    constructor(id: number, creationDate: Date, editionDate: Date, projet: Projet, plans: Plan[], modele: Modele) {
        this.id = id;
        this.creationDate = creationDate;
        this.editionDate = editionDate;
        this.projet = projet;
        this.plans = plans;
        this.modele = modele;
    }

    public static newEmpty() {
        return new DossierTechnique(undefined, undefined, undefined, undefined, undefined, undefined);
    }

    public toJSON(): string {
        let plainObject = {
            id: undefined,
            creationDate: undefined,
            editionDate: undefined,
            modeleId: undefined,
        }

        plainObject.id = this.id;
        plainObject.creationDate = (this.creationDate !== undefined ? this.creationDate.toISOString().slice(0, 19).replace('T', ' ') : undefined);
        plainObject.editionDate = (this.editionDate !== undefined ? this.editionDate.toISOString().slice(0, 19).replace('T', ' ') : undefined);
        plainObject.modeleId = (this.modele !== undefined ? this.modele.id : undefined);

        return JSON.stringify(plainObject);
    }

}