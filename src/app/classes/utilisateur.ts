import { DossierTechnique } from './dossier-technique';
import { Role } from './role';

export class Utilisateur {

    public id: number;
    public username: string;
    public password: string;
    public dossiersTechniques: DossierTechnique[];
    public role: Role;

    constructor(id: number, username: string, password: string, dossiersTechniques: DossierTechnique[], role: Role) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.dossiersTechniques = dossiersTechniques;
        this.role = role;
    }

}