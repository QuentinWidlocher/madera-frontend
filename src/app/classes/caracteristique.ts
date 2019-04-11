import { Module } from './module';
import { Unite } from './unite';

export class Caracteristique {

    public id?: number;
    public description: string;
    public value: number;
    public module: Module;
    public unite: Unite;

    constructor(id: number, description: string, value: number, module: Module, unite: Unite) {
        this.id = id;
        this.description = description;
        this.value = value;
        this.module = module;
        this.unite = unite;
    }

    public static newEmpty(): Caracteristique {
        return new Caracteristique(undefined, undefined, undefined, undefined, undefined);
    }

    public toPlain(withId = false): Caracteristique {
        const result = {
            description: this.description,
            value: this.value
        } as Caracteristique;

        if (withId) {
            result.id = this.id;
        }

        return result;
    }

    public get valueUnite(): string {
        return this.value + ' ' + this.unite.code;
    }

}