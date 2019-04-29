import { DossierTechnique } from './dossier-technique';
import { Projet } from './projet';
import { Ligne } from './ligne';

export class Devis {

    public id: number;
    public numero: number;
    public creationDate: Date;
    public editionDate: Date;
    public estimatedTime: number;
    public projet: Projet;
    public lignes: Ligne[];

    constructor(id: number, numero: number, creationDate: Date, editionDate: Date, estimatedTime: number,
                projet: Projet, lignes: Ligne[]) {
        this.id = id;
        this.numero = numero;
        this.creationDate = creationDate;
        this.editionDate = editionDate;
        this.estimatedTime = estimatedTime;
        this.projet = projet;
        this.lignes = lignes;
    }

    public static newEmpty(): Devis {
        return new Devis(undefined, undefined, undefined, undefined, undefined, undefined, undefined);
    }

    public toJSON(): string {
        let plainObject = {
            id: undefined,
            numero: undefined,
            creationDate: undefined,
            editionDate: undefined,
            estimatedTime: undefined,
            lignesIds: [],
        }

        plainObject.id = this.id;
        plainObject.numero = this.numero;
        plainObject.creationDate = (this.creationDate !== undefined ? this.creationDate.toISOString().slice(0, 19).replace('T', ' ') : undefined);
        plainObject.editionDate = (this.editionDate !== undefined ? this.editionDate.toISOString().slice(0, 19).replace('T', ' ') : undefined);
        plainObject.estimatedTime = this.estimatedTime;
        plainObject.lignesIds = (this.lignes !== undefined ? this.lignes.map(x => x.id) : undefined);

        return JSON.stringify(plainObject);
    }


}