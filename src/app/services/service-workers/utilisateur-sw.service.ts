import { Injectable } from '@angular/core';
import { Utilisateur } from 'src/app/classes/utilisateur';
import { ConnectivityService } from '../connectivity.service';
import { UtilisateurApiService } from '../api/utilisateur-api.service';
import { IndexedDbService } from '../indexed-db.service';
import Dexie from 'dexie';
import { DeferredQuery } from 'src/app/classes/deferred-query';
import { DeferredQueriesService } from '../deferred-queries.service';
import { Client } from 'src/app/classes/client';
import { Registration } from 'src/app/classes/registration';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurSwService {

  idb: Dexie.Table<Utilisateur, number>;

  constructor(private connectivity: ConnectivityService,
              private api: UtilisateurApiService,
              private idbService: IndexedDbService,
              private deferredQueries: DeferredQueriesService) {
    this.idb = this.idbService.utilisateurs;
  }


  ///
  /// GET ALL
  ///
  getAll(): Promise<Utilisateur[]> {

    // On prépare le résultat qui serra retourné dans la promesse
    let result: Promise<Utilisateur[]>;

    // On retourne une Promise qui va résoudre le résultat
    return new Promise(rtrn => {

      // On utilise connectivity service pour savoir l'état de la connexion
      this.connectivity.isConnected.then(isConnected => {

        if (isConnected) {

          // Si on peux toucher l'API, on la call, on remplace la base locale par les nouvelles données
          result = new Promise(rslv => {

            this.api.getAll().subscribe((utilisateurs: Utilisateur[]) => {

              // On vide la base locale
              this.idb.clear();

              // On ajoute à l'IDB les données obtenue
              utilisateurs.forEach((utilisateur, index) => {
                this.idb.add(utilisateur);
              });

              // On résout les données de la Promesse
              rslv(utilisateurs);
            }, error => {

              // Si on détecte une erreur, on attend un changement de connexion et on réessaye
              this.connectivity.event.subscribe(connected => rslv(this.getAll()));

            });
          });
        } else {

          // Si on ne peux pas toucher l'API, on call simplement l'IDB
          result = new Promise(rslv => {

            // On boucle sur tout les résultats et on transforme les objets anonymes en objets typés
            this.idb.toArray().then(utilisateurs => {
              utilisateurs.forEach((utilisateur, index) => {
                this.idb.add(utilisateur);
              });

              // On résout les données de la Promesse
              rslv(utilisateurs);
            });

          }); 
        }
      }).finally(() => { rtrn(result); });
    });
  }



  ///
  /// GET ONE
  ///
  get(id: number): Promise<Utilisateur> {

    // On prépare le résultat qui serra retourné dans la promesse
    let result: Promise<Utilisateur>;

    // On retourne une Promise qui va résoudre le résultat
    return new Promise(rtrn => {

      // On utilise connectivity service pour savoir l'état de la connexion
      this.connectivity.isConnected.then(isConnected => {
        if (isConnected) {

          // Si on touche l'API, on la call, on ajoute/modifie l'enregistrement local et on retourne
          result = new Promise(rslv => {
            this.api.get(id).subscribe((utilisateur: Utilisateur) => {

              // Avec la nouvelle données, on ajoute/modifie l'enregistrement
              this.idb.put(utilisateur);

              // On résout les données de la Promesse
              rslv(utilisateur);
            }, error => {

              // Si on détecte une erreur, on attend un changement de connexion et on réessaye
              this.connectivity.event.subscribe(connected => rslv(this.get(id)));

            });
          });
        } else {

          // Si on ne peux pas toucher l'API on call simplement l'IDB
          result = this.idb.get(id);
        }
      }).finally(() => { rtrn(result); });
    });
  }


  ///
  /// ADD
  ///
  add(utilisateur: Utilisateur): Promise<Utilisateur> {

    let registration = new Registration(utilisateur.username, utilisateur.password, utilisateur.role);
    
    // On prépare le résultat qui serra retourné dans la promesse
    let result: Promise<any>;

    // On retourne une Promise qui va résoudre le résultat
    return new Promise(rtrn => {

      // On utilise connectivity service pour savoir l'état de la connexion
      this.connectivity.isConnected.then(isConnected => {

        if (isConnected) {

          // Si on touche l'API, on la call, on ajoute la données dans la base et dans l'IDB
          result = new Promise(rslv => {
            this.api.add(registration).subscribe((added: Utilisateur) => {

              // On ajoute aussi à l'IDB
              this.idb.add(added);

              // On résout les données de la Promesse
              rslv(added);

            }, error => {

              // Si on détecte une erreur, on attend un changement de connexion et on réessaye
              this.connectivity.event.subscribe(connected => rslv(this.add(utilisateur)));

            });
          });
        } else {

          result = new Promise(rslv => {

            // On doit trouver le dernier id pour pouvoir ajouter la donnée
            this.idb.orderBy('id').reverse().first().then(lastRecord => {

              // S'il n'y a pas d'enregistrement on prend 1, sinon le dernier ID + 1
              const nextId = lastRecord === undefined ? 1 : (lastRecord.id + 1);

              // On met à jour l'objet qu'on va ajouter
              utilisateur.id = nextId;

              // On ajoute une requête différée pour update la base plus tard
              this.deferredQueries.add(new DeferredQuery(registration, 'add', 'utilisateur'));

              result = this.idb.add(utilisateur);
              rslv(utilisateur);

            });
          });

        }
      }).finally(() => { rtrn(result); });
    });
  }


  ///
  /// EDIT
  ///
  edit(utilisateur: Utilisateur): Promise<any> {

    // On prépare le résultat qui serra retourné dans la promesse
    let result: Promise<any>;

    // On retourne une Promise qui va résoudre le résultat
    return new Promise(rtrn => {

      // On utilise connectivity service pour savoir l'état de la connexion
      this.connectivity.isConnected.then(isConnected => {

        if (isConnected) {

          // Si on peux toucher l'API, on la call, on remplace la base locale par les nouvelles données
          result = new Promise(rslv => {

            this.api.edit(utilisateur).subscribe(() => {

              // On met à jour l'enregistrement dans l'IDB
              this.idb.update(utilisateur.id, { ...utilisateur });

              // On résout vide, histoire de dire que c'est fini
              rslv();
            }, error => {

              // Si on détecte une erreur, on attend un changement de connexion et on réessaye
              this.connectivity.event.subscribe(connected => rslv(this.edit(utilisateur)));

            });
          });
        } else {

          // On met à jour l'enregistrement dans l'IDB
          result = this.idb.update(utilisateur.id, { ...utilisateur });

          // On ajoute une requête différée pour update la base plus tard
          this.deferredQueries.add(new DeferredQuery(utilisateur, 'edit', 'utilisateur'));
        }

      }).finally(() => { rtrn(result); });
    });

  }


  ///
  /// DELETE
  ///
  delete(id: number): Promise<any> {

    // On prépare le résultat qui serra retourné dans la promesse
    let result: Promise<any>;

    // On retourne une Promise qui va résoudre le résultat
    return new Promise(rtrn => {

      // On utilise connectivity service pour savoir l'état de la connexion
      this.connectivity.isConnected.then(isConnected => {

        if (isConnected) {

          result = new Promise(rslv => {

            // On delete en base
            this.api.delete(Object.assign(Utilisateur.newEmpty(), {id})).subscribe(() => {

              // Et on delete dans l'idb
              this.idb.delete(id);

              // On résout vide, histoire de dire que c'est fini
              rslv();
            }, error => {

              // Si on détecte une erreur, on attend un changement de connexion et on réessaye
              this.connectivity.event.subscribe(connected => rslv(this.delete(id)));

            });
          });

        } else {

          // Si on ne peux pas toucher l'API, on delete simplement dans l'IDB
          result = this.idb.delete(id);

          // On ajoute une requête différée pour update la base plus tard
          this.deferredQueries.add(new DeferredQuery({ id }, 'delete', 'utilisateur'));
        }
      }).finally(() => { rtrn(result); });

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
      }).finally(() => { rtrn(result); });

    });

  }

}
