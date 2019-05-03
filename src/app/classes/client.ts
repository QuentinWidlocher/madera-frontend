import { Projet } from './projet';

export class Client {

  public id: number;
  public firstName: string;
  public lastName: string;
  public email: string;
  public phone: string;
  public mobile: string;
  public creationDate: Date;
  public projets: Projet[];

  constructor(id: number, firstName: string, lastName: string, email: string,
              phone: string, mobile: string, creationDate: Date, projets: Projet[]) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.phone = phone;
    this.mobile = mobile;
    this.creationDate = creationDate;
    this.projets = projets;
  }

  public static newEmpty(): Client {
    return new Client(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined);
  }

  public get fullName(): string {
    return this.firstName + ' ' + this.lastName;
  }

  // public toJSON(): string {
  //   let plainObject = {
  //     id: undefined,
  //     firstName: undefined,
  //     lastName: undefined,
  //     email: undefined,
  //     phone: undefined,
  //     mobile: undefined,
  //     creationDate: undefined,
  //     projetsIds: []
  //   }

  //   plainObject.id = this.id;
  //   plainObject.firstName = this.firstName;
  //   plainObject.lastName = this.lastName;
  //   plainObject.email = this.email;
  //   plainObject.phone = this.phone;
  //   plainObject.mobile = this.mobile;
  //   plainObject.creationDate = (this.creationDate !== undefined ? this.creationDate.toISOString().slice(0, 19).replace('T', ' ') : undefined);
  //   plainObject.projetsIds = (this.projets !== undefined ? this.projets.map(x => x.id) : undefined);

  //   return JSON.stringify(plainObject);
  // }

}
