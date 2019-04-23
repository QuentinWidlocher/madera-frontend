import { Caracteristique } from './caracteristique';

export class Unite {

    public id: number;
    public code: string;
    public name: string;
    public caracteristiques: Caracteristique[];

    constructor(id: number, code: string, name: string, caracteristiques: Caracteristique[]) {
        this.id = id;
        this.code = code;
        this.name = name;
        this.caracteristiques = caracteristiques;
    }

    public static newEmpty() {
        return new Unite(undefined, undefined, undefined, undefined);
    }

    public toJSON(): string {
        let plainObject = {
            id: undefined,
            code: undefined,
            name: undefined,
        }

        plainObject.id = this.id;
        plainObject.code = this.code;
        plainObject.name = this.name;

        return JSON.stringify(plainObject);
    }
}