import { Module } from './module';
import { Composant } from './composant';

export class ComposantModule {

  public moduleId: number;
  public produitId: number;
  public module: Module;
  public composant: Composant;

  constructor(moduleId: number, produitId: number, module: Module, composant: Composant) {
    this.moduleId = moduleId;
    this.produitId = produitId;
    this.module = module;
    this.composant = composant;
  }



  public static newEmpty(): ComposantModule {
    return new ComposantModule(undefined, undefined, undefined, undefined);
  }

  public toJSON(): string {
    let plainObject = {
      moduleId: undefined,
      produitId: undefined,
      module: undefined,
      composant: undefined
    }


    /* plainObject.modeleId = (this.modele !== undefined ? this.modele.id : undefined);
     plainObject.moduleId = (this.module !== undefined ? this.module.id : undefined);
     plainObject.composantId = (this.composant !== undefined ? this.composant.id : undefined);
     plainObject.uniteId = (this.unite !== undefined ? this.unite.id : undefined);*/

    return JSON.stringify(plainObject);
  }

}
