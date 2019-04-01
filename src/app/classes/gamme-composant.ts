import { Composant } from './composant';

export class GammeComposant {

    private _id: number;
    private _code: string;
    private _description: string;
    private _material: string;
    private _composants: Composant[];

    constructor(id: number, code: string, description: string, material: string, composants: Composant[]) {
        this.id = id;
        this.code = code;
        this.description = description;
        this.material = material;
        this.composants = composants;
    }

    //#region getters and setters
    public get composants(): Composant[] {
        return this._composants;
    }
    public set composants(composants: Composant[]) {
        this._composants = composants;
    }

    public get material(): string {
        return this._material;
    }
    public set material(material: string) {
        this._material = material;
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