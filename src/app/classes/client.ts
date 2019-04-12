import { Projet } from './projet';

export class Client {

  public id: number;
  public code: string;
  public firstName: string;
  public lastName: string;
  public email: string;
  public phone: string;
  public mobile: string;
  public creationDate: Date;
  public projets: Projet[];

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

}
