import {
  Injectable
} from '@angular/core';
import {
  ConnectivityService
} from '../connectivity.service';
import {
  ProduitApiService
} from '../api/produit-api.service';
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
import { CCTP } from 'src/app/classes/cctp';
import { CoupeDePrincipe } from 'src/app/classes/coupe-de-principe';
import { Gamme } from 'src/app/classes/gamme';
import { Modele } from 'src/app/classes/modele';
import { ModeleProduit } from '../../classes/modeleProduit';
import { ProduitModule } from '../../classes/produitModule';

@Injectable({
  providedIn: 'root'
})
export class ProduitSwService {

  idb: Dexie.Table<Produit, number>;

  constructor(private connectivity: ConnectivityService,
    private api: ProduitApiService,
    private idbService: IndexedDbService,
    private deferredQueries: DeferredQueriesService) {
    this.idb = this.idbService.produits;
  }


  ///
  /// GET ALL
  ///
  getAll(): Promise<Produit[]> {

    // On prépare le résultat qui serra retourné dans la promesse
    let result: Promise<Produit[]>;

    // On retourne une Promise qui va résoudre le résultat
    return new Promise(rtrn => {

      // On utilise connectivity service pour savoir l'état de la connexion
      this.connectivity.isConnected.then(isConnected => {

        if (isConnected) {

          // Si on peux toucher l'API, on la call, on remplace la base locale par les nouvelles données
          result = new Promise(rslv => {

            this.api.getAll().subscribe((produits: Produit[]) => {

              // On vide la base locale
              this.idb.clear();

              // On ajoute à l'IDB les données obtenue
              produits.forEach((produit, index) => {
                this.idb.add(produit);
                produits[index].cctp = undefined;
                produits[index].coupeDePrincipe = Object.assign(CoupeDePrincipe.newEmpty(), produit.coupeDePrincipe);
                produits[index].creationDate = new Date(produit.creationDate);
                produits[index].editionDate = new Date(produit.editionDate);
                produits[index].gamme = Object.assign(Gamme.newEmpty(), produit.gamme);
                produits[index].modeleProduit = produit.modeleProduit.map(modeleProduit => Object.assign(ModeleProduit.newEmpty(), modeleProduit));
                produits[index].produitModule = produit.produitModule.map(produitModule => Object.assign(ProduitModule.newEmpty(), produitModule));
              });

              // On résout les données de la Promesse
              rslv(produits);
            }, error => {

              // Si on détecte une erreur, on attend un changement de connexion et on réessaye
              this.connectivity.event.subscribe(connected => rslv(this.getAll()));

            });
          });
        } else {

          // Si on ne peux pas toucher l'API, on call simplement l'IDB
          result = new Promise(rslv => {

            // On boucle sur tout les résultats et on transforme les objets anonymes en objets typés
            this.idb.toArray().then(produits => {
              produits.forEach((produit, index) => {
                this.idb.add(produit);
                produits[index].cctp = undefined;
                produits[index].coupeDePrincipe = Object.assign(CoupeDePrincipe.newEmpty(), produit.coupeDePrincipe);
                produits[index].creationDate = new Date(produit.creationDate);
                produits[index].editionDate = new Date(produit.editionDate);
                produits[index].gamme = Object.assign(Gamme.newEmpty(), produit.gamme);
                produits[index].modeleProduit = produit.modeleProduit.map(modeleProduit => Object.assign(ModeleProduit.newEmpty(), modeleProduit));
                produits[index].produitModule = produit.produitModule.map(produitModule => Object.assign(ProduitModule.newEmpty(), produitModule));
              });

              // On résout les données de la Promesse
              rslv(produits);
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
  get(id: number): Promise<Produit> {

    // On prépare le résultat qui serra retourné dans la promesse
    let result: Promise<Produit>;

    // On retourne une Promise qui va résoudre le résultat
    return new Promise(rtrn => {

      // On utilise connectivity service pour savoir l'état de la connexion
      this.connectivity.isConnected.then(isConnected => {
        if (isConnected) {

          // Si on touche l'API, on la call, on ajoute/modifie l'enregistrement local et on retourne
          result = new Promise(rslv => {
            this.api.get(id).subscribe((produit: Produit) => {

              produit.cctp = undefined;
              produit.coupeDePrincipe = Object.assign(CoupeDePrincipe.newEmpty(), produit.coupeDePrincipe);
              produit.creationDate = new Date(produit.creationDate);
              produit.editionDate = new Date(produit.editionDate);
              produit.gamme = Object.assign(Gamme.newEmpty(), produit.gamme);
              produit.modeleProduit = produit.modeleProduit.map(modeleProduit => Object.assign(ModeleProduit.newEmpty(), modeleProduit));
              produit.produitModule = produit.produitModule.map(produitModule => Object.assign(ProduitModule.newEmpty(), produitModule));

              // Avec la nouvelle données, on ajoute/modifie l'enregistrement
              this.idb.put(produit);

              // On résout les données de la Promesse
              rslv(produit);
            }, error => {

              // Si on détecte une erreur, on attend un changement de connexion et on réessaye
              this.connectivity.event.subscribe(connected => rslv(this.get(id)));

            });
          });
        } else {

          result = new Promise(rslv => {
            // Si on ne peux pas toucher l'API on call simplement l'IDB
            this.idb.get(id).then(produit => {
              produit.cctp = undefined;
              produit.coupeDePrincipe = Object.assign(CoupeDePrincipe.newEmpty(), produit.coupeDePrincipe);
              produit.creationDate = new Date(produit.creationDate);
              produit.editionDate = new Date(produit.editionDate);
              produit.gamme = Object.assign(Gamme.newEmpty(), produit.gamme);
              produit.modeleProduit = produit.modeleProduit.map(modeleProduit => Object.assign(ModeleProduit.newEmpty(), modeleProduit));
              produit.produitModule = produit.produitModule.map(produitModule => Object.assign(ProduitModule.newEmpty(), produitModule));

              rslv(produit);
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
  add(produit: Produit): Promise<Produit> {


    // On prépare le résultat qui serra retourné dans la promesse
    let result: Promise<any>;

    // On retourne une Promise qui va résoudre le résultat
    return new Promise(rtrn => {

      // On utilise connectivity service pour savoir l'état de la connexion
      this.connectivity.isConnected.then(isConnected => {

        if (isConnected) {

          // Si on touche l'API, on la call, on ajoute la données dans la base et dans l'IDB
          result = new Promise(rslv => {

            this.api.add(produit).subscribe((added: Produit) => {

              // On ajoute aussi à l'IDB
              this.idb.add(added);

              added.cctp = produit.cctp;
              added.coupeDePrincipe = produit.coupeDePrincipe;
              added.creationDate = produit.creationDate;
              added.editionDate = produit.editionDate;
              added.gamme = produit.gamme;
              added.modeleProduit = produit.modeleProduit;
              added.produitModule = produit.produitModule;

              // On résout les données de la Promesse
              rslv(added);

            }, error => {

              // Si on détecte une erreur, on attend un changement de connexion et on réessaye
              this.connectivity.event.subscribe(connected => rslv(this.add(produit)));

            });
          });
        } else {

          result = new Promise(rslv => {

            // On doit trouver le dernier id pour pouvoir ajouter la donnée
           // this.idb.orderBy('id').reverse().first().then(lastRecord => {

              // S'il n'y a pas d'enregistrement on prend 1, sinon le dernier ID + 1
             // const nextId = lastRecord === undefined ? 1 : (lastRecord.id + 1);

              // On met à jour l'objet qu'on va ajouter
              produit.id = this.getRandomIntInclusive(2000,2000000);

              // On ajoute une requête différée pour update la base plus tard
              this.deferredQueries.add(new DeferredQuery(produit, 'add', 'produit'));
              result = this.idb.add(produit).then(()=>{ rslv(produit);});
             

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
  edit(produit: Produit): Promise<any> {

    // On prépare le résultat qui serra retourné dans la promesse
    let result: Promise<any>;

    // On retourne une Promise qui va résoudre le résultat
    return new Promise(rtrn => {

      // On utilise connectivity service pour savoir l'état de la connexion
      this.connectivity.isConnected.then(isConnected => {

        if (isConnected) {

          // Si on peux toucher l'API, on la call, on remplace la base locale par les nouvelles données
          result = new Promise(rslv => {

            this.api.edit(produit).subscribe(() => {

              // On met à jour l'enregistrement dans l'IDB
              this.idb.update(produit.id, {
                ...produit
              });

              // On résout vide, histoire de dire que c'est fini
              rslv();
            }, error => {

              // Si on détecte une erreur, on attend un changement de connexion et on réessaye
              this.connectivity.event.subscribe(connected => rslv(this.edit(produit)));

            });
          });
        } else {

          // On met à jour l'enregistrement dans l'IDB
          result = this.idb.update(produit.id, {
            ...produit
          });

          // On ajoute une requête différée pour update la base plus tard
          this.deferredQueries.add(new DeferredQuery(produit, 'edit', 'produit'));
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
            this.api.delete(Object.assign(Produit.newEmpty(), { id })).subscribe(() => {

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
          }, 'delete', 'produit'));
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
