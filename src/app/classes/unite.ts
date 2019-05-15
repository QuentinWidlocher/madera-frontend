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

   /* public toJSON(): string {
        let plainObject = {
            id: undefined,
            code: undefined,
            name: undefined,
            caracteristiquesIds: [],
        }

        plainObject.id = this.id;
        plainObject.code = this.code;
        plainObject.name = this.name;
        plainObject.caracteristiquesIds = (this.caracteristiques !== undefined ? this.caracteristiques.map(x => x.id) : undefined);

        return JSON.stringify(plainObject);
    }*/
}
