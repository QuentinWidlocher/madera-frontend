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
}