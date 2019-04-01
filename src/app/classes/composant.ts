import { CoupeDePrincipe } from './coupe-de-principe';
import { FamilleComposant } from './famille-composant';
import { GammeComposant } from './gamme-composant';

export class Composant {

    private _id: number;
    private _name: string;
    private _unitPriceNoTax: number;
    private _unitPriceTax: number;
    private _coupesDePrincipe: CoupeDePrincipe[];
    private _familleComposant: FamilleComposant;
    private _gammeComposant: GammeComposant;

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

    //#region getters and setters
    public get gammeComposant(): GammeComposant {
        return this._gammeComposant;
    }
    public set gammeComposant(gammeComposant: GammeComposant) {
        this._gammeComposant = gammeComposant;
    }

    public get familleComposant(): FamilleComposant {
        return this._familleComposant;
    }
    public set familleComposant(familleComposant: FamilleComposant) {
        this._familleComposant = familleComposant;
    }

    public get coupesDePrincipe(): CoupeDePrincipe[] {
        return this._coupesDePrincipe;
    }
    public set coupesDePrincipe(coupesDePrincipe: CoupeDePrincipe[]) {
        this._coupesDePrincipe = coupesDePrincipe;
    }

    public get unitPriceTax(): number {
        return this._unitPriceTax;
    }
    public set unitPriceTax(unitPriceTax: number) {
        this._unitPriceTax = unitPriceTax;
    }

    public get unitPriceNoTax(): number {
        return this._unitPriceNoTax;
    }
    public set unitPriceNoTax(unitPriceNoTax: number) {
        this._unitPriceNoTax = unitPriceNoTax;
    }

    public get name(): string {
        return this._name;
    }
    public set name(name: string) {
        this._name = name;
    }

    public get id(): number {
        return this._id;
    }
    public set id(id: number) {
        this._id = id;
    }
    //#endregion

}