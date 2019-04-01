import { Gamme } from './gamme';

export class FamilleGamme {

    private _id: number;
    private _nature: string;
    private _gammes: Gamme[];

    constructor(id: number, nature: string, gammes: Gamme[]) {
        this.id = id;
        this.nature = nature;
        this.gammes = gammes;
    }

    //#region getters and setters
    public get gammes(): Gamme[] {
        return this._gammes;
    }
    public set gammes(gammes: Gamme[]) {
        this._gammes = gammes;
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