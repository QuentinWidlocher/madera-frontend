import { DossierTechnique } from './dossier-technique';
import { Projet } from './projet';
import { Modele } from './modele';

export class Utilisateur {

    public id: number;
    public username: string;
    public password: string;
    public projets: Projet[];
    public modeles: Modele[];
    public role: string;

    constructor(id: number, username: string, password: string, projets: Projet[], modeles: Modele[], role: string) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.projets = projets;
        this.modeles = modeles;
        this.role = role;
    }

    public static newEmpty(): Utilisateur {
        return new Utilisateur(undefined, undefined, undefined, undefined, undefined, undefined);
    }

    public toJSON(): string {
        let plainObject = {
            id: undefined,
            username: undefined,
            password: undefined,
            role: undefined
        }

        plainObject.id = this.id;
        plainObject.username = this.username;
        plainObject.password = this.password;
        plainObject.role = this.role;

        return JSON.stringify(plainObject);
    }
}