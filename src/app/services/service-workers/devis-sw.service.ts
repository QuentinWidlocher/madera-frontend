import { Injectable } from '@angular/core';
import { Devis } from 'src/app/classes/devis';
import { ConnectivityService } from '../connectivity.service';
import { DevisApiService } from '../api/devis-api.service';
import { IndexedDbService } from '../indexed-db.service';
import Dexie from 'dexie';
import { DeferredQuery } from 'src/app/classes/deferred-query';
import { DeferredQueriesService } from '../deferred-queries.service';
import { ProjetSwService } from './projet-sw.service';

@Injectable({
  providedIn: 'root'
})
export class DevisSwService {

  idb: Dexie.Table<Devis, number>;

  constructor(private connectivity: ConnectivityService,
    private api: DevisApiService,
    private idbService: IndexedDbService,
    private deferredQueries: DeferredQueriesService,
    // private projetSw: ProjetSwService
    ) {
    this.idb = this.idbService.devis;
  }


  ///
  /// GET ALL
  ///
  getAll(): Promise<Devis[]> {

    // On prépare le résultat qui serra retourné dans la promesse
    let result: Promise<Devis[]>;

    // On retourne une Promise qui va résoudre le résultat
    return new Promise(rtrn => {

      // On utilise connectivity service pour savoir l'état de la connexion
      this.connectivity.isConnected.then(isConnected => {

        if (isConnected) {

          // Si on peux toucher l'API, on la call, on remplace la base locale par les nouvelles données
          result = new Promise(rslv => {

            this.api.getAll().subscribe((devis: Devis[]) => {

              // On vide la base locale
              this.idb.clear();

              // On traite les données
              devis.forEach((unDevis, index) => {

                // On ajoute à l'IDB les données obtenue
                this.idb.add(unDevis);

                // On transforme l'objet anonyme en unDevis
                devis[index] = Object.assign(Devis.newEmpty(), unDevis);
              });

              // On résout les données de la Promesse
              rslv(devis);
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
  get(id: number): Promise<Devis> {

    // On prépare le résultat qui serra retourné dans la promesse
    let result: Promise<Devis>;

    // On retourne une Promise qui va résoudre le résultat
    return new Promise(rtrn => {

      // On utilise connectivity service pour savoir l'état de la connexion
      this.connectivity.isConnected.then(isConnected => {
        if (isConnected) {

          // Si on touche l'API, on la call, on ajoute/modifie l'enregistrement local et on retourne
          result = new Promise(rslv => {
            this.api.get(id).subscribe((unDevis: Devis) => {

              // Avec la nouvelle données, on ajoute/modifie l'enregistrement
              this.idb.put(unDevis);

              // On résout les données de la Promesse
              rslv(unDevis);
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
  add(unDevis: Devis): Promise<Devis> {

    // On prépare le résultat qui serra retourné dans la promesse
    let result: Promise<any>;

    // On retourne une Promise qui va résoudre le résultat
    return new Promise(rtrn => {

      // On utilise connectivity service pour savoir l'état de la connexion
      this.connectivity.isConnected.then(isConnected => {

        if (isConnected) {

          // Si on touche l'API, on la call, on ajoute la données dans la base et dans l'IDB
          result = new Promise(rslv => {

            this.api.add(unDevis).subscribe((added: Devis) => {

              // On ajoute aussi à l'IDB
              this.idb.add(added);

              added.lignes = unDevis.lignes ? unDevis.lignes : undefined;
              added.projet = unDevis.projet;

              // On résout les données de la Promesse
              rslv(added);

            }, error => {

              // Si on détecte une erreur, on attend un changement de connexion et on réessaye
              this.connectivity.event.subscribe(connected => rslv(this.add(unDevis)));

            });
          });
        } else {

          result = new Promise(rslv => {

            // On doit trouver le dernier id pour pouvoir ajouter la donnée
            this.idb.orderBy('id').reverse().first().then(lastRecord => {

              // S'il n'y a pas d'enregistrement on prend 1, sinon le dernier ID + 1
              const nextId = lastRecord === undefined ? 1 : (lastRecord.id + 1);

              // On met à jour l'objet qu'on va ajouter
              unDevis.id = nextId;

              // On ajoute une requête différée pour update la base plus tard
              this.deferredQueries.add(new DeferredQuery(unDevis, 'add', 'devis'));

              result = this.idb.add(unDevis);
              rslv(unDevis);

            });
          });

        }
      }).finally(() => { rtrn(result); });
    });
  }


  ///
  /// EDIT
  ///
  edit(unDevis: Devis): Promise<any> {

    // On prépare le résultat qui serra retourné dans la promesse
    let result: Promise<any>;

    // On retourne une Promise qui va résoudre le résultat
    return new Promise(rtrn => {

      // On utilise connectivity service pour savoir l'état de la connexion
      this.connectivity.isConnected.then(isConnected => {

        if (isConnected) {

          // Si on peux toucher l'API, on la call, on remplace la base locale par les nouvelles données
          result = new Promise(rslv => {

            this.api.edit(unDevis).subscribe(() => {

              // On met à jour l'enregistrement dans l'IDB
              this.idb.update(unDevis.id, { ...unDevis });

              // On résout vide, histoire de dire que c'est fini
              rslv();
            }, error => {

              // Si on détecte une erreur, on attend un changement de connexion et on réessaye
              this.connectivity.event.subscribe(connected => rslv(this.edit(unDevis)));

            });
          });
        } else {

          // On met à jour l'enregistrement dans l'IDB
          result = this.idb.update(unDevis.id, { ...unDevis });

          unDevis.projet.devis = unDevis;
          // this.projetSw.edit(unDevis.projet);

          unDevis.lignes.forEach(ligne => {
            ligne.devis = unDevis;
            // TODO LigneSw
          });

          // On ajoute une requête différée pour update la base plus tard
          this.deferredQueries.add(new DeferredQuery(unDevis, 'edit', 'devis'));
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
            this.api.delete(Object.assign(Devis.newEmpty(), { id })).subscribe(() => {

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
          this.deferredQueries.add(new DeferredQuery({ id }, 'delete', 'devis'));
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
