
import { Composant } from './composant';
import { ModuleBase } from './moduleBase';

export class ComposantModule {

  public moduleId: number;
  public produitId: number;
  public moduleBase: ModuleBase;
  public composant: Composant;
  public quantity: number;

  constructor(moduleId: number, produitId: number, moduleBase: ModuleBase, composant: Composant, quantity: number) {
    this.moduleId = moduleId;
    this.produitId = produitId;
    this.moduleBase = moduleBase;
    this.composant = composant;
    this.quantity = quantity;
  }



  public static newEmpty(): ComposantModule {
    return new ComposantModule(undefined, undefined, undefined, undefined, undefined);
  }

  public toJSON(): string {
    let plainObject = {
      moduleId: undefined,
      produitId: undefined,
      moduleBase: undefined,
      composant: undefined
    }


    /* plainObject.modeleId = (this.modele !== undefined ? this.modele.id : undefined);
     plainObject.moduleBaseId = (this.moduleBase !== undefined ? this.moduleBase.id : undefined);
     plainObject.composantId = (this.composant !== undefined ? this.composant.id : undefined);
     plainObject.uniteId = (this.unite !== undefined ? this.unite.id : undefined);*/

    return JSON.stringify(plainObject);
  }

}
