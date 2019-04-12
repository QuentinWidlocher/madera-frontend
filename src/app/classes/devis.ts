import { DossierTechnique } from './dossier-technique';
import { Projet } from './projet';
import { Ligne } from './ligne';

export class Devis {

    public id: number;
    public numero: number;
    public creationDate: Date;
    public editionDate: Date;
    public dossiersTechniques: DossierTechnique[];
    public projet: Projet;
    public lignes: Ligne[];

    constructor(id: number, numero: number, creationDate: Date, editionDate: Date, dossiersTechniques: DossierTechnique[],
                projet: Projet, lignes: Ligne[]) {
        this.id = id;
        this.numero = numero;
        this.creationDate = creationDate;
        this.editionDate = editionDate;
        this.dossiersTechniques = dossiersTechniques;
        this.projet = projet;
        this.lignes = lignes;
    }


}