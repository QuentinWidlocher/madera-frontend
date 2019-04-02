import { DossierTechnique } from './dossier-technique';

export class Utilisateur {

    private _id: number;
    private _username: string;
    private _password: string;
    private _dossiersTechniques: DossierTechnique[];

    constructor(id: number, username: string, password: string, dossiersTechniques: DossierTechnique[]) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.dossiersTechniques = dossiersTechniques;
    }

    //#region getters and setters
    public get dossiersTechniques(): DossierTechnique[] {
        return this._dossiersTechniques;
    }
    public set dossiersTechniques(dossiersTechniques: DossierTechnique[]) {
        this._dossiersTechniques = dossiersTechniques;
    }
    public get password(): string {
        return this._password;
    }
    public set password(password: string) {
        this._password = password;
    }
    public get username(): string {
        return this._username;
    }
    public set username(username: string) {
        this._username = username;
    }
    public get id(): number {
        return this._id;
    }
    public set id(id: number) {
        this._id = id;
    }
    //#endregion
}