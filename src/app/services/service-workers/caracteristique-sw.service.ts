import { Injectable } from '@angular/core';
import { Caracteristique } from 'src/app/classes/caracteristique';
import { ConnectivityService } from '../connectivity.service';
import { CaracteristiqueApiService } from '../api/caracteristique-api.service';
import { IndexedDbService } from '../indexed-db.service';
import Dexie from 'dexie';
import { DeferredQuery } from 'src/app/classes/deferred-query';
import { DeferredQueriesService } from '../deferred-queries.service';

@Injectable({
  providedIn: 'root'
})
export class CaracteristiqueSwService {

  idb: Dexie.Table<Caracteristique, number>;

  constructor(private connectivity: ConnectivityService,
              private api: CaracteristiqueApiService,
              private idbService: IndexedDbService,
              private deferredQueries: DeferredQueriesService) {
    this.idb = this.idbService.caracteristiques;
  }

  getAll(): Promise<Caracteristique[]> {
    let result: Promise<Caracteristique[]>;

    return new Promise(rtrn => {
      this.connectivity.isConnected.then(isConnected => {
        if (isConnected) {

          // Si on peux toucher l'API, on la call, on remplace la base locale par les nouvelles données
          result = new Promise(rslv => {
            this.api.getAll().subscribe((caracteristiques: Caracteristique[]) => {

              // On vide la base locale
              this.idb.clear();

              // On ajoute à l'IDB les données obtenue
              caracteristiques.forEach(caracteristique => {
                this.idb.add(caracteristique);
              });

              rslv(caracteristiques);
            });
          });
        } else {

          // Si on ne peux pas toucher l'API, on call simplement l'IDB
          result = this.idb.toArray();
        }
      }).finally(() => { rtrn(result); });
    });
  }

  get(id: number): Promise<Caracteristique> {

    let result: Promise<Caracteristique>;

    return new Promise(rtrn => {
      this.connectivity.isConnected.then(isConnected => {
        if (isConnected) {

          // Si on touche l'API, on la call, on ajoute/modifie l'enregistrement local et on retourne
          result = new Promise(rslv => {
            this.api.get(id).subscribe((caracteristique: Caracteristique) => {
              this.idb.put(caracteristique, caracteristique.id);

              rslv(caracteristique);
            });
          });
        } else {

          // Si on ne peux pas toucher l'API on call simplement l'IDB
          result = this.idb.get(id);
        }
      }).finally(() => { rtrn(result); });
    });
  }

  add(caracteristique: Caracteristique): Promise<Caracteristique> {

    let result: Promise<any>;

    return new Promise(rtrn => {
      this.connectivity.isConnected.then(isConnected => {
        // Si on touche l'API, on la call, on ajoute la données dans la base et dans l'IDB
        if (isConnected) {
          result = new Promise(rslv => {
            this.api.add(caracteristique).subscribe((added: Caracteristique) => {
              this.idb.add(added);
              rslv(added);
            });
          });
        } else {

          result = new Promise(rslv => {

            // On doit trouver le dernier id pour pouvoir ajouter la donnée
            this.idb.orderBy('id').reverse().first().then(lastRecord => {

              const nextId = lastRecord === undefined ? 1 : (lastRecord.id + 1);
              caracteristique.id = nextId;

              // On ajoute une requête différée pour update la base plus tard
              this.deferredQueries.add(new DeferredQuery(caracteristique, 'add', 'caracteristique'));

              result = this.idb.add(caracteristique);
              rslv(caracteristique);

            });
          });

        }
      }).finally(() => { rtrn(result); });
    });
  }

  edit(caracteristique: Caracteristique): Promise<any> {

    let result: Promise<any>;

    return new Promise(rtrn => {
      this.connectivity.isConnected.then(isConnected => {

        if (isConnected) {
          result = new Promise(rslv => {
            this.api.edit(caracteristique).subscribe(() => {
              this.idb.update(caracteristique.id, { ...caracteristique });
              rslv();
            });
          });
        } else {
          result = this.idb.update(caracteristique.id, { ...caracteristique });

          // On ajoute une requête différée pour update la base plus tard
          this.deferredQueries.add(new DeferredQuery(caracteristique, 'edit', 'caracteristique'));
        }

      }).finally(() => { rtrn(result); });
    });

  }

  delete(id: number): Promise<any> {

    let result: Promise<any>;

    return new Promise(rtrn => {

      this.connectivity.isConnected.then(isConnected => {
        if (isConnected) {
          result = new Promise(rslv => {
            this.api.delete(Object.assign(Caracteristique.newEmpty(), {id})).subscribe(() => {
              this.idb.delete(id);
              rslv();
            });
          });
        } else {

          result = this.idb.delete(id);

          // On ajoute une requête différée pour update la base plus tard
          this.deferredQueries.add(new DeferredQuery({ id }, 'delete', 'caracteristique'));
        }
      }).finally(() => { rtrn(result); });

    });

  }

  count(): Promise<number> {

    let result: Promise<number>;

    return new Promise(rtrn => {

      this.connectivity.isConnected.then(isConnected => {
        if (isConnected) {
          result = new Promise(rslv => {
            this.api.count().subscribe(count => { rslv(+count); });
          });
        } else {
          result = this.idb.count();
        }
      }).finally(() => { rtrn(result); });

    });

  }

}