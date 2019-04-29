export class Registration {

  public userName: string;
  public password: string;
  public role: string;

  constructor(userName: string, password: string, role: string) {
    this.userName = userName;
    this.password = password;
    this.role = role;
  }

  public toJSON(): string {
    let plainObject = {
      username: undefined,
      password: undefined,
      role: undefined
    }

    plainObject.username = this.userName;
    plainObject.password = this.password;
    plainObject.role = this.role;

    return JSON.stringify(plainObject);
  }

}
