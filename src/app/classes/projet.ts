import { Client } from './client';

import { Data } from '@angular/router';
import { DossierTechnique } from './dossier-technique';
import { Devis } from './devis';

export class Projet {

    public id: number;
    public title: string;
    public creationDate: Date;
    public editionDate: Date;
    public version: string;
    public client: Client;
    public dossiersTechniques: DossierTechnique[];
    public devis: Devis;

    constructor(id: number, title: string, creationDate: Date, editionDate: Date, version: string, client: Client,
                dossiersTechniques: DossierTechnique[], devis: Devis) {
        this.id = id;
        this.title = title;
        this.creationDate = creationDate;
        this.editionDate = editionDate;
        this.version = version;
        this.client = client;
        this.dossiersTechniques = dossiersTechniques;
        this.devis = devis;
    }

}