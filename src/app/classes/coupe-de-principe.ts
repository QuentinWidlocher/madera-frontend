import { Module } from './module';
import { Composant } from './composant';

export class CoupeDePrincipe {

    public id: number;
    public code: string;
    public name: string;
    public description: string;
    public thickness: number;
    public modules: Module[];
    public composants: Composant[];

    constructor(id: number, code: string, name: string, description: string, thickness: number,
                modules: Module[], composants: Composant[]) {
        this.id = id;
        this.code = code;
        this.name = name;
        this.description = description;
        this.thickness = thickness;
        this.modules = modules;
        this.composants = composants;
    }

}