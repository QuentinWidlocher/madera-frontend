
import { CCTP } from './cctp';
import { Gamme } from './gamme';
import { CoupeDePrincipe } from './coupe-de-principe';
import { ModeleProduit } from './modeleProduit';
import { ProduitModule } from './produitModule';

export class Produit {
  public id: number;
  public description: string;
  public creationDate: Date;
  public editionDate: Date;
  public modeleProduit: ModeleProduit[];
  public cctp: CCTP;
  public produitModule: ProduitModule[];
  public gamme: Gamme;
  public coupeDePrincipe: CoupeDePrincipe;

  constructor(id: number, description: string, creationDate: Date, editionDate: Date, modeleProduit: ModeleProduit[],
    cctp: CCTP, produitModule: ProduitModule[], gamme: Gamme, coupeDePrincipe: CoupeDePrincipe) {
    this.id = id;
    this.description = description;
    this.creationDate = creationDate;
    this.editionDate = editionDate;
    this.modeleProduit = modeleProduit;
    this.cctp = cctp;
    this.produitModule = produitModule;
    this.gamme = gamme;
    this.coupeDePrincipe = coupeDePrincipe;
  }

  public static newEmpty() {
    return new Produit(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined);
  }

  public toJSON(): string {
    let plainObject = {
      id: undefined,
      description: undefined,
      creationDate: undefined,
      editionDate: undefined,
      modeleProduit: [],
      cctpId: undefined,
      produitModule: [],
      gammeId: undefined,
      coupeDePrincipeId: undefined
    }

    /*  plainObject.id = this.id;
      plainObject.description = this.description;
      plainObject.creationDate = (this.creationDate !== undefined ? this.creationDate.toISOString().slice(0, 19).replace('T', ' ') : undefined);
      plainObject.editionDate = (this.editionDate !== undefined ? this.editionDate.toISOString().slice(0, 19).replace('T', ' ') : undefined);
      this.modeleProduit.forEach(modele => {
          plainObject.modeleProduit.push({
              modeleId: modele.id,
              produitId: this.id
          })
      });
      plainObject.cctpId = (this.cctp !== undefined ? this.cctp.id : undefined);
      this.modules.forEach(module => {
          plainObject.modeleProduit.push({
              produitId: this.id,
              moduleId: module.id,
          })
      });
      plainObject.gammeId = (this.gamme !== undefined ? this.gamme.id : undefined);
      plainObject.coupeDePrincipeId = (this.coupeDePrincipe !== undefined ? this.coupeDePrincipe.id : undefined);*/

    return JSON.stringify(plainObject);
  }

}
