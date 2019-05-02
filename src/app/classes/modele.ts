import { DossierTechnique } from './dossier-technique';
import { Utilisateur } from './utilisateur';
import { ModeleProduit } from './modeleProduit';

export class Modele {
  public id: number;
  public description: string;
  public creationDate: Date;
  public editionDate: Date;
  public dossiersTechniques: DossierTechnique[];
  public modeleProduit: ModeleProduit[];
  public utilisateur: Utilisateur;
  public userId: number;

  constructor(id: number, description: string, creationDate: Date, editionDate: Date, dossiersTechniques: DossierTechnique[],
    modeleProduit: ModeleProduit[], utilisateur: Utilisateur, userId :number) {
    this.id = id;
    this.description = description;
    this.creationDate = creationDate;
    this.editionDate = editionDate;
    this.dossiersTechniques = dossiersTechniques;
    this.modeleProduit = modeleProduit;
    this.utilisateur = utilisateur;
    this.userId = userId;

  }

  public static newEmpty() {
    return new Modele(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined);
  }

/*  public toJSON(): string {
    let plainObject = {
      id: undefined,
      description: undefined,
      creationDate: undefined,
      editionDate: undefined,
      dossiersTechniquesIds: [],
      modeleProduit: [],
      userId: undefined,
    }

    /*  plainObject.id = this.id;
        plainObject.description = this.description;
        plainObject.creationDate = (this.creationDate !== undefined ? this.creationDate.toISOString().slice(0, 19).replace('T', ' ') : undefined);
        plainObject.editionDate = (this.editionDate !== undefined ? this.editionDate.toISOString().slice(0, 19).replace('T', ' ') : undefined);
        plainObject.dossiersTechniquesIds = (this.dossiersTechniques !== undefined ? this.dossiersTechniques.map(x => x.id) : undefined);
        this.modeleProduit.forEach(produit => {
            plainObject.modeleProduit.push({ 
                modeleId: this.id,
                produitId: produit.id
             })
        });
        plainObject.userId = (this.utilisateur !== undefined ? this.utilisateur.id : undefined);
        
    return JSON.stringify(plainObject);
  }*/

}
