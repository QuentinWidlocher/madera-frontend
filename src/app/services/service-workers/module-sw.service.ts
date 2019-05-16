import {
  Injectable
} from '@angular/core';
import {
  ConnectivityService
} from '../connectivity.service';
import {
  ModuleApiService
} from '../api/module-api.service';
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
  Devis
} from 'src/app/classes/devis';
import {
  Modele
} from 'src/app/classes/modele';
import {
  Plan
} from 'src/app/classes/plan';
import {
  Projet
} from 'src/app/classes/projet';
import { Composant } from 'src/app/classes/composant';
import { Module } from 'src/app/classes/module';
import { Unite } from 'src/app/classes/unite';
import { Caracteristique } from 'src/app/classes/caracteristique';
import { CoupeDePrincipe } from 'src/app/classes/coupe-de-principe';
import { Produit } from 'src/app/classes/produit';
import { ComposantModule } from '../../classes/composantModule';
import { ProduitModule } from '../../classes/produitModule';
import { ModuleBase } from '../../classes/moduleBase';

@Injectable({
  providedIn: 'root'
})
export class ModuleSwService {

  idb: Dexie.Table<Module, number>;

  constructor(private connectivity: ConnectivityService,
    private api: ModuleApiService,
    private idbService: IndexedDbService,
    private deferredQueries: DeferredQueriesService) {
    this.idb = this.idbService.modules;
  }


