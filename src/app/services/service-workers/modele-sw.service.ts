import {
  Injectable
} from '@angular/core';
import {
  ConnectivityService
} from '../connectivity.service';
import {
  ModeleApiService
} from '../api/modele-api.service';
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
import { DossierTechnique } from 'src/app/classes/dossier-technique';
import { Produit } from 'src/app/classes/produit';
import { User } from 'src/app/classes/user';
import { ModeleProduit } from '../../classes/modeleProduit';

@Injectable({
  providedIn: 'root'
})
export class ModeleSwService {

  idb: Dexie.Table<Modele, number>;

  constructor(private connectivity: ConnectivityService,
    private api: ModeleApiService,
    private idbService: IndexedDbService,
    private deferredQueries: DeferredQueriesService) {
    this.idb = this.idbService.modeles;
  }


  ///
  /// GET ALL
  ///
  getAll(): Promise<Modele[]> {

    // On prépare le résultat qui serra retourné dans la promesse
    let result: Promise<Modele[]>;

    // On retourne une Promise qui va résoudre le résultat
    return new Promise(rtrn => {

      // On utilise connectivity service pour savoir l'état de la connexion
      this.connectivity.isConnected.then(isConnected => {

        if (isConnected) {

          // Si on peux toucher l'API, on la call, on remplace la base locale par les nouvelles données
          result = new Promise(rslv => {

            this.api.getAll().subscribe((modeles: Modele[]) => {

              // On vide la base locale
              this.idb.clear();

              // On ajoute à l'IDB les données obtenue
              modeles.forEach((modele, index) => {
                this.idb.add(modele);
                modeles[index].dossiersTechniques = modele.dossiersTechniques.map(dossierTechnique => Object.assign(DossierTechnique.newEmpty(), dossierTechnique));
                modeles[index].modeleProduit = modele.modeleProduit.map(modeleProduit => Object.assign(ModeleProduit.newEmpty(), modeleProduit));
                modeles[index].creationDate = new Date(modele.creationDate)
                modeles[index].editionDate = new Date(modele.editionDate)
                modeles[index].user = Object.assign(User.newEmpty(), modele.user);
              });

              // On résout les données de la Promesse
              rslv(modeles);
            }, error => {

              // Si on détecte une erreur, on attend un changement de connexion et on réessaye
              this.connectivity.event.subscribe(connected => rslv(this.getAll()));

            });
          });
        } else {

          // Si on ne peux pas toucher l'API, on call simplement l'IDB
          result = new Promise(rslv => {

            // On boucle sur tout les résultats et on transforme les objets anonymes en objets typés
            this.idb.toArray().then(modeles => {
              modeles.forEach((modele, index) => {
                this.idb.add(modele);
                modeles[index].dossiersTechniques = modele.dossiersTechniques.map(dossierTechnique => Object.assign(DossierTechnique.newEmpty(), dossierTechnique));
                modeles[index].modeleProduit = modele.modeleProduit.map(modeleProduit => Object.assign(ModeleProduit.newEmpty(), modeleProduit));
                modeles[index].creationDate = new Date(modele.creationDate)
                modeles[index].editionDate = new Date(modele.editionDate)
                modeles[index].user = Object.assign(User.newEmpty(), modele.user);
              });

              // On résout les données de la Promesse
              rslv(modeles);
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
  get(id: number): Promise<Modele> {

    // On prépare le résultat qui serra retourné dans la promesse
    let result: Promise<Modele>;

    // On retourne une Promise qui va résoudre le résultat
    return new Promise(rtrn => {

      // On utilise connectivity service pour savoir l'état de la connexion
      this.connectivity.isConnected.then(isConnected => {
        if (isConnected) {

          // Si on touche l'API, on la call, on ajoute/modifie l'enregistrement local et on retourne
          result = new Promise(rslv => {
            this.api.get(id).subscribe((modele: Modele) => {

              modele.dossiersTechniques = modele.dossiersTechniques.map(dossierTechnique => Object.assign(DossierTechnique.newEmpty(), dossierTechnique));
              modele.modeleProduit = modele.modeleProduit.map(modeleProduit => Object.assign(ModeleProduit.newEmpty(), modeleProduit));
              modele.creationDate = new Date(modele.creationDate)
              modele.editionDate = new Date(modele.editionDate)
              modele.user = Object.assign(User.newEmpty(), modele.user);

              // Avec la nouvelle données, on ajoute/modifie l'enregistrement
              this.idb.put(modele);

              // On résout les données de la Promesse
              rslv(modele);
            }, error => {

              // Si on détecte une erreur, on attend un changement de connexion et on réessaye
              this.connectivity.event.subscribe(connected => rslv(this.get(id)));

            });
          });
        } else {

          result = new Promise(rslv => {
            // Si on ne peux pas toucher l'API on call simplement l'IDB
            this.idb.get(id).then(modele => {
              modele.dossiersTechniques = modele.dossiersTechniques.map(dossierTechnique => Object.assign(DossierTechnique.newEmpty(), dossierTechnique));
              modele.modeleProduit = modele.modeleProduit.map(modeleProduit => Object.assign(ModeleProduit.newEmpty(), modeleProduit));
              modele.creationDate = new Date(modele.creationDate)
              modele.editionDate = new Date(modele.editionDate)
              modele.user = Object.assign(User.newEmpty(), modele.user);

              rslv(modele);
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
  add(modele: Modele): Promise<Modele> {

    // On prépare le résultat qui serra retourné dans la promesse
    let result: Promise<any>;

    // On retourne une Promise qui va résoudre le résultat
    return new Promise(rtrn => {

      // On utilise connectivity service pour savoir l'état de la connexion
      this.connectivity.isConnected.then(isConnected => {

        if (isConnected) {

          // Si on touche l'API, on la call, on ajoute la données dans la base et dans l'IDB
          result = new Promise(rslv => {

            this.api.add(modele).subscribe((added: Modele) => {

              // On ajoute aussi à l'IDB
              this.idb.add(added);

              added.dossiersTechniques = modele.dossiersTechniques;
              added.modeleProduit = modele.modeleProduit;
              added.creationDate = modele.creationDate;
              added.editionDate = modele.editionDate;
              added.user = modele.user;

              // On résout les données de la Promesse
              rslv(added);

            }, error => {

              // Si on détecte une erreur, on attend un changement de connexion et on réessaye
              this.connectivity.event.subscribe(connected => rslv(this.add(modele)));

            });
          });
        } else {

          result = new Promise(rslv => {

            if (modele.dossiersTechniques) {
              if (modele.dossiersTechniques.length == 1) {
                this.delete(modele.id, true);
              }
            }

            // On doit trouver le dernier id pour pouvoir ajouter la donnée
            this.idb.orderBy('id').reverse().first().then(lastRecord => {

              // S'il n'y a pas d'enregistrement on prend 1, sinon le dernier ID + 1
              const nextId = lastRecord === undefined ? 1 : (lastRecord.id + 1);

              // On met à jour l'objet qu'on va ajouter
              modele.id = nextId;

              // On ajoute une requête différée pour update la base plus tard
              this.deferredQueries.add(new DeferredQuery(modele, 'add', 'modele'));

              result = this.idb.add(modele);
              rslv(modele);

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
  edit(modele: Modele): Promise<any> {

    // On prépare le résultat qui serra retourné dans la promesse
    let result: Promise<any>;

    // On retourne une Promise qui va résoudre le résultat
    return new Promise(rtrn => {

      // On utilise connectivity service pour savoir l'état de la connexion
      this.connectivity.isConnected.then(isConnected => {

        if (isConnected) {

          // Si on peux toucher l'API, on la call, on remplace la base locale par les nouvelles données
          result = new Promise(rslv => {

            this.api.edit(modele).subscribe(() => {

              // On met à jour l'enregistrement dans l'IDB
              this.idb.update(modele.id, {
                ...modele
              });

              // On résout vide, histoire de dire que c'est fini
              rslv();
            }, error => {

              // Si on détecte une erreur, on attend un changement de connexion et on réessaye
              this.connectivity.event.subscribe(connected => rslv(this.edit(modele)));

            });
          });
        } else {

          // On met à jour l'enregistrement dans l'IDB
          result = this.idb.update(modele.id, {
            ...modele
          });

          // On ajoute une requête différée pour update la base plus tard
          this.deferredQueries.add(new DeferredQuery(modele, 'edit', 'modele'));
        }

      }).finally(() => {
        rtrn(result);
      });
    });

  }


  ///
  /// DELETE
  ///
  delete(id: number, forceOffline: boolean = false): Promise<any> {

    // On prépare le résultat qui serra retourné dans la promesse
    let result: Promise<any>;

    // On retourne une Promise qui va résoudre le résultat
    return new Promise(rtrn => {

      // On utilise connectivity service pour savoir l'état de la connexion
      this.connectivity.isConnected.then(isConnected => {

        if (forceOffline || isConnected) {

          result = new Promise(rslv => {

            // On delete en base
            this.api.delete(Object.assign(Modele.newEmpty(), {
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
          }, 'delete', 'modele'));
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
