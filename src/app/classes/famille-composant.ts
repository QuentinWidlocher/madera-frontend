import { Composant } from './composant';

export class FamilleComposant {

    public id: number;
    public nature: string;
    public composants: Composant[];

    constructor(id: number, nature: string, composants: Composant[]) {
        this.id = id;
        this.nature = nature;
        this.composants = composants;
    }

    public static newEmpty() {
        return new FamilleComposant(undefined, undefined, undefined);
    }

    public toJSON(): string {
        let plainObject = {
            id: undefined,
            nature: undefined,
        }

        plainObject.id = this.id;
        plainObject.nature = this.nature;

        return JSON.stringify(plainObject);
    }


}