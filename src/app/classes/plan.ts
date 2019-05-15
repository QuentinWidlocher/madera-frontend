import { DossierTechnique } from './dossier-technique';

export class Plan {

    public id: number;
    public number: number;
    public creationDate: Date;
    public editionDate: Date;
    public dossierTechnique: DossierTechnique;

    constructor(id: number, number: number, creationDate: Date, editionDate: Date, dossierTechnique: DossierTechnique) {
        this.id = id;
        this.number = number;
        this.creationDate = creationDate;
        this.editionDate = editionDate;
        this.dossierTechnique = dossierTechnique;
    }

    public static newEmpty() {
        return new Plan(undefined, undefined, undefined, undefined, undefined);
    }

  /*  public toJSON(): string {
        let plainObject = {
            id: undefined,
            number: undefined,
            creationDate: undefined,
            editionDate: undefined,
            dossierTechniqueId: undefined,
        }

        plainObject.id = this.id;
        plainObject.number = this.number;
        plainObject.creationDate = (this.creationDate !== undefined ? this.creationDate.toISOString().slice(0, 19).replace('T', ' ') : undefined);
        plainObject.editionDate = (this.editionDate !== undefined ? this.editionDate.toISOString().slice(0, 19).replace('T', ' ') : undefined);
        plainObject.dossierTechniqueId = (this.dossierTechnique !== undefined ? this.dossierTechnique.id : undefined);

        return JSON.stringify(plainObject);
    }*/

}
