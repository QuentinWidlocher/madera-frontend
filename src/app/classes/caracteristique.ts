import { Module } from './module';
import { Unite } from './unite';

export class Caracteristique {

    private _id: number;
    private _description: string;
    private _value: number;
    private _module: Module;
    private _unite: Unite;

    constructor(id: number, description: string, value: number, module: Module, unite: Unite) {
        this.id = id;
        this.description = description;
        this.value = value;
        this.module = module;
        this.unite = unite;
    }

    public get valueUnite(): string {
        return this.value + ' ' + this.unite.code;
    }

    //#region getters and setters
    public get unite(): Unite {
        return this._unite;
    }
    public set unite(unite: Unite) {
        this._unite = unite;
    }

    public get module(): Module {
        return this._module;
    }
    public set module(module: Module) {
        this._module = module;
    }

    public get value(): number {
        return this._value;
    }
    public set value(value: number) {
        this._value = value;
    }

    public get description(): string {
        return this._description;
    }
    public set description(description: string) {
        this._description = description;
    }

    public get id(): number {
        return this._id;
    }
    public set id(id: number) {
        this._id = id;
    }
    //#endregion

}