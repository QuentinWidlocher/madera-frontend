import { Client } from './client';

import { Data } from '@angular/router';
import { DossierTechnique } from './dossier-technique';
import { Devis } from './devis';

export class Projet {

    private _id: number;
    private _title: string;
    private _creationDate: Date;
    private _editionDate: Date;
    private _version: string;
    private _client: Client;
    private _dossiersTechniques: DossierTechnique[];
    private _devis: Devis;

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