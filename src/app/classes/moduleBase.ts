
import { ComposantModule } from './composantModule';
import { Module } from './module';

export class ModuleBase {
  public id: number;
  public description: string;
  public labourCosts: number;
  public composantModule: ComposantModule[];
  public modules: Module[];


  constructor(id: number, description: string, labourCosts: number, composantModule: ComposantModule[], modules: Module[]) {
    this.id = id;
    this.description = description;
    this.labourCosts = labourCosts;
    this.modules = modules;
    this.composantModule = composantModule;
  }

  public static newEmpty() {
    return new ModuleBase(undefined,undefined, undefined, undefined, undefined);
  }

/*  public toJSON(): string {
    let plainObject = {
      id: undefined,
      description: undefined,
      labourCosts: undefined,
      modules: [],
      composantModule: [],
    }

    /* plainObject.id = this.id;
     plainObject.description = this.description;
 

     plainObject.labourCosts = this.labourCosts;
     plainObject.composantsIds = (this.composants !== undefined ? this.composants.map(x => x.id) : undefined);
     
    return JSON.stringify(plainObject);
  }*/

}
