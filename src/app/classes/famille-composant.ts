import { Composant } from './composant';

export class FamilleComposant {

    private _id: number;
    private _nature: string;
    private _composants: Composant[];

    constructor(id: number, nature: string, composants: Composant[]) {
        this.id = id;
        this.nature = nature;
        this.composants = composants;
    }

    //#region getters and setters
    public get composants(): Composant[] {
        return this._composants;
    }
    public set composants(composants: Composant[]) {
        this._composants = composants;
    }

    public get nature(): string {
        return this._nature;
    }
    public set nature(nature: string) {
        this._nature = nature;
    }

    public get id(): number {
        return this._id;
    }
    public set id(id: number) {
        this._id = id;
    }
    //#endregion
}