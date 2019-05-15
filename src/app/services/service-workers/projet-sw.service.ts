import {
  Injectable
} from '@angular/core';
import {
  Projet
} from 'src/app/classes/projet';
import {
  ConnectivityService
} from '../connectivity.service';
import {
  ProjetApiService
} from '../api/projet-api.service';
import {
  IndexedDbService
} from '../indexed-db.service';
import Dexie from 'dexie';
import {
  DeferredQuery
} from 'src/app/classes/deferred-query';
import {
  DeferredQueriesService
} from '../deferred-queries.service';
import {
  Client
} from 'src/app/classes/client';
import {
  DossierTechnique
} from 'src/app/classes/dossier-technique';
import {
  Devis
} from 'src/app/classes/devis';
import {
  DevisSwService
} from './devis-sw.service';
import {
  User
} from 'src/app/classes/user';
import {
  DossierTechniqueSwService
} from './dossier-technique-sw.service';

@Injectable({
  providedIn: 'root'
})
export class ProjetSwService {

  idb: Dexie.Table<Projet, number>;

  constructor(private connectivity: ConnectivityService,
    private api: ProjetApiService,
    private idbService: IndexedDbService,
    private deferredQueries: DeferredQueriesService,
    private devisSw: DevisSwService,
    private dossierTechniqueSw: DossierTechniqueSwService) {
    this.idb = this.idbService.projets;
  }


  ///
  /// GET ALL
  ///
  getAll(): Promise<Projet[]> {

    // On prépare le résultat qui serra retourné dans la promesse
    let result: Promise<Projet[]>;

    // On retourne une Promise qui va résoudre le résultat
    return new Promise(rtrn => {

      // On utilise connectivity service pour savoir l'état de la connexion
      this.connectivity.isConnected.then(isConnected => {

        if (isConnected) {

          // Si on peux toucher l'API, on la call, on remplace la base locale par les nouvelles données
          result = new Promise(rslv => {

            this.api.getAll().subscribe((projets: Projet[]) => {

              // On vide la base locale
              this.idb.clear();

              // On ajoute à l'IDB les données obtenue
              projets.forEach((projet, index) => {
                this.idb.add(projet);
                projets[index].client = Object.assign(Client.newEmpty(), projet.client);
                projets[index].dossierTechnique = Object.assign(DossierTechnique.newEmpty(), projet.dossierTechnique);
                projets[index].user = Object.assign(User.newEmpty(), projet.user);
                projets[index].devis = Object.assign(Devis.newEmpty(), projet.devis);
                projets[index].creationDate = new Date(projets[index].creationDate);
                projets[index].editionDate = new Date(projets[index].editionDate);
                projets[index].endDate = (projets[index].endDate ? new Date(projets[index].endDate) : null); 
              });

              // On résout les données de la Promesse
              rslv(projets);
            }, error => {

              // Si on détecte une erreur, on attend un changement de connexion et on réessaye
              this.connectivity.event.subscribe(connected => rslv(this.getAll()));

            });
          });
        } else {

          // Si on ne peux pas toucher l'API, on call simplement l'IDB
          result = new Promise(rslv => {

            // On boucle sur tout les résultats et on transforme les objets anonymes en objets typés
            this.idb.toArray().then(projets => {
              projets.forEach((projet, index) => {
                this.idb.add(projet);
                projets[index].client = Object.assign(Client.newEmpty(), projet.client);
                projets[index].dossierTechnique = Object.assign(DossierTechnique.newEmpty(), projet.dossierTechnique);
                projets[index].user = Object.assign(User.newEmpty(), projet.user);
                projets[index].devis = Object.assign(Devis.newEmpty(), projet.devis);
                projets[index].creationDate = new Date(projets[index].creationDate);
                projets[index].editionDate = new Date(projets[index].editionDate);
                projets[index].endDate = (projets[index].endDate ? new Date(projets[index].endDate) : null); 
              });

              // On résout les données de la Promesse
              rslv(projets);
            });

          });
        }
      }).finally(() => {
        rtrn(result);
      });
    });
  }



