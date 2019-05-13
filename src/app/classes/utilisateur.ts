import { DossierTechnique } from './dossier-technique';
import { Projet } from './projet';
import { Modele } from './modele';

export class Utilisateur {

  public id: number;
  public username: string;
  public password: string;
  public identityId: string;
  public projets: Projet[];
  public modeles: Modele[];
  public role: string;

  constructor(id: number, username: string, password: string, projets: Projet[], modeles: Modele[], role: string, identityId: string) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.projets = projets;
    this.modeles = modeles;
    this.role = role;
    this.identityId = identityId;
  }

  public static newEmpty(): Utilisateur {
    return new Utilisateur(undefined, undefined, undefined, undefined, undefined, undefined ,undefined);
  }

 
}
