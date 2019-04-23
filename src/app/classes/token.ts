export class Token {
  id: string;
  role: string;
  auth_token: string;
  expiration: number;

  constructor(id: string, role: string, auth_token: string, expiration: number) {
    this.id = id;
    this.role = role;
    this.auth_token = auth_token;
    this.expiration = expiration;
  }
}
