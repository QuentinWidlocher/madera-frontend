import { DossierTechnique } from './dossier-technique';

export class Utilisateur {

    public id: number;
    public username: string;
    public password: string;
    public dossiersTechniques: DossierTechnique[];

    constructor(id: number, username: string, password: string, dossiersTechniques: DossierTechnique[]) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.dossiersTechniques = dossiersTechniques;
    }

    public static newEmpty(): Utilisateur {
        return new Utilisateur(undefined, undefined, undefined, undefined);
    }
}