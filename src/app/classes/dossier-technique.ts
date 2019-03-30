import { Projet } from './projet';
import { Devis } from './devis';
import { Utilisateur } from './utilisateur';
import { Plan } from './plan';

export class DossierTechnique {

    private _id: number;
    private _numero: number;
    private _creationDate: Date;
    private _editionDate: Date;
    private _projet: Projet;
    private _devis: Devis[];
    private _utilisateur: Utilisateur;
    private _plan: Plan;

    constructor(id: number, numero: number, creationDate: Date, editionDate: Date, projet: Projet, devis: Devis[],
                utilisateur: Utilisateur, plan: Plan) {
        this.id = id;
        this.numero = numero;
        this.creationDate = creationDate;
        this.editionDate = editionDate;
        this.projet = projet;
        this.devis = devis;
        this.utilisateur = utilisateur;
        this.plan = plan;
    }

    //#region getters and setters
    public get plan(): Plan {
        return this._plan;
    }
    public set plan(plan: Plan) {
        this._plan = plan;
    }

    public get utilisateur(): Utilisateur {
        return this._utilisateur;
    }
    public set utilisateur(utilisateur: Utilisateur) {
        this._utilisateur = utilisateur;
    }

    public get devis(): Devis[] {
        return this._devis;
    }
    public set devis(devis: Devis[]) {
        this._devis = devis;
    }

    public get projet(): Projet {
        return this._projet;
    }
    public set projet(projet: Projet) {
        this._projet = projet;
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

    public get numero(): number {
        return this._numero;
    }
    public set numero(numero: number) {
        this._numero = numero;
    }

    public get id(): number {
        return this._id;
    }
    public set id(id: number) {
        this._id = id;
    }
    //#endregion
}