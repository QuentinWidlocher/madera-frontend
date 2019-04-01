import { Module } from './module';

export class CoupeDePrincipe {

    private _id: number;
    private _code: string;
    private _name: string;
    private _description: string;
    private _thickness: number;
    private _modules: Module[];

    constructor(id: number, code: string, name: string, description: string, thickness: number, modules: Module[]) {
        this.id = id;
        this.code = code;
        this.name = name;
        this.description = description;
        this.thickness = thickness;
        this.modules = modules;
    }

    //#region getters and setters
    public get modules(): Module[] {
        return this._modules;
    }
    public set modules(modules: Module[]) {
        this._modules = modules;
    }

    public get thickness(): number {
        return this._thickness;
    }
    public set thickness(thickness: number) {
        this._thickness = thickness;
    }

    public get description(): string {
        return this._description;
    }
    public set description(description: string) {
        this._description = description;
    }

    public get name(): string {
        return this._name;
    }
    public set name(name: string) {
        this._name = name;
    }

    public get code(): string {
        return this._code;
    }
    public set code(code: string) {
        this._code = code;
    }

    public get id(): number {
        return this._id;
    }
    public set id(id: number) {
        this._id = id;
    }
    //#endregion

}