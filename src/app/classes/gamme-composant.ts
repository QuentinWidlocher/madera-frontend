import { Composant } from './composant';

export class GammeComposant {

    public id: number;
    public code: string;
    public description: string;
    public material: string;
    public composants: Composant[];

    constructor(id: number, code: string, description: string, material: string, composants: Composant[]) {
        this.id = id;
        this.code = code;
        this.description = description;
        this.material = material;
        this.composants = composants;
    }

    public static newEmpty() {
        return new GammeComposant(undefined, undefined, undefined, undefined, undefined);
    }

    public toJSON(): string {
        let plainObject = {
            id: undefined,
            code: undefined,
            description: undefined,
            material: undefined,
            composantsIds: [],
        }

        plainObject.id = this.id;
        plainObject.code = this.code;
        plainObject.description = this.description;
        plainObject.material = this.material;
        plainObject.composantsIds = (this.composants !== undefined ? this.composants.map(x => x.id) : undefined);

        return JSON.stringify(plainObject);
    }

}