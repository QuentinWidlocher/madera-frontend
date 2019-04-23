import { Client } from './client';

import { Data } from '@angular/router';
import { DossierTechnique } from './dossier-technique';
import { Devis } from './devis';
import { Utilisateur } from './utilisateur';

export class Projet {

    public id: number;
    public title: string;
    public creationDate: Date;
    public editionDate: Date;
    public endDate: Date;
    public version: string;
    public client: Client;
    public dossiersTechniques: DossierTechnique[];
    public utilisateur: Utilisateur;
    public devis: Devis;

    constructor(id: number, title: string, creationDate: Date, editionDate: Date, endDate: Date, version: string, client: Client,
        dossiersTechniques: DossierTechnique[], devis: Devis, utilisateur: Utilisateur) {
        this.id = id;
        this.title = title;
        this.creationDate = creationDate;
        this.editionDate = editionDate;
        this.endDate = endDate;
        this.version = version;
        this.client = client;
        this.dossiersTechniques = dossiersTechniques;
        this.devis = devis;
        this.utilisateur = utilisateur;
    }

    public static newEmpty(): Projet {
        return new Projet(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined);
    }

    public loadClient(): void {
        this.client = Object.assign(Client.newEmpty(), this.client);
    }

    public toJSON(): string {
        let plainObject = {
            id : undefined,
            title : undefined,
            creationDate : undefined,
            editionDate: undefined,
            endDate : undefined,
            version: undefined,
            clientId : undefined,
            dossiersTechniquesIds : [],
            devisId : undefined,
            userId: undefined
        }

        plainObject.id = this.id;
        plainObject.title = this.title;
        plainObject.creationDate = (this.creationDate !== undefined ? this.creationDate.toISOString().slice(0, 19).replace('T', ' ') : undefined);
        plainObject.editionDate = (this.editionDate !== undefined ? this.editionDate.toISOString().slice(0, 19).replace('T', ' ') : undefined);
        plainObject.endDate = (this.endDate !== undefined ? this.endDate.toISOString().slice(0, 19).replace('T', ' ') : undefined);
        plainObject.version = this.version;
        plainObject.clientId = (this.client !== undefined ? this.client.id : undefined);
        plainObject.dossiersTechniquesIds = (this.dossiersTechniques !== undefined ? this.dossiersTechniques.map(x => x.id) : undefined);
        plainObject.userId = (this.utilisateur !== undefined ? this.utilisateur.id : undefined);

        return JSON.stringify(plainObject);
    }

}