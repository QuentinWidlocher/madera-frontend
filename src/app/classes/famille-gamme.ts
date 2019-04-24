import { Gamme } from './gamme';

export class FamilleGamme {

    public id: number;
    public nature: string;
    public gammes: Gamme[];

    constructor(id: number, nature: string, gammes: Gamme[]) {
        this.id = id;
        this.nature = nature;
        this.gammes = gammes;
    }

    public static newEmpty() {
        return new FamilleGamme(undefined, undefined, undefined);
    }

    public toJSON(): string {
        let plainObject = {
            id: undefined,
            nature: undefined,
            gammesIds: [],
        }

        plainObject.id = this.id;
        plainObject.nature = this.nature;
        plainObject.gammesIds = (this.gammes !== undefined ? this.gammes.map(x => x.id) : undefined);

        return JSON.stringify(plainObject);
    }

}