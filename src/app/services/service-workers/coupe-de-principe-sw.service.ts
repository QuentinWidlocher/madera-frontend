import {
    Injectable
} from '@angular/core';
import {
    ConnectivityService
} from '../connectivity.service';
import {
    CoupeDePrincipeApiService
} from '../api/coupe-de-principe-api.service';
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
    CoupeDePrincipe
} from 'src/app/classes/coupe-de-principe';
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
import { Utilisateur } from 'src/app/classes/utilisateur';

@Injectable({
    providedIn: 'root'
})
export class CoupeDePrincipeSwService {

    idb: Dexie.Table<CoupeDePrincipe, number>;

    constructor(private connectivity: ConnectivityService,
        private api: CoupeDePrincipeApiService,
        private idbService: IndexedDbService,
        private deferredQueries: DeferredQueriesService) {
        this.idb = this.idbService.coupesDePrincipe;
    }


    ///
    /// GET ALL
    ///
    getAll(): Promise<CoupeDePrincipe[]> {

        // On prépare le résultat qui serra retourné dans la promesse
        let result: Promise<CoupeDePrincipe[]>;

        // On retourne une Promise qui va résoudre le résultat
        return new Promise(rtrn => {

            // On utilise connectivity service pour savoir l'état de la connexion
            this.connectivity.isConnected.then(isConnected => {

                if (isConnected) {

                    // Si on peux toucher l'API, on la call, on remplace la base locale par les nouvelles données
                    result = new Promise(rslv => {

                        this.api.getAll().subscribe((coupesDePrincipe: CoupeDePrincipe[]) => {

                            // On vide la base locale
                            this.idb.clear();

                            // On ajoute à l'IDB les données obtenue
                            coupesDePrincipe.forEach((coupeDePrincipe, index) => {
                                this.idb.add(coupeDePrincipe);
                                coupesDePrincipe[index].modules = coupeDePrincipe.modules.map(module => Object.assign(Module.newEmpty(), module));
                                coupesDePrincipe[index].produits = coupeDePrincipe.produits.map(produit => Object.assign(Produit.newEmpty(), produit));
                            });

                            // On résout les données de la Promesse
                            rslv(coupesDePrincipe);
                        }, error => {

                            // Si on détecte une erreur, on attend un changement de connexion et on réessaye
                            this.connectivity.event.subscribe(connected => rslv(this.getAll()));

                        });
                    });
                } else {

                    // Si on ne peux pas toucher l'API, on call simplement l'IDB
                    result = new Promise(rslv => {

                        // On boucle sur tout les résultats et on transforme les objets anonymes en objets typés
                        this.idb.toArray().then(coupesDePrincipe => {
                            coupesDePrincipe.forEach((coupeDePrincipe, index) => {
                                this.idb.add(coupeDePrincipe);
                                coupesDePrincipe[index].modules = coupeDePrincipe.modules.map(module => Object.assign(Module.newEmpty(), module));
                                coupesDePrincipe[index].produits = coupeDePrincipe.produits.map(produit => Object.assign(Produit.newEmpty(), produit));
                            });

                            // On résout les données de la Promesse
                            rslv(coupesDePrincipe);
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
    get(id: number): Promise<CoupeDePrincipe> {

        // On prépare le résultat qui serra retourné dans la promesse
        let result: Promise<CoupeDePrincipe>;

        // On retourne une Promise qui va résoudre le résultat
        return new Promise(rtrn => {

            // On utilise connectivity service pour savoir l'état de la connexion
            this.connectivity.isConnected.then(isConnected => {
                if (isConnected) {

                    // Si on touche l'API, on la call, on ajoute/modifie l'enregistrement local et on retourne
                    result = new Promise(rslv => {
                        this.api.get(id).subscribe((coupeDePrincipe: CoupeDePrincipe) => {

                            coupeDePrincipe.modules = coupeDePrincipe.modules.map(module => Object.assign(Module.newEmpty(), module));
                            coupeDePrincipe.produits = coupeDePrincipe.produits.map(produit => Object.assign(Produit.newEmpty(), produit));

                            // Avec la nouvelle données, on ajoute/modifie l'enregistrement
                            this.idb.put(coupeDePrincipe);

                            // On résout les données de la Promesse
                            rslv(coupeDePrincipe);
                        }, error => {

                            // Si on détecte une erreur, on attend un changement de connexion et on réessaye
                            this.connectivity.event.subscribe(connected => rslv(this.get(id)));

                        });
                    });
                } else {

                    result = new Promise(rslv => {
                        // Si on ne peux pas toucher l'API on call simplement l'IDB
                        this.idb.get(id).then(coupeDePrincipe => {
                            coupeDePrincipe.modules = coupeDePrincipe.modules.map(module => Object.assign(Module.newEmpty(), module));
                            coupeDePrincipe.produits = coupeDePrincipe.produits.map(produit => Object.assign(Produit.newEmpty(), produit));

                            rslv(coupeDePrincipe);
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
    add(coupeDePrincipe: CoupeDePrincipe): Promise<CoupeDePrincipe> {

        // On prépare le résultat qui serra retourné dans la promesse
        let result: Promise<any>;

        // On retourne une Promise qui va résoudre le résultat
        return new Promise(rtrn => {

            // On utilise connectivity service pour savoir l'état de la connexion
            this.connectivity.isConnected.then(isConnected => {

                if (isConnected) {

                    // Si on touche l'API, on la call, on ajoute la données dans la base et dans l'IDB
                    result = new Promise(rslv => {

                        this.api.add(coupeDePrincipe).subscribe((added: CoupeDePrincipe) => {

                            // On ajoute aussi à l'IDB
                            this.idb.add(added);

                            added.modules = coupeDePrincipe.modules;
                            added.produits = coupeDePrincipe.produits;

                            // On résout les données de la Promesse
                            rslv(added);

                        }, error => {

                            // Si on détecte une erreur, on attend un changement de connexion et on réessaye
                            this.connectivity.event.subscribe(connected => rslv(this.add(coupeDePrincipe)));

                        });
                    });
                } else {

                    result = new Promise(rslv => {

                        // On doit trouver le dernier id pour pouvoir ajouter la donnée
                        this.idb.orderBy('id').reverse().first().then(lastRecord => {

                            // S'il n'y a pas d'enregistrement on prend 1, sinon le dernier ID + 1
                            const nextId = lastRecord === undefined ? 1 : (lastRecord.id + 1);

                            // On met à jour l'objet qu'on va ajouter
                            coupeDePrincipe.id = nextId;

                            // On ajoute une requête différée pour update la base plus tard
                            this.deferredQueries.add(new DeferredQuery(coupeDePrincipe, 'add', 'coupeDePrincipe'));

                            result = this.idb.add(coupeDePrincipe);
                            rslv(coupeDePrincipe);

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
    edit(coupeDePrincipe: CoupeDePrincipe): Promise<any> {

        // On prépare le résultat qui serra retourné dans la promesse
        let result: Promise<any>;

        // On retourne une Promise qui va résoudre le résultat
        return new Promise(rtrn => {

            // On utilise connectivity service pour savoir l'état de la connexion
            this.connectivity.isConnected.then(isConnected => {

                if (isConnected) {

                    // Si on peux toucher l'API, on la call, on remplace la base locale par les nouvelles données
                    result = new Promise(rslv => {

                        this.api.edit(coupeDePrincipe).subscribe(() => {

                            // On met à jour l'enregistrement dans l'IDB
                            this.idb.update(coupeDePrincipe.id, {
                                ...coupeDePrincipe
                            });

                            // On résout vide, histoire de dire que c'est fini
                            rslv();
                        }, error => {

                            // Si on détecte une erreur, on attend un changement de connexion et on réessaye
                            this.connectivity.event.subscribe(connected => rslv(this.edit(coupeDePrincipe)));

                        });
                    });
                } else {

                    // On met à jour l'enregistrement dans l'IDB
                    result = this.idb.update(coupeDePrincipe.id, {
                        ...coupeDePrincipe
                    });

                    // On ajoute une requête différée pour update la base plus tard
                    this.deferredQueries.add(new DeferredQuery(coupeDePrincipe, 'edit', 'coupeDePrincipe'));
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
                        this.api.delete(Object.assign(CoupeDePrincipe.newEmpty(), {
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
                    }, 'delete', 'coupeDePrincipe'));
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