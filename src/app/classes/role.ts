import { Utilisateur } from './utilisateur';

export class Role {

    public id: number;
    public code: string;
    public description: string;
    public utilisateurs: Utilisateur[];

    constructor(id: number, code: string, description: string, utilisateurs: Utilisateur[]) {
        this.id = id;
        this.code = code;
        this.description = description;
        this.utilisateurs = utilisateurs;
    }

}