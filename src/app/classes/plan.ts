import { DossierTechnique } from './dossier-technique';

export class Plan {

    public id: number;
    public number: number;
    public creationDate: Date;
    public editionDate: Date;
    public dossiersTechniques: DossierTechnique[];

    constructor(id: number, number: number, creationDate: Date, editionDate: Date, dossiersTechniques: DossierTechnique[]) {
        this.id = id;
        this.number = number;
        this.creationDate = creationDate;
        this.editionDate = editionDate;
        this.dossiersTechniques = dossiersTechniques;
    }

}