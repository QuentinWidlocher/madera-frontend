import {
  Injectable
} from '@angular/core';
import {
  ConnectivityService
} from '../connectivity.service';
import {
  DossierTechniqueApiService
} from '../api/dossier-technique-api.service';
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
  Modele
} from 'src/app/classes/modele';
import {
  Plan
} from 'src/app/classes/plan';
import {
  Projet
} from 'src/app/classes/projet';

@Injectable({
  providedIn: 'root'
})
export class DossierTechniqueSwService {

  idb: Dexie.Table<DossierTechnique, number>;

  constructor(private connectivity: ConnectivityService,
    private api: DossierTechniqueApiService,
    private idbService: IndexedDbService,
    private deferredQueries: DeferredQueriesService) {
    this.idb = this.idbService.dossiersTechniques;
  }


  ///
  /// GET ALL
  ///
  getAll(): Promise<DossierTechnique[]> {

    // On prépare le résultat qui serra retourné dans la promesse
    let result: Promise<DossierTechnique[]>;

    // On retourne une Promise qui va résoudre le résultat
    return new Promise(rtrn => {

      // On utilise connectivity service pour savoir l'état de la connexion
      this.connectivity.isConnected.then(isConnected => {

        if (isConnected) {

          // Si on peux toucher l'API, on la call, on remplace la base locale par les nouvelles données
          result = new Promise(rslv => {

            this.api.getAll().subscribe((dossiersTechniques: DossierTechnique[]) => {

              // On vide la base locale
              this.idb.clear();

              // On ajoute à l'IDB les données obtenue
              dossiersTechniques.forEach((dossierTechnique, index) => {
                this.idb.add(dossierTechnique);
                dossiersTechniques[index].modele = Object.assign(Modele.newEmpty(), dossierTechnique.modele);
                dossiersTechniques[index].creationDate = new Date(dossiersTechniques[index].creationDate)
                dossiersTechniques[index].editionDate = new Date(dossiersTechniques[index].editionDate)
                dossiersTechniques[index].plans = dossierTechnique.plans.map(plan => Object.assign(Plan.newEmpty(), plan));
                dossiersTechniques[index].projet = Object.assign(Projet.newEmpty(), dossierTechnique.projet);
              });

              // On résout les données de la Promesse
              rslv(dossiersTechniques);
            }, error => {

              // Si on détecte une erreur, on attend un changement de connexion et on réessaye
              this.connectivity.event.subscribe(connected => rslv(this.getAll()));

            });
          });
        } else {

          // Si on ne peux pas toucher l'API, on call simplement l'IDB
          result = new Promise(rslv => {

            // On boucle sur tout les résultats et on transforme les objets anonymes en objets typés
            this.idb.toArray().then(dossiersTechniques => {
              dossiersTechniques.forEach((dossierTechnique, index) => {
                this.idb.add(dossierTechnique);
                dossiersTechniques[index].modele = Object.assign(Modele.newEmpty(), dossierTechnique.modele);
                dossiersTechniques[index].creationDate = new Date(dossiersTechniques[index].creationDate)
                dossiersTechniques[index].editionDate = new Date(dossiersTechniques[index].editionDate)
                dossiersTechniques[index].plans = dossierTechnique.plans.map(plan => Object.assign(Plan.newEmpty(), plan));
                dossiersTechniques[index].projet = Object.assign(Projet.newEmpty(), dossierTechnique.projet);
              });

              // On résout les données de la Promesse
              rslv(dossiersTechniques);
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
  get(id: number): Promise<DossierTechnique> {

    // On prépare le résultat qui serra retourné dans la promesse
    let result: Promise<DossierTechnique>;

    // On retourne une Promise qui va résoudre le résultat
    return new Promise(rtrn => {

      // On utilise connectivity service pour savoir l'état de la connexion
      this.connectivity.isConnected.then(isConnected => {
        if (isConnected) {

          // Si on touche l'API, on la call, on ajoute/modifie l'enregistrement local et on retourne
          result = new Promise(rslv => {
            this.api.get(id).subscribe((dossierTechnique: DossierTechnique) => {

              dossierTechnique.modele = Object.assign(Modele.newEmpty(), dossierTechnique.modele);
              dossierTechnique.creationDate = new Date(dossierTechnique.creationDate)
              dossierTechnique.editionDate = new Date(dossierTechnique.editionDate)
              dossierTechnique.plans = dossierTechnique.plans.map(plan => Object.assign(Plan.newEmpty(), plan));
              dossierTechnique.projet = Object.assign(Projet.newEmpty(), dossierTechnique.projet);

              // Avec la nouvelle données, on ajoute/modifie l'enregistrement
              this.idb.put(dossierTechnique);

              // On résout les données de la Promesse
              rslv(dossierTechnique);
            }, error => {

              // Si on détecte une erreur, on attend un changement de connexion et on réessaye
              this.connectivity.event.subscribe(connected => rslv(this.get(id)));

            });
          });
        } else {

          result = new Promise(rslv => {
            // Si on ne peux pas toucher l'API on call simplement l'IDB
            this.idb.get(id).then(dossierTechnique => {
              dossierTechnique.modele = Object.assign(Modele.newEmpty(), dossierTechnique.modele);
              dossierTechnique.creationDate = new Date(dossierTechnique.creationDate)
              dossierTechnique.editionDate = new Date(dossierTechnique.editionDate)
              dossierTechnique.plans = dossierTechnique.plans.map(plan => Object.assign(Plan.newEmpty(), plan));
              dossierTechnique.projet = Object.assign(Projet.newEmpty(), dossierTechnique.projet);

              rslv(dossierTechnique);
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
  add(dossierTechnique: DossierTechnique): Promise<DossierTechnique> {

    // On prépare le résultat qui serra retourné dans la promesse
    let result: Promise<any>;

    dossierTechnique.creationDate = new Date(Date.now());
    dossierTechnique.editionDate = new Date(Date.now());


    // On retourne une Promise qui va résoudre le résultat
    return new Promise(rtrn => {

      // On utilise connectivity service pour savoir l'état de la connexion
      this.connectivity.isConnected.then(isConnected => {

        if (isConnected) {

          // Si on touche l'API, on la call, on ajoute la données dans la base et dans l'IDB
          result = new Promise(rslv => {

            this.api.add(dossierTechnique).subscribe((added: DossierTechnique) => {

              // On ajoute aussi à l'IDB
              this.idb.add(added);

              added.modele = dossierTechnique.modele;
              added.plans = dossierTechnique.plans;
              added.projet = dossierTechnique.projet;

              // On résout les données de la Promesse
              rslv(added);

            }, error => {

              // Si on détecte une erreur, on attend un changement de connexion et on réessaye
              this.connectivity.event.subscribe(connected => rslv(this.add(dossierTechnique)));

            });
          });
        } else {

          result = new Promise(rslv => {

            // On doit trouver le dernier id pour pouvoir ajouter la donnée
            this.idb.orderBy('id').reverse().first().then(lastRecord => {

              // S'il n'y a pas d'enregistrement on prend 1, sinon le dernier ID + 1
              const nextId = lastRecord === undefined ? 1 : (lastRecord.id + 1);

              // On met à jour l'objet qu'on va ajouter
              dossierTechnique.id = nextId;

              // On ajoute une requête différée pour update la base plus tard
              this.deferredQueries.add(new DeferredQuery(dossierTechnique, 'add', 'dossierTechnique'));

              result = this.idb.add(dossierTechnique);
              rslv(dossierTechnique);

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
  edit(dossierTechnique: DossierTechnique): Promise<any> {

    // On prépare le résultat qui serra retourné dans la promesse
    let result: Promise<any>;

    dossierTechnique.editionDate = new Date(Date.now());

    // On retourne une Promise qui va résoudre le résultat
    return new Promise(rtrn => {

      // On utilise connectivity service pour savoir l'état de la connexion
      this.connectivity.isConnected.then(isConnected => {

        if (isConnected) {

          // Si on peux toucher l'API, on la call, on remplace la base locale par les nouvelles données
          result = new Promise(rslv => {

            this.api.edit(dossierTechnique).subscribe(() => {

              // On met à jour l'enregistrement dans l'IDB
              this.idb.update(dossierTechnique.id, {...dossierTechnique});

              // On résout vide, histoire de dire que c'est fini
              rslv();
            }, error => {

              // Si on détecte une erreur, on attend un changement de connexion et on réessaye
              this.connectivity.event.subscribe(connected => rslv(this.edit(dossierTechnique)));

            });
          });
        } else {

          // On met à jour l'enregistrement dans l'IDB
          result = this.idb.update(dossierTechnique.id, {
            ...dossierTechnique
          });

          // On ajoute une requête différée pour update la base plus tard
          this.deferredQueries.add(new DeferredQuery(dossierTechnique, 'edit', 'dossierTechnique'));
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
            this.api.delete(Object.assign(DossierTechnique.newEmpty(), {
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
          }, 'delete', 'dossierTechnique'));
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
