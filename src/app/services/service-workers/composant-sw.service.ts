import {
  Injectable
} from '@angular/core';
import {
  ConnectivityService
} from '../connectivity.service';
import {
  ComposantApiService
} from '../api/composant-api.service';
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
import { FamilleComposant } from 'src/app/classes/famille-composant';
import { GammeComposant } from 'src/app/classes/gamme-composant';

@Injectable({
  providedIn: 'root'
})
export class ComposantSwService {

  idb: Dexie.Table < Composant, number > ;

  constructor(private connectivity: ConnectivityService,
    private api: ComposantApiService,
    private idbService: IndexedDbService,
    private deferredQueries: DeferredQueriesService) {
    this.idb = this.idbService.composants;
  }


  ///
  /// GET ALL
  ///
  getAll(): Promise < Composant[] > {

    // On prépare le résultat qui serra retourné dans la promesse
    let result: Promise < Composant[] > ;

    // On retourne une Promise qui va résoudre le résultat
    return new Promise(rtrn => {

      // On utilise connectivity service pour savoir l'état de la connexion
      this.connectivity.isConnected.then(isConnected => {

        if (isConnected) {

          // Si on peux toucher l'API, on la call, on remplace la base locale par les nouvelles données
          result = new Promise(rslv => {

            this.api.getAll().subscribe((composants: Composant[]) => {

              // On vide la base locale
              this.idb.clear();

              // On ajoute à l'IDB les données obtenue
              composants.forEach((composant, index) => {
                this.idb.add(composant);
                  composants[index].caracteristiques = composant.caracteristiques.map(caracteristique => Object.assign(Composant.newEmpty(), caracteristique));
                    composants[index].familleComposant = Object.assign(FamilleComposant.newEmpty(), composant.familleComposant);
                  composants[index].gammeComposant = Object.assign(GammeComposant.newEmpty(), composant.gammeComposant);
                  composants[index].modules = composant.modules.map(module => Object.assign(Module.newEmpty(), module));
              });

              // On résout les données de la Promesse
              rslv(composants);
            }, error => {

              // Si on détecte une erreur, on attend un changement de connexion et on réessaye
              this.connectivity.event.subscribe(connected => rslv(this.getAll()));

            });
          });
        } else {

          // Si on ne peux pas toucher l'API, on call simplement l'IDB
          result = new Promise(rslv => {

            // On boucle sur tout les résultats et on transforme les objets anonymes en objets typés
            this.idb.toArray().then(composants => {
              composants.forEach((composant, index) => {
                this.idb.add(composant);
                  composants[index].caracteristiques = composant.caracteristiques.map(caracteristique => Object.assign(Composant.newEmpty(), caracteristique));
                  composants[index].familleComposant = Object.assign(FamilleComposant.newEmpty(), composant.familleComposant);
                  composants[index].gammeComposant = Object.assign(GammeComposant.newEmpty(), composant.gammeComposant);
                  composants[index].modules = composant.modules.map(module => Object.assign(Module.newEmpty(), module));
              });

              // On résout les données de la Promesse
              rslv(composants);
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
  get(id: number): Promise < Composant > {

    // On prépare le résultat qui serra retourné dans la promesse
    let result: Promise < Composant > ;

    // On retourne une Promise qui va résoudre le résultat
    return new Promise(rtrn => {

      // On utilise connectivity service pour savoir l'état de la connexion
      this.connectivity.isConnected.then(isConnected => {
        if (isConnected) {

          // Si on touche l'API, on la call, on ajoute/modifie l'enregistrement local et on retourne
          result = new Promise(rslv => {
            this.api.get(id).subscribe((composant: Composant) => {

                composant.caracteristiques = composant.caracteristiques.map(caracteristique => Object.assign(Caracteristique.newEmpty(), caracteristique));
                composant.familleComposant = Object.assign(FamilleComposant.newEmpty(), composant.familleComposant);
                composant.gammeComposant = Object.assign(GammeComposant.newEmpty(), composant.gammeComposant);
                composant.modules = composant.modules.map(module => Object.assign(Module.newEmpty(), module));

              // Avec la nouvelle données, on ajoute/modifie l'enregistrement
              this.idb.put(composant);

              // On résout les données de la Promesse
              rslv(composant);
            }, error => {

              // Si on détecte une erreur, on attend un changement de connexion et on réessaye
              this.connectivity.event.subscribe(connected => rslv(this.get(id)));

            });
          });
        } else {

            result = new Promise(rslv => {
                // Si on ne peux pas toucher l'API on call simplement l'IDB
                this.idb.get(id).then(composant => {
                    composant.caracteristiques = composant.caracteristiques.map(caracteristique => Object.assign(Composant.newEmpty(), caracteristique));
                    composant.familleComposant = Object.assign(FamilleComposant.newEmpty(), composant.familleComposant);
                    composant.gammeComposant = Object.assign(GammeComposant.newEmpty(), composant.gammeComposant);
                    composant.modules = composant.modules.map(module => Object.assign(Module.newEmpty(), module));

                    rslv(composant);
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
  add(composant: Composant): Promise < Composant > {

    // On prépare le résultat qui serra retourné dans la promesse
    let result: Promise < any > ;

    // On retourne une Promise qui va résoudre le résultat
    return new Promise(rtrn => {

      // On utilise connectivity service pour savoir l'état de la connexion
      this.connectivity.isConnected.then(isConnected => {

        if (isConnected) {

          // Si on touche l'API, on la call, on ajoute la données dans la base et dans l'IDB
          result = new Promise(rslv => {

            this.api.add(composant).subscribe((added: Composant) => {

              // On ajoute aussi à l'IDB
              this.idb.add(added);

                added.caracteristiques = composant.caracteristiques
                added.familleComposant = composant.familleComposant
                added.gammeComposant = composant.gammeComposant
                added.modules = composant.modules

              // On résout les données de la Promesse
              rslv(added);

            }, error => {

              // Si on détecte une erreur, on attend un changement de connexion et on réessaye
              this.connectivity.event.subscribe(connected => rslv(this.add(composant)));

            });
          });
        } else {

          result = new Promise(rslv => {

            // On doit trouver le dernier id pour pouvoir ajouter la donnée
            this.idb.orderBy('id').reverse().first().then(lastRecord => {

              // S'il n'y a pas d'enregistrement on prend 1, sinon le dernier ID + 1
              const nextId = lastRecord === undefined ? 1 : (lastRecord.id + 1);

              // On met à jour l'objet qu'on va ajouter
              composant.id = nextId;

              // On ajoute une requête différée pour update la base plus tard
              this.deferredQueries.add(new DeferredQuery(composant, 'add', 'composant'));

              result = this.idb.add(composant);
              rslv(composant);

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
  edit(composant: Composant): Promise < any > {

    // On prépare le résultat qui serra retourné dans la promesse
    let result: Promise < any > ;

    // On retourne une Promise qui va résoudre le résultat
    return new Promise(rtrn => {

      // On utilise connectivity service pour savoir l'état de la connexion
      this.connectivity.isConnected.then(isConnected => {

        if (isConnected) {

          // Si on peux toucher l'API, on la call, on remplace la base locale par les nouvelles données
          result = new Promise(rslv => {

            this.api.edit(composant).subscribe(() => {

              // On met à jour l'enregistrement dans l'IDB
              this.idb.update(composant.id, {
                ...composant
              });

              // On résout vide, histoire de dire que c'est fini
              rslv();
            }, error => {

              // Si on détecte une erreur, on attend un changement de connexion et on réessaye
              this.connectivity.event.subscribe(connected => rslv(this.edit(composant)));

            });
          });
        } else {

          // On met à jour l'enregistrement dans l'IDB
          result = this.idb.update(composant.id, {
            ...composant
          });

          // On ajoute une requête différée pour update la base plus tard
          this.deferredQueries.add(new DeferredQuery(composant, 'edit', 'composant'));
        }

      }).finally(() => {
        rtrn(result);
      });
    });

  }


  ///
  /// DELETE
  ///
  delete(id: number): Promise < any > {

    // On prépare le résultat qui serra retourné dans la promesse
    let result: Promise < any > ;

    // On retourne une Promise qui va résoudre le résultat
    return new Promise(rtrn => {

      // On utilise connectivity service pour savoir l'état de la connexion
      this.connectivity.isConnected.then(isConnected => {

        if (isConnected) {

          result = new Promise(rslv => {

            // On delete en base
            this.api.delete(Object.assign(Composant.newEmpty(), {
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
          }, 'delete', 'composant'));
        }
      }).finally(() => {
        rtrn(result);
      });

    });

  }


  ///
  /// COUNT
  ///
  count(): Promise < number > {

    // On prépare le résultat qui serra retourné dans la promesse
    let result: Promise < number > ;

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
