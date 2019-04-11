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

}