  ///
  /// GET ONE
  ///
  get(id: number): Promise<Projet> {

    // On prépare le résultat qui serra retourné dans la promesse
    let result: Promise<Projet>;

    // On retourne une Promise qui va résoudre le résultat
    return new Promise(rtrn => {

      // On utilise connectivity service pour savoir l'état de la connexion
      this.connectivity.isConnected.then(isConnected => {
        if (isConnected) {

          // Si on touche l'API, on la call, on ajoute/modifie l'enregistrement local et on retourne
          result = new Promise(rslv => {
            this.api.get(id).subscribe((projet: Projet) => {

              projet.client = Object.assign(Client.newEmpty(), projet.client);
              projet.dossierTechnique = Object.assign(DossierTechnique.newEmpty(), projet.dossierTechnique);
              projet.user = Object.assign(User.newEmpty(), projet.user);
              projet.devis = Object.assign(Devis.newEmpty(), projet.devis);
              projet.creationDate = new Date(projet.creationDate);
              projet.editionDate = new Date(projet.editionDate);
              projet.endDate = (projet.endDate ? new Date(projet.endDate) : null); 

              // Avec la nouvelle données, on ajoute/modifie l'enregistrement
              this.idb.put(projet);

              // On résout les données de la Promesse
              rslv(projet);
            }, error => {

              // Si on détecte une erreur, on attend un changement de connexion et on réessaye
              this.connectivity.event.subscribe(connected => rslv(this.get(id)));

            });
          });
        } else {

          // Si on ne peux pas toucher l'API on call simplement l'IDB
          result = new Promise(rslv => {
            // Si on ne peux pas toucher l'API on call simplement l'IDB
            this.idb.get(id).then(projet => {

              projet.client = Object.assign(Client.newEmpty(), projet.client);
              projet.dossierTechnique = Object.assign(DossierTechnique.newEmpty(), projet.dossierTechnique);
              projet.user = Object.assign(User.newEmpty(), projet.user);
              projet.devis = Object.assign(Devis.newEmpty(), projet.devis);
              projet.creationDate = new Date(projet.creationDate);
              projet.editionDate = new Date(projet.editionDate);
              projet.endDate = (projet.endDate ? new Date(projet.endDate) : null); 

              rslv(projet);
            });
          });
        }
      }).finally(() => {
        rtrn(result);
      });
    });
  }


  ///
  /// ADD
  ///
  add(projet: Projet): Promise<Projet> {

    // On prépare le résultat qui serra retourné dans la promesse
    let result: Promise<any>;

    projet.editionDate = new Date(Date.now());
    //projet.endDate = (projet.endDate == null ? new Date('0001-01-01') : projet.endDate);

    projet.clientId = projet.client.id;

    // On retourne une Promise qui va résoudre le résultat
    return new Promise(rtrn => {

      // On utilise connectivity service pour savoir l'état de la connexion
      this.connectivity.isConnected.then(isConnected => {

        if (isConnected) {

          // Si on touche l'API, on la call, on ajoute la données dans la base et dans l'IDB
          result = new Promise(rslv => {

            this.api.add(projet).subscribe((added: Projet) => {

              added.client = projet.client;
              added.devis = projet.devis;
              added.dossierTechnique = projet.dossierTechnique;
              added.user = projet.user;
              added.creationDate = projet.creationDate;
              added.editionDate = projet.editionDate;
              added.endDate = projet.endDate

              // On ajoute aussi à l'IDB
              this.idb.add(added);

              // On résout les données de la Promesse
              rslv(added);

            }, error => {

              // Si on détecte une erreur, on attend un changement de connexion et on réessaye
              this.connectivity.event.subscribe(connected => rslv(this.add(projet)));

            });

          });
        } else {

          result = new Promise(rslv => {

            // On doit trouver le dernier id pour pouvoir ajouter la donnée
            this.idb.orderBy('id').reverse().first().then(lastRecord => {

              // S'il n'y a pas d'enregistrement on prend 1, sinon le dernier ID + 1
              const nextId = lastRecord === undefined ? 1 : (lastRecord.id + 1);

              // On met à jour l'objet qu'on va ajouter
              projet.id = nextId;

              // On ajoute une requête différée pour update la base plus tard
              this.deferredQueries.add(new DeferredQuery(projet, 'add', 'projet'));

              result = this.idb.add(projet);
              rslv(projet);

            });
          });

        }
      }).finally(() => {
        rtrn(result);
      });
    });
  }


