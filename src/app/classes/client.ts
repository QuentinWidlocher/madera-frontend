import { Projet } from './projet';

export class Client {

  private _id: number;
  private _code: string;
  private _firstName: string;
  private _lastName: string;
  private _email: string;
  private _phone: string;
  private _mobile: string;
  private _creationDate: Date;
  private _projets: Projet[];

  constructor(id: number, code: string, firstName: string, lastName: string, email: string,
              phone: string, mobile: string, creationDate: Date, projets: Projet[]) {
    this.id = id;
    this.code = code;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.phone = phone;
    this.mobile = mobile;
    this.creationDate = creationDate;
    this.projets = projets;
  }

  public get fullName(): string {
    return this.firstName + ' ' + this.lastName;
  }

  //#region getter and setter
  public get id(): number {
    return this._id;
  }

  public get code(): string {
    return this._code;
  }

  public get firstName(): string {
    return this._firstName;
  }

  public get lastName(): string {
    return this._lastName;
  }

  public get email(): string {
    return this._email;
  }

  public get phone(): string {
    return this._phone;
  }

  public get mobile(): string {
    return this._mobile;
  }

  public get creationDate(): Date {
    return this._creationDate;
  }

  public set id(value: number) {
    this._id = value;
  }

  public set code(value: string) {
    this._code = value;
  }

  public set firstName(value: string) {
    this._firstName = value;
  }

  public set lastName(value: string) {
    this._lastName = value;
  }

  public set email(value: string) {
    this._email = value;
  }

  public set phone(value: string) {
    this._phone = value;
  }

  public set mobile(value: string) {
    this._mobile = value;
  }

  public set creationDate(value: Date) {
    this._creationDate = value;
  }

  public get projets(): Projet[] {
    return this._projets;
  }
  public set projets(projets: Projet[]) {
    this._projets = projets;
  }
  //#endregion

}
