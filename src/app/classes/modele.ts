import { DossierTechnique } from './dossier-technique';
import { User } from './user';
import { ModeleProduit } from './modeleProduit';

export class Modele {
  public id: number;
  public description: string;
  public creationDate: Date;
  public editionDate: Date;
  public dossiersTechniques: DossierTechnique[];
  public modeleProduit: ModeleProduit[];
  public user: User;
  public userId: number;
  public currentDossier :number;
  public fakeModele : boolean;
  public oldModele :number;

  constructor(id: number, description: string, creationDate: Date, editionDate: Date, dossiersTechniques: DossierTechnique[],
    modeleProduit: ModeleProduit[], user: User, userId :number) {
    this.id = id;
    this.description = description;
    this.creationDate = creationDate;
    this.editionDate = editionDate;
    this.dossiersTechniques = dossiersTechniques;
    this.modeleProduit = modeleProduit;
    this.user = user;
    this.userId = userId;

  }

  public static newEmpty() {
    return new Modele(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined);
  }



}
