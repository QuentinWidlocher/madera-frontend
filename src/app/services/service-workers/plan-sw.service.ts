import {
    Injectable
} from '@angular/core';
import {
    ConnectivityService
} from '../connectivity.service';
import {
    PlanApiService
} from '../api/plan-api.service';
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

@Injectable({
    providedIn: 'root'
})
export class PlanSwService {

    idb: Dexie.Table<Plan, number>;

    constructor(private connectivity: ConnectivityService,
        private api: PlanApiService,
        private idbService: IndexedDbService,
        private deferredQueries: DeferredQueriesService) {
        this.idb = this.idbService.plans;
    }


    ///
    /// GET ALL
    ///
    getAll(): Promise<Plan[]> {

        // On prépare le résultat qui serra retourné dans la promesse
        let result: Promise<Plan[]>;

        // On retourne une Promise qui va résoudre le résultat
        return new Promise(rtrn => {

            // On utilise connectivity service pour savoir l'état de la connexion
            this.connectivity.isConnected.then(isConnected => {

                if (isConnected) {

                    // Si on peux toucher l'API, on la call, on remplace la base locale par les nouvelles données
                    result = new Promise(rslv => {

                        this.api.getAll().subscribe((plans: Plan[]) => {

                            // On vide la base locale
                            this.idb.clear();

                            // On ajoute à l'IDB les données obtenue
                            plans.forEach((plan, index) => {
                              this.idb.add(plan);
                              plans[index].dossierTechnique = Object.assign(DossierTechnique.newEmpty(), plan.dossierTechnique);
                                plans[index].creationDate = new Date(plan.creationDate);
                                plans[index].editionDate = new Date(plan.editionDate);
                            });

                            // On résout les données de la Promesse
                            rslv(plans);
                        }, error => {

                            // Si on détecte une erreur, on attend un changement de connexion et on réessaye
                            this.connectivity.event.subscribe(connected => rslv(this.getAll()));

                        });
                    });
                } else {

                    // Si on ne peux pas toucher l'API, on call simplement l'IDB
                    result = new Promise(rslv => {

                        // On boucle sur tout les résultats et on transforme les objets anonymes en objets typés
                        this.idb.toArray().then(plans => {
                            plans.forEach((plan, index) => {
                                this.idb.add(plan);
                              plans[index].dossierTechnique = Object.assign(DossierTechnique.newEmpty(), plan.dossierTechnique);
                                plans[index].creationDate = new Date(plan.creationDate);
                                plans[index].editionDate = new Date(plan.editionDate);
                            });

                            // On résout les données de la Promesse
                            rslv(plans);
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
    get(id: number): Promise<Plan> {

        // On prépare le résultat qui serra retourné dans la promesse
        let result: Promise<Plan>;

        // On retourne une Promise qui va résoudre le résultat
        return new Promise(rtrn => {

            // On utilise connectivity service pour savoir l'état de la connexion
            this.connectivity.isConnected.then(isConnected => {
                if (isConnected) {

                    // Si on touche l'API, on la call, on ajoute/modifie l'enregistrement local et on retourne
                    result = new Promise(rslv => {
                        this.api.get(id).subscribe((plan: Plan) => {

                          plan.dossierTechnique = Object.assign(DossierTechnique.newEmpty(), plan.dossierTechnique);
                            plan.creationDate = new Date(plan.creationDate);
                            plan.editionDate = new Date(plan.editionDate);

                            // Avec la nouvelle données, on ajoute/modifie l'enregistrement
                            this.idb.put(plan);

                            // On résout les données de la Promesse
                            rslv(plan);
                        }, error => {

                            // Si on détecte une erreur, on attend un changement de connexion et on réessaye
                            this.connectivity.event.subscribe(connected => rslv(this.get(id)));

                        });
                    });
                } else {

                    result = new Promise(rslv => {
                        // Si on ne peux pas toucher l'API on call simplement l'IDB
                        this.idb.get(id).then(plan => {
                          plan.dossierTechnique = Object.assign(DossierTechnique.newEmpty(), plan.dossierTechnique);
                            plan.creationDate = new Date(plan.creationDate);
                            plan.editionDate = new Date(plan.editionDate);

                            rslv(plan);
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
    add(plan: Plan): Promise<Plan> {

        // On prépare le résultat qui serra retourné dans la promesse
        let result: Promise<any>;

        // On retourne une Promise qui va résoudre le résultat
        return new Promise(rtrn => {

            // On utilise connectivity service pour savoir l'état de la connexion
            this.connectivity.isConnected.then(isConnected => {

                if (isConnected) {

                    // Si on touche l'API, on la call, on ajoute la données dans la base et dans l'IDB
                    result = new Promise(rslv => {

                        this.api.add(plan).subscribe((added: Plan) => {

                            // On ajoute aussi à l'IDB
                            this.idb.add(added);

                            added.dossierTechnique = plan.dossierTechnique;
                            added.creationDate = plan.creationDate;
                            added.editionDate = plan.editionDate;

                            // On résout les données de la Promesse
                            rslv(added);

                        }, error => {

                            // Si on détecte une erreur, on attend un changement de connexion et on réessaye
                            this.connectivity.event.subscribe(connected => rslv(this.add(plan)));

                        });
                    });
                } else {

                    result = new Promise(rslv => {

                        // On doit trouver le dernier id pour pouvoir ajouter la donnée
                        this.idb.orderBy('id').reverse().first().then(lastRecord => {

                            // S'il n'y a pas d'enregistrement on prend 1, sinon le dernier ID + 1
                            const nextId = lastRecord === undefined ? 1 : (lastRecord.id + 1);

                            // On met à jour l'objet qu'on va ajouter
                            plan.id = nextId;

                            // On ajoute une requête différée pour update la base plus tard
                            this.deferredQueries.add(new DeferredQuery(plan, 'add', 'plan'));

                            result = this.idb.add(plan);
                            rslv(plan);

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
    edit(plan: Plan): Promise<any> {

        // On prépare le résultat qui serra retourné dans la promesse
        let result: Promise<any>;

        // On retourne une Promise qui va résoudre le résultat
        return new Promise(rtrn => {

            // On utilise connectivity service pour savoir l'état de la connexion
            this.connectivity.isConnected.then(isConnected => {

                if (isConnected) {

                    // Si on peux toucher l'API, on la call, on remplace la base locale par les nouvelles données
                    result = new Promise(rslv => {

                        this.api.edit(plan).subscribe(() => {

                            // On met à jour l'enregistrement dans l'IDB
                            this.idb.update(plan.id, {
                                ...plan
                            });

                            // On résout vide, histoire de dire que c'est fini
                            rslv();
                        }, error => {

                            // Si on détecte une erreur, on attend un changement de connexion et on réessaye
                            this.connectivity.event.subscribe(connected => rslv(this.edit(plan)));

                        });
                    });
                } else {

                    // On met à jour l'enregistrement dans l'IDB
                    result = this.idb.update(plan.id, {
                        ...plan
                    });

                    // On ajoute une requête différée pour update la base plus tard
                    this.deferredQueries.add(new DeferredQuery(plan, 'edit', 'plan'));
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
                        this.api.delete(Object.assign(Plan.newEmpty(), {
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
                    }, 'delete', 'plan'));
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
