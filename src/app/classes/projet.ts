import { Client } from './client';

import { Data } from '@angular/router';
import { DossierTechnique } from './dossier-technique';
import { Devis } from './devis';

export class Projet {

    public _id: number;
    public _title: string;
    public _creationDate: Date;
    public _editionDate: Date;
    public _version: string;
    public _client: Client;
    public _dossiersTechniques: DossierTechnique[];
    public _devis: Devis;

    constructor(id: number, title: string, creationDate: Date, editionDate: Date, version: string, client: Client) {
        this.id = id;
        this.title = title;
        this.creationDate = creationDate;
        this.editionDate = editionDate;
        this.version = version;
        this.client = client;
    }

    //#region getters and setters
    public get devis(): Devis {
        return this._devis;
    }
    public set devis(devis: Devis) {
        this._devis = devis;
    }

    public get dossiersTechniques(): DossierTechnique[] {
        return this._dossiersTechniques;
    }
    public set dossiersTechniques(dossiersTechniques: DossierTechnique[]) {
        this._dossiersTechniques = dossiersTechniques;
    }

    public get client(): Client {
        return this._client;
    }
    public set client(client: Client) {
        this._client = client;
    }

    public get version(): string {
        return this._version;
    }
    public set version(version: string) {
        this._version = version;
    }

    public get editionDate(): Date {
        return this._editionDate;
    }
    public set editionDate(editionDate: Date) {
        this._editionDate = editionDate;
    }

    public get creationDate(): Date {
        return this._creationDate;
    }
    public set creationDate(creationDate: Date) {
        this._creationDate = creationDate;
    }

    public get title(): string {
        return this._title;
    }
    public set title(title: string) {
        this._title = title;
    }

    public get id(): number {
        return this._id;
    }
    public set id(id: number) {
        this._id = id;
    }
    //#endregion
}