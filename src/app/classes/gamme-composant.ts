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

}