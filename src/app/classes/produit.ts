import { Modele } from './modele';
import { CCTP } from './cctp';
import { Module } from './module';

export class Produit {
    public id: number;
    public description: string;
    public creationDate: Date;
    public editionDate: Date;
    public modeles: Modele[];
    public cctp: CCTP[];
    public modules: Module[];

    constructor(id: number, description: string, creationDate: Date, editionDate: Date, modeles: Modele[],
                cctp: CCTP[], modules: Module[]) {
        this.id = id;
        this.description = description;
        this.creationDate = creationDate;
        this.editionDate = editionDate;
        this.modeles = modeles;
        this.cctp = cctp;
        this.modules = modules;
    }

}