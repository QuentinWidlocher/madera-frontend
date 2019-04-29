import { Devis } from './devis';

export class Ligne {

    public id: number;
    public designation: string;
    public gamme: string;
    public quantite: number;
    public unitPriceNoTax: number;
    public unitPriceTax: number;
    public remise: number;
    public remarques: string;
    public devis: Devis;

    constructor(id: number, designation: string, gamme: string, quantite: number, unitPriceNoTax: number, unitPriceTax: number,
                remise: number, remarques: string, devis: Devis) {
        this.id = id;
        this.designation = designation;
        this.gamme = gamme;
        this.quantite = quantite;
        this.unitPriceNoTax = unitPriceNoTax;
        this.unitPriceTax = unitPriceTax;
        this.remise = remise;
        this.remarques = remarques;
        this.devis = devis;
    }

    public static newEmpty() {
        return new Ligne(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined);
    }

    public toJSON(): string {
        let plainObject = {
            id: undefined,
            designation: undefined,
            gamme: undefined,
            quantite: undefined,
            unitPriceTax: undefined,
            unitPriceNoTax: undefined,
            remise: undefined,
            remarques: undefined,
            devisId: undefined
        }

        plainObject.id = this.id;
        plainObject.designation = this.designation;
        plainObject.gamme = this.gamme;
        plainObject.quantite = this.quantite;
        plainObject.unitPriceTax = this.unitPriceTax;
        plainObject.unitPriceNoTax = this.unitPriceNoTax;
        plainObject.remise = this.remise;
        plainObject.remarques = this.remarques;
        plainObject.devisId = (this.devis !== undefined ? this.devis.id : undefined);

        return JSON.stringify(plainObject);
    }

}