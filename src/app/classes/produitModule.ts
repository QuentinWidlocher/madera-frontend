import { Produit } from './produit';
import { Module } from './module';

export class ProduitModule {

  public moduleId: number;
  public produitId: number;
  public module: Module;
  public produit: Produit;

  constructor(moduleId: number, produitId: number, module: Module, produit: Produit) {
    this.moduleId = moduleId;
    this.produitId = produitId;
    this.module = module;
    this.produit = produit;
  }



  public static newEmpty(): ProduitModule {
    return new ProduitModule(undefined, undefined, undefined, undefined);
  }

 /* public toJSON(): string {
    let plainObject = {
      moduleId: undefined,
      produitId: undefined,
      module: undefined,
      produit: undefined
    }


   /* plainObject.modeleId = (this.modele !== undefined ? this.modele.id : undefined);
    plainObject.moduleId = (this.module !== undefined ? this.module.id : undefined);
    plainObject.composantId = (this.composant !== undefined ? this.composant.id : undefined);
    plainObject.uniteId = (this.unite !== undefined ? this.unite.id : undefined);

    return JSON.stringify(plainObject);
  }
  */
}
