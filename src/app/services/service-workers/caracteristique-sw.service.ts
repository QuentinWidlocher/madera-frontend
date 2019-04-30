import {
  Injectable
} from '@angular/core';
import {
  ConnectivityService
} from '../connectivity.service';
import {
  CaracteristiqueApiService
} from '../api/caracteristique-api.service';
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
import { Caracteristique } from 'src/app/classes/caracteristique';
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

@Injectable({
  providedIn: 'root'
})
export class CaracteristiqueSwService {

  idb: Dexie.Table < Caracteristique, number > ;

  constructor(private connectivity: ConnectivityService,
    private api: CaracteristiqueApiService,
    private idbService: IndexedDbService,
    private deferredQueries: DeferredQueriesService) {
    this.idb = this.idbService.caracteristiques;
  }


  ///
  /// GET ALL
  ///
  getAll(): Promise < Caracteristique[] > {

    // On prépare le résultat qui serra retourné dans la promesse
    let result: Promise < Caracteristique[] > ;

    // On retourne une Promise qui va résoudre le résultat
    return new Promise(rtrn => {

      // On utilise connectivity service pour savoir l'état de la connexion
      this.connectivity.isConnected.then(isConnected => {

        if (isConnected) {

          // Si on peux toucher l'API, on la call, on remplace la base locale par les nouvelles données
          result = new Promise(rslv => {

            this.api.getAll().subscribe((caracteristiques: Caracteristique[]) => {

              // On vide la base locale
              this.idb.clear();

              // On ajoute à l'IDB les données obtenue
              caracteristiques.forEach((caracteristique, index) => {
                this.idb.add(caracteristique);
                caracteristiques[index].composant = Object.assign(Composant.newEmpty(), caracteristique.composant);
                caracteristiques[index].module = Object.assign(Module.newEmpty(), caracteristique.module);
                caracteristiques[index].unite = Object.assign(Unite.newEmpty(), caracteristique.unite);
              });

              // On résout les données de la Promesse
              rslv(caracteristiques);
            }, error => {

              // Si on détecte une erreur, on attend un changement de connexion et on réessaye
              this.connectivity.event.subscribe(connected => rslv(this.getAll()));

            });
          });
        } else {

          // Si on ne peux pas toucher l'API, on call simplement l'IDB
          result = new Promise(rslv => {

            // On boucle sur tout les résultats et on transforme les objets anonymes en objets typés
            this.idb.toArray().then(caracteristiques => {
              caracteristiques.forEach((caracteristique, index) => {
                this.idb.add(caracteristique);
                  caracteristiques[index].composant = Object.assign(Composant.newEmpty(), caracteristique.composant);
                  caracteristiques[index].module = Object.assign(Module.newEmpty(), caracteristique.module);
                  caracteristiques[index].unite = Object.assign(Unite.newEmpty(), caracteristique.unite);
              });

              // On résout les données de la Promesse
              rslv(caracteristiques);
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
  get(id: number): Promise < Caracteristique > {

    // On prépare le résultat qui serra retourné dans la promesse
    let result: Promise < Caracteristique > ;

    // On retourne une Promise qui va résoudre le résultat
    return new Promise(rtrn => {

      // On utilise connectivity service pour savoir l'état de la connexion
      this.connectivity.isConnected.then(isConnected => {
        if (isConnected) {

          // Si on touche l'API, on la call, on ajoute/modifie l'enregistrement local et on retourne
          result = new Promise(rslv => {
            this.api.get(id).subscribe((caracteristique: Caracteristique) => {

                caracteristique.composant = Object.assign(Composant.newEmpty(), caracteristique.composant);
                caracteristique.module = Object.assign(Module.newEmpty(), caracteristique.module);
                caracteristique.unite = Object.assign(Unite.newEmpty(), caracteristique.unite);

              // Avec la nouvelle données, on ajoute/modifie l'enregistrement
              this.idb.put(caracteristique);

              // On résout les données de la Promesse
              rslv(caracteristique);
            }, error => {

              // Si on détecte une erreur, on attend un changement de connexion et on réessaye
              this.connectivity.event.subscribe(connected => rslv(this.get(id)));

            });
          });
        } else {

            result = new Promise(rslv => {
                // Si on ne peux pas toucher l'API on call simplement l'IDB
                this.idb.get(id).then(caracteristique => {
                    caracteristique.composant = Object.assign(Composant.newEmpty(), caracteristique.composant);
                    caracteristique.module = Object.assign(Module.newEmpty(), caracteristique.module);
                    caracteristique.unite = Object.assign(Unite.newEmpty(), caracteristique.unite);

                    rslv(caracteristique);
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
  add(caracteristique: Caracteristique): Promise < Caracteristique > {

    // On prépare le résultat qui serra retourné dans la promesse
    let result: Promise < any > ;

    // On retourne une Promise qui va résoudre le résultat
    return new Promise(rtrn => {

      // On utilise connectivity service pour savoir l'état de la connexion
      this.connectivity.isConnected.then(isConnected => {

        if (isConnected) {

          // Si on touche l'API, on la call, on ajoute la données dans la base et dans l'IDB
          result = new Promise(rslv => {

            this.api.add(caracteristique).subscribe((added: Caracteristique) => {

              // On ajoute aussi à l'IDB
              this.idb.add(added);

              added.composant = caracteristique.composant;
              added.module = caracteristique.module;
              added.unite = caracteristique.unite;

              // On résout les données de la Promesse
              rslv(added);

            }, error => {

              // Si on détecte une erreur, on attend un changement de connexion et on réessaye
              this.connectivity.event.subscribe(connected => rslv(this.add(caracteristique)));

            });
          });
        } else {

          result = new Promise(rslv => {

            // On doit trouver le dernier id pour pouvoir ajouter la donnée
            this.idb.orderBy('id').reverse().first().then(lastRecord => {

              // S'il n'y a pas d'enregistrement on prend 1, sinon le dernier ID + 1
              const nextId = lastRecord === undefined ? 1 : (lastRecord.id + 1);

              // On met à jour l'objet qu'on va ajouter
              caracteristique.id = nextId;

              // On ajoute une requête différée pour update la base plus tard
              this.deferredQueries.add(new DeferredQuery(caracteristique, 'add', 'caracteristique'));

              result = this.idb.add(caracteristique);
              rslv(caracteristique);

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
  edit(caracteristique: Caracteristique): Promise < any > {

    // On prépare le résultat qui serra retourné dans la promesse
    let result: Promise < any > ;

    // On retourne une Promise qui va résoudre le résultat
    return new Promise(rtrn => {

      // On utilise connectivity service pour savoir l'état de la connexion
      this.connectivity.isConnected.then(isConnected => {

        if (isConnected) {

          // Si on peux toucher l'API, on la call, on remplace la base locale par les nouvelles données
          result = new Promise(rslv => {

            this.api.edit(caracteristique).subscribe(() => {

              // On met à jour l'enregistrement dans l'IDB
              this.idb.update(caracteristique.id, {
                ...caracteristique
              });

              // On résout vide, histoire de dire que c'est fini
              rslv();
            }, error => {

              // Si on détecte une erreur, on attend un changement de connexion et on réessaye
              this.connectivity.event.subscribe(connected => rslv(this.edit(caracteristique)));

            });
          });
        } else {

          // On met à jour l'enregistrement dans l'IDB
          result = this.idb.update(caracteristique.id, {
            ...caracteristique
          });

          // On ajoute une requête différée pour update la base plus tard
          this.deferredQueries.add(new DeferredQuery(caracteristique, 'edit', 'caracteristique'));
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
            this.api.delete(Object.assign(Caracteristique.newEmpty(), {
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
          }, 'delete', 'caracteristique'));
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
