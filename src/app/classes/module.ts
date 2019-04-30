import { Caracteristique } from './caracteristique';
import { CoupeDePrincipe } from './coupe-de-principe';
import { ProduitModule } from './produitModule';
import { ComposantModule } from './composantModule';

export class Module {
  public id: number;
  public description: string;
  public creationDate: Date;
  public editionDate: Date;
  public labourCost: number;
  public produitModule: ProduitModule[];
  public caracteristiques: Caracteristique[];
  public composantModule: ComposantModule[];
  public coupeDePrincipe: CoupeDePrincipe;

  constructor(id: number, description: string, creationDate: Date, editionDate: Date, labourCost: number, produitModule: ProduitModule[],
    caracteristiques: Caracteristique[], composantModule: ComposantModule[], coupeDePrincipe: CoupeDePrincipe) {
    this.id = id;
    this.description = description;
    this.creationDate = creationDate;
    this.editionDate = editionDate;
    this.labourCost = labourCost;
    this.produitModule = produitModule;
    this.caracteristiques = caracteristiques;
    this.composantModule = composantModule;
    this.coupeDePrincipe = coupeDePrincipe;
  }

  public static newEmpty() {
    return new Module(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined);
  }

  public toJSON(): string {
    let plainObject = {
      id: undefined,
      description: undefined,
      creationDate: undefined,
      editionDate: undefined,
      labourCost: undefined,
      produitModule: [],
      caracteristiquesIds: [],
      composantModule: [],
      coupeDePrincipeId: undefined,
    }

    /* plainObject.id = this.id;
     plainObject.description = this.description;
     plainObject.creationDate = (this.creationDate !== undefined ? this.creationDate.toISOString().slice(0, 19).replace('T', ' ') : undefined);
     plainObject.editionDate = (this.editionDate !== undefined ? this.editionDate.toISOString().slice(0, 19).replace('T', ' ') : undefined);
     this.produits.forEach(produit => {
         plainObject.produitModule.push({
             produitId: produit.id,
             moduleId: this.id
         })
     });
     plainObject.labourCost = this.labourCost;
     plainObject.caracteristiquesIds = (this.caracteristiques !== undefined ? this.caracteristiques.map(x => x.id) : undefined);
     plainObject.composantsIds = (this.composants !== undefined ? this.composants.map(x => x.id) : undefined);
     plainObject.coupeDePrincipeId = (this.coupeDePrincipe !== undefined ? this.coupeDePrincipe.id : undefined);
     */
    return JSON.stringify(plainObject);
  }

}
