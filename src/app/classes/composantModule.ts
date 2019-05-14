
import { Composant } from './composant';
import { ModuleBase } from './moduleBase';

export class ComposantModule {

  public moduleBaseId: number;
  public composantId: number;
  public moduleBase: ModuleBase;
  public composant: Composant;
  public quantity: number;
  com: number;

  constructor(moduleBaseId: number, composantId: number, moduleBase: ModuleBase, composant: Composant, quantity: number) {
    this.moduleBaseId = moduleBaseId;
    this.composantId = composantId;
    this.moduleBase = moduleBase;
    this.composant = composant;
    this.quantity = quantity;
  }



  public static newEmpty(): ComposantModule {
    return new ComposantModule(undefined, undefined, undefined, undefined, undefined);
  }

 /* public toJSON(): string {
    let plainObject = {
      moduleId: undefined,
      produitId: undefined,
      moduleBase: undefined,
      composant: undefined
    }


    /* plainObject.modeleId = (this.modele !== undefined ? this.modele.id : undefined);
     plainObject.moduleBaseId = (this.moduleBase !== undefined ? this.moduleBase.id : undefined);
     plainObject.composantId = (this.composant !== undefined ? this.composant.id : undefined);
     plainObject.uniteId = (this.unite !== undefined ? this.unite.id : undefined);

    return JSON.stringify(plainObject);
  }
  */
}
