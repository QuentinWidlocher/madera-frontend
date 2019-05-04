import { Projet } from './projet';
import { Devis } from './devis';
import { Utilisateur } from './utilisateur';
import { Plan } from './plan';
import { Modele } from './modele';

export class DossierTechnique {

  public id: number;
  public creationDate: Date;
  public editionDate: Date;

  public projet: Projet;
  public projetId: number;

  public plans: Plan[];

  public modele: Modele;
  public modeleId: number;

  constructor(id: number, creationDate: Date, editionDate: Date, projet: Projet, plans: Plan[], modele: Modele, modeleId: number) {
    this.id = id;
    this.creationDate = creationDate;
    this.editionDate = editionDate;
    this.projet = projet;
    this.projetId = (projet ? projet.id : undefined);
    this.plans = plans;
    this.modele = modele;
    this.modeleId = modeleId;
  }

  public static newEmpty() {
    return new DossierTechnique(undefined, undefined, undefined, undefined, undefined, undefined, undefined);
  }
  /*
  public toJSON(): string {
    let plainObject = {
      id: undefined,
      creationDate: undefined,
      editionDate: undefined,
      projetId: undefined,
      plansIds: [],
      modeleId: undefined,
    }

    plainObject.id = this.id;
    plainObject.creationDate = (this.creationDate !== undefined ? this.creationDate.toISOString().slice(0, 19).replace('T', ' ') : undefined);
    plainObject.editionDate = (this.editionDate !== undefined ? this.editionDate.toISOString().slice(0, 19).replace('T', ' ') : undefined);
    plainObject.projetId = (this.projet !== undefined ? this.projet.id : undefined);
    plainObject.plansIds = (this.plans !== undefined ? this.plans.map(x => x.id) : undefined);
    plainObject.modeleId = (this.modele !== undefined ? this.modele.id : undefined);

    return JSON.stringify(plainObject);
  }
  */
}
