import { Client } from './client';

import { Data } from '@angular/router';
import { DossierTechnique } from './dossier-technique';
import { Devis } from './devis';
import { User } from './user';

export class Projet {

  public id: number;
  public title: string;
  public creationDate: Date;
  public editionDate: Date;
  public endDate: Date;
  public version: string;

  public client: Client;
  public clientId: number;

  public dossierTechnique: DossierTechnique;
  public dossierTechniqueId: number;

  public user: User;
  public userId: number;

  public devis: Devis;
  public devisId: number;

  constructor(id: number, title: string, creationDate: Date, editionDate: Date, endDate: Date, version: string, client: Client,
    dossierTechnique: DossierTechnique, devis: Devis, user: User) {
    this.id = id;
    this.title = title;
    this.creationDate = creationDate;
    this.editionDate = editionDate;
    this.endDate = endDate;
    this.version = version;

    this.client = client;
    this.clientId = (client ? client.id : undefined);

    this.dossierTechnique = dossierTechnique;
    this.dossierTechniqueId = (dossierTechnique ? dossierTechnique.id : undefined);

    this.devis = devis;
    this.devisId = (devis ? devis.id : undefined);

    this.user = user;
    this.userId = (user ? user.id : undefined)
  }

  public static newEmpty(): Projet {
    return new Projet(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined);
  }

  /*    public toJSON(): string {
          let plainObject = {
              id : undefined,
              title : undefined,
              creationDate : undefined,
              editionDate: undefined,
              endDate : undefined,
              version: undefined,
              clientId : undefined,
              dossierTechniqueId : undefined,
              devisId : undefined,
              userId: undefined
          }
  
          plainObject.id = this.id;
          plainObject.title = this.title;
          plainObject.creationDate = (this.creationDate !== undefined && this.creationDate !== null ? this.creationDate.toISOString().slice(0, 19).replace('T', ' ') : undefined);
          plainObject.editionDate = (this.editionDate !== undefined && this.editionDate !== null ? this.editionDate.toISOString().slice(0, 19).replace('T', ' ') : undefined);
          plainObject.endDate = (this.endDate !== undefined && this.endDate !== null ? this.endDate.toISOString().slice(0, 19).replace('T', ' ') : undefined);
          plainObject.version = this.version;
          plainObject.devisId = (this.devis !== undefined && this.devis !== null ? this.devis.id : undefined);
          plainObject.clientId = (this.client !== undefined && this.client !== null ? this.client.id : undefined);
          plainObject.dossierTechniqueId = (this.dossierTechnique !== undefined && this.dossierTechnique !== null ? this.dossierTechnique.id : undefined);
          plainObject.userId = (this.utilisateur !== undefined && this.utilisateur !== null ? this.utilisateur.id : undefined);
  
          return JSON.stringify(plainObject);
      }
      */
}
