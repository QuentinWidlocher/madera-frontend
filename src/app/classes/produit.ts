import { Modele } from './modele';
import { CCTP } from './CCTP';
import { Module } from './module';

export class Produit {
    private _id: number;
    private _description: string;
    private _creationDate: Date;
    private _editionDate: Date;
    private _modeles: Modele[];
    private _cctp: CCTP[];
    private _modules: Module[];

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

    //#region getters and setters
    public get modules(): Module[] {
        return this._modules;
    }
    public set modules(modules: Module[]) {
        this._modules = modules;
    }

    public get cctp(): CCTP[] {
        return this._cctp;
    }
    public set cctp(cctp: CCTP[]) {
        this._cctp = cctp;
    }

    public get modeles(): Modele[] {
        return this._modeles;
    }
    public set modeles(modeles: Modele[]) {
        this._modeles = modeles;
    }

    public get editionDate(): Date {
        return this._editionDate;
    }
    public set editionDate(editionDate: Date) {
        this._editionDate = editionDate;
    }

    public get creationDate(): Date {
        return this._creationDate;
    }
    public set creationDate(creationDate: Date) {
        this._creationDate = creationDate;
    }

    public get description(): string {
        return this._description;
    }
    public set description(description: string) {
        this._description = description;
    }

    public get id(): number {
        return this._id;
    }
    public set id(id: number) {
        this._id = id;
    }
    //#endregion
}