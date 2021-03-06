import { CoupeDePrincipe } from './coupe-de-principe';
import { FamilleComposant } from './famille-composant';
import { GammeComposant } from './gamme-composant';
import { Caracteristique } from './caracteristique';
import { ComposantModule } from './composantModule';

export class Composant {

  public id: number;
  public name: string;
  public unitPriceNoTax: number;
  public unitPriceTax: number;
  public composantModule: ComposantModule[];
  public caracteristiques: Caracteristique[];
  public gammeComposant: GammeComposant;
  public familleComposant: FamilleComposant;
  public quantite: number;

  constructor(id: number, name: string, unitPriceNoTax: number, unitPriceTax: number, composantModule: ComposantModule[],
    caracteristiques: Caracteristique[], familleComposant: FamilleComposant, gammeComposant: GammeComposant) {
    this.id = id;
    this.name = name;
    this.unitPriceNoTax = unitPriceNoTax;
    this.unitPriceTax = unitPriceTax;
    this.composantModule = composantModule;
    this.caracteristiques = caracteristiques;
    this.familleComposant = familleComposant;
    this.gammeComposant = gammeComposant;
  }

  public static newEmpty() {
    return new Composant(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined);
  }

 /* public toJSON(): string {
    let plainObject = {
      id: undefined,
      name: undefined,
      unitPriceNoTax: undefined,
      unitPriceTax: undefined,
      composantModule: [],
      caracteristiquesIds: [],
      gammeComposantId: undefined,
      familleComposantId: undefined,
    }

   /* plainObject.id = this.id;
    plainObject.name = this.name;
    plainObject.unitPriceTax = this.unitPriceTax;
    plainObject.unitPriceNoTax = this.unitPriceNoTax;
    plainObject.modulesIds = (this.modules !== undefined ? this.modules.map(x => x.id) : undefined);
    plainObject.caracteristiquesIds = (this.caracteristiques !== undefined ? this.caracteristiques.map(x => x.id) : undefined);
    plainObject.gammeComposantId = (this.gammeComposant !== undefined ? this.gammeComposant.id : undefined);
    plainObject.familleComposantId = (this.familleComposant !== undefined ? this.familleComposant.id : undefined);

    return JSON.stringify(plainObject);
  }*/

}
