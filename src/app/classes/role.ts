import { Utilisateur } from './utilisateur';

export class Role {

    private _id: number;
    private _code: string;
    private _description: string;
    private _utilisateurs: Utilisateur[];

    constructor(id: number, code: string, description: string, utilisateurs: Utilisateur[]) {
        this.id = id;
        this.code = code;
        this.description = description;
        this.utilisateurs = utilisateurs;
    }

    //#region getters and setters
    public get utilisateurs(): Utilisateur[] {
        return this._utilisateurs;
    }
    public set utilisateurs(utilisateurs: Utilisateur[]) {
        this._utilisateurs = utilisateurs;
    }

    public get description(): string {
        return this._description;
    }
    public set description(description: string) {
        this._description = description;
    }

    public get code(): string {
        return this._code;
    }
    public set code(code: string) {
        this._code = code;
    }

    public get id(): number {
        return this._id;
    }
    public set id(id: number) {
        this._id = id;
    }
    //#endregion

}