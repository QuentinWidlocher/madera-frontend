import { Module } from './module';
import { Unite } from './unite';
import { Composant } from './composant';

export class Caracteristique {

  public id: number;
  public description: string;
  public value: number;
  public module: Module;
  public composant: Composant;
  public unite: Unite;
  public uniteId: numer;

  constructor(id: number, description: string, value: number, module: Module, composant: Composant, unite: Unite, uniteId: number) {
    this.id = id;
    this.description = description;
    this.value = value;
    this.module = module;
    this.composant = composant;
    this.unite = unite;
    this.uniteId = uniteId;
  }

  public get toString(): string {
    return this.value + ' ' + this.unite.code;
  }

  public static newEmpty(): Caracteristique {
    return new Caracteristique(undefined, undefined, undefined, undefined, undefined, undefined, undefined);
  }

  /* public toJSON(): string {
       let plainObject = {
           id: undefined,
           description: undefined,
           value: undefined,
           moduleId: undefined,
           composantId: undefined,
           uniteId: undefined,
       }

       plainObject.id = this.id;
       plainObject.description = this.description;
       plainObject.moduleId = (this.module !== undefined ? this.module.id : undefined);
       plainObject.composantId = (this.composant !== undefined ? this.composant.id : undefined);
       plainObject.uniteId = (this.unite !== undefined ? this.unite.id : undefined);

       return JSON.stringify(plainObject);
   }*/

}