  ///
  /// EDIT
  ///
  edit(projet: Projet): Promise<any> {

    // On prépare le résultat qui serra retourné dans la promesse
    let result: Promise<any>;

    projet.editionDate = new Date(Date.now());
    //projet.endDate = (projet.endDate == null ? new Date('0001-01-01') : projet.endDate);

    // On retourne une Promise qui va résoudre le résultat
    return new Promise(rtrn => {

      // On utilise connectivity service pour savoir l'état de la connexion
      this.connectivity.isConnected.then(isConnected => {

        if (isConnected) {

          // Si on peux toucher l'API, on la call, on remplace la base locale par les nouvelles données
          result = new Promise(rslv => {

            this.api.edit(projet).subscribe(() => {

              // On met à jour l'enregistrement dans l'IDB
              this.idb.update(projet.id, {
                ...projet
              });

              // On résout vide, histoire de dire que c'est fini
              rslv();
            }, error => {

              // Si on détecte une erreur, on attend un changement de connexion et on réessaye
              this.connectivity.event.subscribe(connected => rslv(this.edit(projet)));

            });
          });
        } else {

          // On met à jour l'enregistrement dans l'IDB
          result = this.idb.update(projet.id, {
            ...projet
          });

          // On ajoute une requête différée pour update la base plus tard
          this.deferredQueries.add(new DeferredQuery(projet, 'edit', 'projet'));
        }

      }).finally(() => {
        rtrn(result);
      });
    });

  }


  ///
  /// DELETE
  ///
  delete(projet: Projet): Promise<any> {

    // On prépare le résultat qui serra retourné dans la promesse
    let result: Promise<any>;

    // On retourne une Promise qui va résoudre le résultat
    return new Promise(rtrn => {

      // On utilise connectivity service pour savoir l'état de la connexion
      this.connectivity.isConnected.then(isConnected => {

        if (isConnected) {

          result = new Promise(rslv => {

            // On delete en base
            this.api.delete(projet).subscribe(() => {

              // Et on delete dans l'idb
              this.idb.delete(projet.id);

              // On supprime les devis ratachés
              this.devisSw.delete(projet.devis.id);

              // On résout vide, histoire de dire que c'est fini
              rslv();
            }, error => {

              // Si on détecte une erreur, on attend un changement de connexion et on réessaye
              this.connectivity.event.subscribe(connected => rslv(this.delete(projet)));

            });
          });

        } else {

          // Si on ne peux pas toucher l'API, on delete simplement dans l'IDB
          result = this.idb.delete(projet.id);

          // On ajoute une requête différée pour update la base plus tard
          this.deferredQueries.add(new DeferredQuery(projet, 'delete', 'projet'));
        }
      }).finally(() => {
        rtrn(result);
      });

    });

  }


  ///
  /// COUNT
  ///
  count(): Promise<number> {

    // On prépare le résultat qui serra retourné dans la promesse
    let result: Promise<number>;

    // On retourne une Promise qui va résoudre le résultat
    return new Promise(rtrn => {

      // On utilise connectivity service pour savoir l'état de la connexion
      this.connectivity.isConnected.then(isConnected => {

        if (isConnected) {

          // Si on peux toucher l'API, on la call
          result = new Promise(rslv => {
            this.api.count().subscribe(count => rslv(+count),
              error => {

                // Si on détecte une erreur, on attend un changement de connexion et on réessaye
                this.connectivity.event.subscribe(connected => rslv(this.count()));

              });
          });

        } else {

          // Si on ne peux pas toucher l'API, on call simplement l'IDB
          result = this.idb.count();

        }
      }).finally(() => {
        rtrn(result);
      });

    });

  }

}
