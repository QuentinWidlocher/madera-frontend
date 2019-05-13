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




}
