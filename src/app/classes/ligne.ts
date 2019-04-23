import { Devis } from './devis';

export class Ligne {

    public id: number;
    public quantite: number;
    public remise: number;
    public remarques: string;
    public devis: Devis;

    constructor(id: number, quantite: number, remise: number, remarques: string, devis: Devis) {
        this.id = id;
        this.quantite = quantite;
        this.remise = remise;
        this.remarques = remarques;
        this.devis = devis;
    }

    public static newEmpty() {
        return new Ligne(undefined, undefined, undefined, undefined, undefined);
    }

    public toJSON(): string {
        let plainObject = {
            id: undefined,
            quantite: undefined,
            remise: undefined,
            remarques: undefined,
            devisId: undefined
        }

        plainObject.id = this.id;
        plainObject.quantite = this.quantite;
        plainObject.remise = this.remise;
        plainObject.remarques = this.remarques;
        plainObject.devisId = (this.devis !== undefined ? this.devis.id : undefined);

        return JSON.stringify(plainObject);
    }

}