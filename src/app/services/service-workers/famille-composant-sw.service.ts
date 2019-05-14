import {
    Injectable
} from '@angular/core';
import {
    ConnectivityService
} from '../connectivity.service';
import {
    FamilleComposantApiService
} from '../api/famille-composant-api.service';
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
    FamilleComposant
} from 'src/app/classes/famille-composant';
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

@Injectable({
    providedIn: 'root'
})
export class FamilleComposantSwService {

    idb: Dexie.Table<FamilleComposant, number>;

    constructor(private connectivity: ConnectivityService,
        private api: FamilleComposantApiService,
        private idbService: IndexedDbService,
        private deferredQueries: DeferredQueriesService) {
        this.idb = this.idbService.famillesComposant;
    }


    ///
    /// GET ALL
    ///
    getAll(): Promise<FamilleComposant[]> {

        // On prépare le résultat qui serra retourné dans la promesse
        let result: Promise<FamilleComposant[]>;

        // On retourne une Promise qui va résoudre le résultat
        return new Promise(rtrn => {

            // On utilise connectivity service pour savoir l'état de la connexion
            this.connectivity.isConnected.then(isConnected => {

                if (isConnected) {

                    // Si on peux toucher l'API, on la call, on remplace la base locale par les nouvelles données
                    result = new Promise(rslv => {

                        this.api.getAll().subscribe((famillesComposant: FamilleComposant[]) => {

                            // On vide la base locale
                            this.idb.clear();

                            // On ajoute à l'IDB les données obtenue
                            famillesComposant.forEach((familleComposant, index) => {
                                this.idb.add(familleComposant);
                                famillesComposant[index].composants = familleComposant.composants.map(composant => Object.assign(Composant.newEmpty(), composant));
                            });

                            // On résout les données de la Promesse
                            rslv(famillesComposant);
                        }, error => {

                            // Si on détecte une erreur, on attend un changement de connexion et on réessaye
                            this.connectivity.event.subscribe(connected => rslv(this.getAll()));

                        });
                    });
                } else {

                    // Si on ne peux pas toucher l'API, on call simplement l'IDB
                    result = new Promise(rslv => {

                        // On boucle sur tout les résultats et on transforme les objets anonymes en objets typés
                        this.idb.toArray().then(famillesComposant => {
                            famillesComposant.forEach((familleComposant, index) => {
                                this.idb.add(familleComposant);
                                famillesComposant[index].composants = familleComposant.composants.map(composant => Object.assign(Composant.newEmpty(), composant));
                            });

                            // On résout les données de la Promesse
                            rslv(famillesComposant);
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
    get(id: number): Promise<FamilleComposant> {

        // On prépare le résultat qui serra retourné dans la promesse
        let result: Promise<FamilleComposant>;

        // On retourne une Promise qui va résoudre le résultat
        return new Promise(rtrn => {

            // On utilise connectivity service pour savoir l'état de la connexion
            this.connectivity.isConnected.then(isConnected => {
                if (isConnected) {

                    // Si on touche l'API, on la call, on ajoute/modifie l'enregistrement local et on retourne
                    result = new Promise(rslv => {
                        this.api.get(id).subscribe((familleComposant: FamilleComposant) => {

                            familleComposant.composants = familleComposant.composants.map(composant => Object.assign(Composant.newEmpty(), composant));

                            // Avec la nouvelle données, on ajoute/modifie l'enregistrement
                            this.idb.put(familleComposant);

                            // On résout les données de la Promesse
                            rslv(familleComposant);
                        }, error => {

                            // Si on détecte une erreur, on attend un changement de connexion et on réessaye
                            this.connectivity.event.subscribe(connected => rslv(this.get(id)));

                        });
                    });
                } else {

                    result = new Promise(rslv => {
                        // Si on ne peux pas toucher l'API on call simplement l'IDB
                        this.idb.get(id).then(familleComposant => {
                            familleComposant.composants = familleComposant.composants.map(composant => Object.assign(Composant.newEmpty(), composant));

                            rslv(familleComposant);
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
    add(familleComposant: FamilleComposant): Promise<FamilleComposant> {

        // On prépare le résultat qui serra retourné dans la promesse
        let result: Promise<any>;

        // On retourne une Promise qui va résoudre le résultat
        return new Promise(rtrn => {

            // On utilise connectivity service pour savoir l'état de la connexion
            this.connectivity.isConnected.then(isConnected => {

                if (isConnected) {

                    // Si on touche l'API, on la call, on ajoute la données dans la base et dans l'IDB
                    result = new Promise(rslv => {

                        this.api.add(familleComposant).subscribe((added: FamilleComposant) => {

                            // On ajoute aussi à l'IDB
                            this.idb.add(added);

                            added.composants = familleComposant.composants;

                            // On résout les données de la Promesse
                            rslv(added);

                        }, error => {

                            // Si on détecte une erreur, on attend un changement de connexion et on réessaye
                            this.connectivity.event.subscribe(connected => rslv(this.add(familleComposant)));

                        });
                    });
                } else {

                    result = new Promise(rslv => {

                        // On doit trouver le dernier id pour pouvoir ajouter la donnée
                        this.idb.orderBy('id').reverse().first().then(lastRecord => {

                            // S'il n'y a pas d'enregistrement on prend 1, sinon le dernier ID + 1
                            const nextId = lastRecord === undefined ? 1 : (lastRecord.id + 1);

                            // On met à jour l'objet qu'on va ajouter
                            familleComposant.id = nextId;

                            // On ajoute une requête différée pour update la base plus tard
                            this.deferredQueries.add(new DeferredQuery(familleComposant, 'add', 'familleComposant'));

                            result = this.idb.add(familleComposant);
                            rslv(familleComposant);

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
    edit(familleComposant: FamilleComposant): Promise<any> {

        // On prépare le résultat qui serra retourné dans la promesse
        let result: Promise<any>;

        // On retourne une Promise qui va résoudre le résultat
        return new Promise(rtrn => {

            // On utilise connectivity service pour savoir l'état de la connexion
            this.connectivity.isConnected.then(isConnected => {

                if (isConnected) {

                    // Si on peux toucher l'API, on la call, on remplace la base locale par les nouvelles données
                    result = new Promise(rslv => {

                        this.api.edit(familleComposant).subscribe(() => {

                            // On met à jour l'enregistrement dans l'IDB
                            this.idb.update(familleComposant.id, {
                                ...familleComposant
                            });

                            // On résout vide, histoire de dire que c'est fini
                            rslv();
                        }, error => {

                            // Si on détecte une erreur, on attend un changement de connexion et on réessaye
                            this.connectivity.event.subscribe(connected => rslv(this.edit(familleComposant)));

                        });
                    });
                } else {

                    // On met à jour l'enregistrement dans l'IDB
                    result = this.idb.update(familleComposant.id, {
                        ...familleComposant
                    });

                    // On ajoute une requête différée pour update la base plus tard
                    this.deferredQueries.add(new DeferredQuery(familleComposant, 'edit', 'familleComposant'));
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
                        this.api.delete(Object.assign(FamilleComposant.newEmpty(), {
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
                    }, 'delete', 'familleComposant'));
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
