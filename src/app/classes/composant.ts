import { CoupeDePrincipe } from './coupe-de-principe';
import { FamilleComposant } from './famille-composant';
import { GammeComposant } from './gamme-composant';

export class Composant {

    public id: number;
    public name: string;
    public unitPriceNoTax: number;
    public unitPriceTax: number;
    public coupesDePrincipe: CoupeDePrincipe[];
    public familleComposant: FamilleComposant;
    public gammeComposant: GammeComposant;

    constructor(id: number, name: string, unitPriceNoTax: number, unitPriceTax: number,
                coupesDePrincipe: CoupeDePrincipe[], familleComposant: FamilleComposant, gammeComposant: GammeComposant) {
        this.id = id;
        this.name = name;
        this.unitPriceNoTax = unitPriceNoTax;
        this.unitPriceTax = unitPriceTax;
        this.coupesDePrincipe = coupesDePrincipe;
        this.familleComposant = familleComposant;
        this.gammeComposant = gammeComposant;
    }

}