import {
  Injectable
} from '@angular/core';
import {
  ConnectivityService
} from '../connectivity.service';
import {
  ModuleBaseApiService
} from '../api/module-base-api.service';
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

import { Composant } from 'src/app/classes/composant';
import { ComposantModule } from 'src/app/classes/composantModule';
import { Module } from 'src/app/classes/module';
import { Unite } from 'src/app/classes/unite';
import { DossierTechnique } from 'src/app/classes/dossier-technique';
import { ModuleBase } from 'src/app/classes/moduleBase';
import { User } from 'src/app/classes/user';
import { CCTP } from 'src/app/classes/cctp';
import { CoupeDePrincipe } from 'src/app/classes/coupe-de-principe';
import { Gamme } from 'src/app/classes/gamme';
import { Modele } from 'src/app/classes/modele';

@Injectable({
  providedIn: 'root'
})
export class ModuleBaseSwService {

  idb: Dexie.Table<ModuleBase, number>;

  constructor(private connectivity: ConnectivityService,
    private api: ModuleBaseApiService,
    private idbService: IndexedDbService,
    private deferredQueries: DeferredQueriesService) {
    this.idb = this.idbService.modulesBase;
  }


  ///
  /// GET ALL
  ///
  getAll(): Promise<ModuleBase[]> {

    // On prépare le résultat qui serra retourné dans la promesse
    let result: Promise<ModuleBase[]>;

    // On retourne une Promise qui va résoudre le résultat
    return new Promise(rtrn => {

      // On utilise connectivity service pour savoir l'état de la connexion
      this.connectivity.isConnected.then(isConnected => {

        if (isConnected) {

          // Si on peux toucher l'API, on la call, on remplace la base locale par les nouvelles données
          result = new Promise(rslv => {

            this.api.getAll().subscribe((modulesBase: ModuleBase[]) => {

              // On vide la base locale
              this.idb.clear();

              // On ajoute à l'IDB les données obtenue
              modulesBase.forEach((moduleBase, index) => {
                this.idb.add(moduleBase);
                modulesBase[index].composantModule = moduleBase.composantModule.map(composantModule => Object.assign(ComposantModule.newEmpty(), composantModule));
 
              });

              // On résout les données de la Promesse
              rslv(modulesBase);
            }, error => {

              // Si on détecte une erreur, on attend un changement de connexion et on réessaye
              this.connectivity.event.subscribe(connected => rslv(this.getAll()));

            });
          });
        } else {

          // Si on ne peux pas toucher l'API, on call simplement l'IDB
          result = new Promise(rslv => {

            // On boucle sur tout les résultats et on transforme les objets anonymes en objets typés
            this.idb.toArray().then(modulesBase => {
              modulesBase.forEach((moduleBase, index) => {
                this.idb.add(moduleBase);
                modulesBase[index].composantModule = moduleBase.composantModule.map(composantModule => Object.assign(ComposantModule.newEmpty(), composantModule));
              });

              // On résout les données de la Promesse
              rslv(modulesBase);
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
  get(id: number): Promise<ModuleBase> {

    // On prépare le résultat qui serra retourné dans la promesse
    let result: Promise<ModuleBase>;

    // On retourne une Promise qui va résoudre le résultat
    return new Promise(rtrn => {

      // On utilise connectivity service pour savoir l'état de la connexion
      this.connectivity.isConnected.then(isConnected => {
        if (isConnected) {

          // Si on touche l'API, on la call, on ajoute/modifie l'enregistrement local et on retourne
          result = new Promise(rslv => {
            this.api.get(id).subscribe((moduleBase: ModuleBase) => {
              moduleBase.composantModule = moduleBase.composantModule.map(composantModule => Object.assign(ComposantModule.newEmpty(), composantModule));

              // Avec la nouvelle données, on ajoute/modifie l'enregistrement
              this.idb.put(moduleBase);

              // On résout les données de la Promesse
              rslv(moduleBase);
            }, error => {

              // Si on détecte une erreur, on attend un changement de connexion et on réessaye
              this.connectivity.event.subscribe(connected => rslv(this.get(id)));

            });
          });
        } else {

          result = new Promise(rslv => {
            // Si on ne peux pas toucher l'API on call simplement l'IDB
            this.idb.get(id).then(moduleBase => {
              moduleBase.composantModule = moduleBase.composantModule.map(composantModule => Object.assign(ComposantModule.newEmpty(), composantModule));

              rslv(moduleBase);
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
  add(moduleBase: ModuleBase): Promise<ModuleBase> {

    // On prépare le résultat qui serra retourné dans la promesse
    let result: Promise<any>;

    // On retourne une Promise qui va résoudre le résultat
    return new Promise(rtrn => {

      // On utilise connectivity service pour savoir l'état de la connexion
      this.connectivity.isConnected.then(isConnected => {

        if (isConnected) {

          // Si on touche l'API, on la call, on ajoute la données dans la base et dans l'IDB
          result = new Promise(rslv => {

            this.api.add(moduleBase).subscribe((added: ModuleBase) => {

              // On ajoute aussi à l'IDB
              this.idb.add(added);

              added.composantModule = moduleBase.composantModule;

              // On résout les données de la Promesse
              rslv(added);

            }, error => {

              // Si on détecte une erreur, on attend un changement de connexion et on réessaye
              this.connectivity.event.subscribe(connected => rslv(this.add(moduleBase)));

            });
          });
        } else {

          result = new Promise(rslv => {

            // On doit trouver le dernier id pour pouvoir ajouter la donnée
            this.idb.orderBy('id').reverse().first().then(lastRecord => {

              // S'il n'y a pas d'enregistrement on prend 1, sinon le dernier ID + 1
              const nextId = lastRecord === undefined ? 1 : (lastRecord.id + 1);

              // On met à jour l'objet qu'on va ajouter
              moduleBase.id = nextId;

              // On ajoute une requête différée pour update la base plus tard
              this.deferredQueries.add(new DeferredQuery(moduleBase, 'add', 'moduleBase'));

              result = this.idb.add(moduleBase);
              rslv(moduleBase);

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
  edit(moduleBase: ModuleBase): Promise<any> {

    // On prépare le résultat qui serra retourné dans la promesse
    let result: Promise<any>;

    // On retourne une Promise qui va résoudre le résultat
    return new Promise(rtrn => {

      // On utilise connectivity service pour savoir l'état de la connexion
      this.connectivity.isConnected.then(isConnected => {

        if (isConnected) {

          // Si on peux toucher l'API, on la call, on remplace la base locale par les nouvelles données
          result = new Promise(rslv => {

            this.api.edit(moduleBase).subscribe(() => {

              // On met à jour l'enregistrement dans l'IDB
              this.idb.update(moduleBase.id, {
                ...moduleBase
              });

              // On résout vide, histoire de dire que c'est fini
              rslv();
            }, error => {

              // Si on détecte une erreur, on attend un changement de connexion et on réessaye
              this.connectivity.event.subscribe(connected => rslv(this.edit(moduleBase)));

            });
          });
        } else {

          // On met à jour l'enregistrement dans l'IDB
          result = this.idb.update(moduleBase.id, {
            ...moduleBase
          });

          // On ajoute une requête différée pour update la base plus tard
          this.deferredQueries.add(new DeferredQuery(moduleBase, 'edit', 'moduleBase'));
        }

      }).finally(() => {
        rtrn(result);
      });
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
            this.api.delete(Object.assign(ModuleBase.newEmpty(), { id })).subscribe(() => {

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
          this.deferredQueries.add(new DeferredQuery({
            id
          }, 'delete', 'moduleBase'));
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