  ///
  /// GET ALL
  ///
  getAll(): Promise<Module[]> {

    // On prépare le résultat qui serra retourné dans la promesse
    let result: Promise<Module[]>;

    // On retourne une Promise qui va résoudre le résultat
    return new Promise(rtrn => {

      // On utilise connectivity service pour savoir l'état de la connexion
      this.connectivity.isConnected.then(isConnected => {

        if (isConnected) {

          // Si on peux toucher l'API, on la call, on remplace la base locale par les nouvelles données
          result = new Promise(rslv => {

            this.api.getAll().subscribe((modules: Module[]) => {

              // On vide la base locale
              this.idb.clear();

              // On ajoute à l'IDB les données obtenue
              modules.forEach((module, index) => {
                this.idb.add(module);
                modules[index].caracteristiques = (module.caracteristiques ? module.caracteristiques.map(caracteristique => Object.assign(Caracteristique.newEmpty(), caracteristique)) : []);
                modules[index].moduleBase = Object.assign(ModuleBase.newEmpty(), module.moduleBase);
                modules[index].coupeDePrincipe = Object.assign(CoupeDePrincipe.newEmpty(), module.coupeDePrincipe);
                modules[index].produitModule = module.produitModule.map(produitModule => Object.assign(ProduitModule.newEmpty(), produitModule));
                modules[index].creationDate = new Date(module.creationDate);
                modules[index].editionDate = new Date(module.editionDate);

              });

              // On résout les données de la Promesse
              rslv(modules);
            }, error => {

              // Si on détecte une erreur, on attend un changement de connexion et on réessaye
              this.connectivity.event.subscribe(connected => rslv(this.getAll()));

            });
          });
        } else {

          // Si on ne peux pas toucher l'API, on call simplement l'IDB
          result = new Promise(rslv => {

            // On boucle sur tout les résultats et on transforme les objets anonymes en objets typés
            this.idb.toArray().then(modules => {
              modules.forEach((module, index) => {
                this.idb.add(module);
                modules[index].caracteristiques = (module.caracteristiques ? module.caracteristiques.map(caracteristique => Object.assign(Caracteristique.newEmpty(), caracteristique)) : []);
                modules[index].moduleBase = Object.assign(ModuleBase.newEmpty(), module.moduleBase);
                modules[index].coupeDePrincipe = Object.assign(CoupeDePrincipe.newEmpty(), module.coupeDePrincipe);
                modules[index].produitModule = module.produitModule.map(produitModule => Object.assign(ProduitModule.newEmpty(), produitModule));
                modules[index].creationDate = new Date(module.creationDate);
                modules[index].editionDate = new Date(module.editionDate);
              });

              // On résout les données de la Promesse
              rslv(modules);
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
  get(id: number): Promise<Module> {

    // On prépare le résultat qui serra retourné dans la promesse
    let result: Promise<Module>;

    // On retourne une Promise qui va résoudre le résultat
    return new Promise(rtrn => {

      // On utilise connectivity service pour savoir l'état de la connexion
      this.connectivity.isConnected.then(isConnected => {
        if (isConnected) {

          // Si on touche l'API, on la call, on ajoute/modifie l'enregistrement local et on retourne
          result = new Promise(rslv => {
            this.api.get(id).subscribe((module: Module) => {

              module.caracteristiques = (module.caracteristiques ? module.caracteristiques.map(caracteristique => Object.assign(Caracteristique.newEmpty(), caracteristique)) : []);
              module.moduleBase = Object.assign(ModuleBase.newEmpty(), module.moduleBase);
              module.coupeDePrincipe = Object.assign(CoupeDePrincipe.newEmpty(), module.coupeDePrincipe);
              module.produitModule = module.produitModule.map(produitModule => Object.assign(ProduitModule.newEmpty(), produitModule));
              module.creationDate = new Date(module.creationDate);
              module.editionDate = new Date(module.editionDate);

              // Avec la nouvelle données, on ajoute/modifie l'enregistrement
              this.idb.put(module);

              // On résout les données de la Promesse
              rslv(module);
            }, error => {

              // Si on détecte une erreur, on attend un changement de connexion et on réessaye
              this.connectivity.event.subscribe(connected => rslv(this.get(id)));

            });
          });
        } else {

          result = new Promise(rslv => {
            // Si on ne peux pas toucher l'API on call simplement l'IDB
            this.idb.get(id).then(module => {
              module.caracteristiques = (module.caracteristiques ? module.caracteristiques.map(caracteristique => Object.assign(Caracteristique.newEmpty(), caracteristique)) : []);
              module.moduleBase = Object.assign(ModuleBase.newEmpty(), module.moduleBase);
              module.coupeDePrincipe = Object.assign(CoupeDePrincipe.newEmpty(), module.coupeDePrincipe);
              module.produitModule = module.produitModule.map(produitModule => Object.assign(ProduitModule.newEmpty(), produitModule));
              module.creationDate = new Date(module.creationDate);
              module.editionDate = new Date(module.editionDate);

              rslv(module);
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
  add(module: Module): Promise<Module> {

    // On prépare le résultat qui serra retourné dans la promesse
    let result: Promise<any>;

    // On retourne une Promise qui va résoudre le résultat
    return new Promise(rtrn => {

      // On utilise connectivity service pour savoir l'état de la connexion
      this.connectivity.isConnected.then(isConnected => {

        if (isConnected) {

          // Si on touche l'API, on la call, on ajoute la données dans la base et dans l'IDB
          result = new Promise(rslv => {

            this.api.add(module).subscribe((added: Module) => {

              // On ajoute aussi à l'IDB
              this.idb.add(added);

              added.caracteristiques = module.caracteristiques;
              added.moduleBase = module.moduleBase;
              added.coupeDePrincipe = module.coupeDePrincipe;
              added.creationDate = module.creationDate;
              added.editionDate = module.editionDate;
              added.produitModule = module.produitModule;

              // On résout les données de la Promesse
              rslv(added);

            }, error => {

              // Si on détecte une erreur, on attend un changement de connexion et on réessaye
              this.connectivity.event.subscribe(connected => rslv(this.add(module)));

            });
          });
        } else {

          result = new Promise(rslv => {

            // On doit trouver le dernier id pour pouvoir ajouter la donnée
            //this.idb.orderBy('id').reverse().first().then(lastRecord => {

              // S'il n'y a pas d'enregistrement on prend 1, sinon le dernier ID + 1
              //const nextId = lastRecord === undefined ? 1 : (lastRecord.id + 1);

              // On met à jour l'objet qu'on va ajouter
              module.id = this.getRandomIntInclusive(2000,2000000);

              // On ajoute une requête différée pour update la base plus tard
              this.deferredQueries.add(new DeferredQuery(module, 'add', 'module'));

              result = this.idb.add(module).then(()=>{ rslv(module);});


           // });
          });

        }
      }).finally(() => {
        rtrn(result);
      });
    });
  }

  getRandomIntInclusive(min : number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min +1)) + min;
  }
  ///
  /// EDIT
  ///
  edit(module: Module): Promise<any> {

    // On prépare le résultat qui serra retourné dans la promesse
    let result: Promise<any>;

    // On retourne une Promise qui va résoudre le résultat
    return new Promise(rtrn => {

      // On utilise connectivity service pour savoir l'état de la connexion
      this.connectivity.isConnected.then(isConnected => {

        if (isConnected) {

          // Si on peux toucher l'API, on la call, on remplace la base locale par les nouvelles données
          result = new Promise(rslv => {

            this.api.edit(module).subscribe(() => {

              // On met à jour l'enregistrement dans l'IDB
              this.idb.update(module.id, {
                ...module
              });

              // On résout vide, histoire de dire que c'est fini
              rslv();
            }, error => {

              // Si on détecte une erreur, on attend un changement de connexion et on réessaye
              this.connectivity.event.subscribe(connected => rslv(this.edit(module)));

            });
          });
        } else {

          // On met à jour l'enregistrement dans l'IDB
          result = this.idb.update(module.id, {
            ...module
          });

          // On ajoute une requête différée pour update la base plus tard
          this.deferredQueries.add(new DeferredQuery(module, 'edit', 'module'));
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
            this.api.delete(Object.assign(Module.newEmpty(), {
              id
            })).subscribe(() => {

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
          }, 'delete', 'module'));
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
