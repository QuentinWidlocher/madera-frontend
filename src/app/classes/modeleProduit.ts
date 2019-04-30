import { Modele } from './modele';
import { Produit } from './produit';

export class ModeleProduit {

  public modeleId: number;
  public produitId: number;
  public modele: Modele;
  public produit: Produit;

  constructor(modeleId: number, produitId: number,modele: Modele, produit: Produit) {
    this.modeleId = modeleId;
    this.produitId = produitId;
    this.modele = modele;
    this.produit = produit;
  }



  public static newEmpty(): ModeleProduit {
    return new ModeleProduit(undefined, undefined, undefined, undefined);
  }

  public toJSON(): string {
    let plainObject = {
      modeleId: undefined,
      produitId: undefined,
      modele: undefined,
      produit: undefined
    }


   /* plainObject.modeleId = (this.modele !== undefined ? this.modele.id : undefined);
    plainObject.moduleId = (this.module !== undefined ? this.module.id : undefined);
    plainObject.composantId = (this.composant !== undefined ? this.composant.id : undefined);
    plainObject.uniteId = (this.unite !== undefined ? this.unite.id : undefined);*/

    return JSON.stringify(plainObject);
  }

}
