import { Injectable } from '@angular/core';
import { Client } from 'src/app/classes/client';
import { ConnectivityService } from '../connectivity.service';
import { ClientApiService } from '../api/client-api.service';
import { IndexedDbService } from '../indexed-db.service';
import Dexie from 'dexie';
import { DeferredQuery } from 'src/app/classes/deferred-query';
import { DeferredQueriesService } from '../deferred-queries.service';
import { ProjetSwService } from './projet-sw.service';

@Injectable({
  providedIn: 'root'
})
export class ClientSwService {

  idb: Dexie.Table<Client, number>;

  constructor(private connectivity: ConnectivityService,
    private api: ClientApiService,
    private idbService: IndexedDbService,
    private deferredQueries: DeferredQueriesService,
    private projetSw: ProjetSwService) {
    this.idb = this.idbService.clients;
  }


  ///
  /// GET ALL
  ///
  getAll(): Promise<Client[]> {

    // On prépare le résultat qui serra retourné dans la promesse
    let result: Promise<Client[]>;

    // On retourne une Promise qui va résoudre le résultat
    return new Promise(rtrn => {

      // On utilise connectivity service pour savoir l'état de la connexion
      this.connectivity.isConnected.then(isConnected => {

        if (isConnected) {

          // Si on peux toucher l'API, on la call, on remplace la base locale par les nouvelles données
          result = new Promise(rslv => {

            this.api.getAll().subscribe((clients: Client[]) => {

              // On vide la base locale
              this.idb.clear();

              // On traite les données
              clients.forEach((client, index) => {

                // On ajoute à l'IDB les données obtenue
                this.idb.add(client);

                // On transforme l'objet anonyme en client
                clients[index] = Object.assign(Client.newEmpty(), client);
              });

              // On résout les données de la Promesse
              rslv(clients);
            }, error => {

              // Si on détecte une erreur, on attend un changement de connexion et on réessaye
              this.connectivity.event.subscribe(connected => rslv(this.getAll()));

            });
          });
        } else {

          // Si on ne peux pas toucher l'API, on call simplement l'IDB
          result = this.idb.toArray();
        }
      }).finally(() => { rtrn(result); });
    });
  }



  ///
  /// GET ONE
  ///
  get(id: number): Promise<Client> {

    // On prépare le résultat qui serra retourné dans la promesse
    let result: Promise<Client>;

    // On retourne une Promise qui va résoudre le résultat
    return new Promise(rtrn => {

      // On utilise connectivity service pour savoir l'état de la connexion
      this.connectivity.isConnected.then(isConnected => {
        if (isConnected) {

          // Si on touche l'API, on la call, on ajoute/modifie l'enregistrement local et on retourne
          result = new Promise(rslv => {
            this.api.get(id).subscribe((client: Client) => {

              // Avec la nouvelle données, on ajoute/modifie l'enregistrement
              this.idb.put(client);

              // On résout les données de la Promesse
              rslv(client);
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
  add(client: Client): Promise<Client> {

    // On prépare le résultat qui serra retourné dans la promesse
    let result: Promise<any>;

    // On retourne une Promise qui va résoudre le résultat
    return new Promise(rtrn => {

      // On utilise connectivity service pour savoir l'état de la connexion
      this.connectivity.isConnected.then(isConnected => {

        if (isConnected) {

          // Si on touche l'API, on la call, on ajoute la données dans la base et dans l'IDB
          result = new Promise(rslv => {

            this.api.add(client).subscribe((added: Client) => {

              // On ajoute aussi à l'IDB
              this.idb.add(added);

              added.projets = client.projets;

              // On résout les données de la Promesse
              rslv(added);

            }, error => {

              // Si on détecte une erreur, on attend un changement de connexion et on réessaye
              this.connectivity.event.subscribe(connected => rslv(this.add(client)));

            });
          });
        } else {

          result = new Promise(rslv => {

            // On doit trouver le dernier id pour pouvoir ajouter la donnée
            this.idb.orderBy('id').reverse().first().then(lastRecord => {

              // S'il n'y a pas d'enregistrement on prend 1, sinon le dernier ID + 1
              const nextId = lastRecord === undefined ? 1 : (lastRecord.id + 1);

              // On met à jour l'objet qu'on va ajouter
              client.id = nextId;

              // On ajoute une requête différée pour update la base plus tard
              this.deferredQueries.add(new DeferredQuery(client, 'add', 'client'));

              result = this.idb.add(client);
              rslv(client);

            });
          });

        }
      }).finally(() => { rtrn(result); });
    });
  }


  ///
  /// EDIT
  ///
  edit(client: Client): Promise<any> {

    // On prépare le résultat qui serra retourné dans la promesse
    let result: Promise<any>;

    // On retourne une Promise qui va résoudre le résultat
    return new Promise(rtrn => {

      // On utilise connectivity service pour savoir l'état de la connexion
      this.connectivity.isConnected.then(isConnected => {

        if (isConnected) {

          // Si on peux toucher l'API, on la call, on remplace la base locale par les nouvelles données
          result = new Promise(rslv => {

            this.api.edit(client).subscribe(() => {

              // On met à jour l'enregistrement dans l'IDB
              this.idb.update(client.id, { ...client });

              // On résout vide, histoire de dire que c'est fini
              rslv();
            }, error => {

              // Si on détecte une erreur, on attend un changement de connexion et on réessaye
              this.connectivity.event.subscribe(connected => rslv(this.edit(client)));

            });
          });
        } else {

          // On met à jour l'enregistrement dans l'IDB
          result = this.idb.update(client.id, { ...client });

          client.projets.forEach(projet => {
            projet.client = client;
            this.projetSw.edit(projet);
          })

          // On ajoute une requête différée pour update la base plus tard
          this.deferredQueries.add(new DeferredQuery(client, 'edit', 'client'));
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
            this.api.delete(Object.assign(Client.newEmpty(), { id })).subscribe(() => {

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
          this.deferredQueries.add(new DeferredQuery({ id }, 'delete', 'client'));
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
