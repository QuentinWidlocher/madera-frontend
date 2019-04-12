import { Injectable } from '@angular/core';
import { DeferredQuery } from '../classes/deferred-query';
import { CaracteristiqueApiService } from './api/caracteristique-api.service';
import { CctpApiService } from './api/cctp-api.service';
import { ClientApiService } from './api/client-api.service';
import { ComposantApiService } from './api/composant-api.service';
import { CoupeDePrincipeApiService } from './api/coupe-de-principe-api.service';
import { DevisApiService } from './api/devis-api.service';
import { DossierTechniqueApiService } from './api/dossier-technique-api.service';
import { FamilleComposantApiService } from './api/famille-composant-api.service';
import { FamilleGammeApiService } from './api/famille-gamme-api.service';
import { GammeApiService } from './api/gamme-api.service';
import { GammeComposantApiService } from './api/gamme-composant-api.service';
import { LigneApiService } from './api/ligne-api.service';
import { ModeleApiService } from './api/modele-api.service';
import { ModuleApiService } from './api/module-api.service';
import { PlanApiService } from './api/plan-api.service';
import { ProduitApiService } from './api/produit-api.service';
import { ProjetApiService } from './api/projet-api.service';
import { RoleApiService } from './api/role-api.service';
import { UniteApiService } from './api/unite-api.service';
import { UtilisateurApiService } from './api/utilisateur-api.service';
import { IndexedDbService } from './indexed-db.service';
import { zip, Observable, forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeferredQueriesService {

  constructor(private caracteristique: CaracteristiqueApiService,
              private cctp: CctpApiService,
              private client: ClientApiService,
              private composant: ComposantApiService,
              private coupeDePrincipe: CoupeDePrincipeApiService,
              private devis: DevisApiService,
              private dossierTechnique: DossierTechniqueApiService,
              private familleComposant: FamilleComposantApiService,
              private familleGamme: FamilleGammeApiService,
              private gamme: GammeApiService,
              private gammeComposant: GammeComposantApiService,
              private ligne: LigneApiService,
              private modele: ModeleApiService,
              private module: ModuleApiService,
              private plan: PlanApiService,
              private produit: ProduitApiService,
              private projet: ProjetApiService,
              private role: RoleApiService,
              private unite: UniteApiService,
              private utilisateur: UtilisateurApiService,
              private idb: IndexedDbService) { }

  // On passe par cette fonction pour alléger les requêtes faites à la base lors de la reconnexion
  add(query: DeferredQuery) {
    // Liste des id des requêtes différées rendues inutiles par l'ajout de l'objet
    const deferredQueriesIdToDelete: number[] = [];

    // Après les modifications, doit-on quand même ajouter cette requête différée ?
    let stillAddQuery = true;

    switch (query.method) {

      // Si on supprime un enregistrement, les DQ d'ajout et de suppression qui venaient avant ne servent plus à rien
      // Exemple 1 - Inutile de faire : AJOUT → MODIF → MODIF → SUPPRESSION
      // Exemple 2 - Au lieu de faire : MODIF → MODIF → SUPPRESSION
      //             On fait simplemement une suppression
      case 'delete':

        // On récupère les DQ add et edit de l'objet qu'on souhaite supprimer
        this.idb.deferredQueries
          .where({ type: query.type })
          .filter(x => x.method === 'add' || x.method === 'edit')
          .filter(x => (x.data as any).id === (query.data as any).id)
          .each((deferredQuery, key) => {

            // Si l'objet a été ajouté en hors ligne, pas besoin d'envoyer un POST puis un DELETE
            if (deferredQuery.method === 'add') {
              // Du coup on supprime cet DQ et on n'ajoutera pas la DQ de suppression non plus
              stillAddQuery = false;
            }

            deferredQueriesIdToDelete.push(key.primaryKey);
        }).then(() => {
          // On supprime les requêtes inutiles
          this.idb.deferredQueries.bulkDelete(deferredQueriesIdToDelete);

          // Si l'objet était déjà en base avant d'être en HL, il faut quand même le supprimer à la reconnexion
          if (stillAddQuery) {
            // On ajoute une requête différée pour supprimer l'enregistrement dans la base plus tard
            this.idb.deferredQueries.add(query);
          }
         });
        break;



      // Si on modifie un enregistrement, les DQ de modifs peuvent êtres remplacées par celle là
      // et si l'objet à été ajouté en HL, on a juste à modifier la DQ d'ajout.
      // Exemple 1 - Inutile de faire : AJOUT → MODIF
      //             On change juste l'ajout pour qu'il soit à jour sur la donnée
      // Exemple 2 - Au lieu de faire : MODIF → MODIF
      //             On fait simplemement une modif à jour
      case 'edit':
        this.idb.transaction('rw', this.idb.deferredQueries, () => {
          this.idb.deferredQueries
            .orderBy('date').reverse()
            .filter(x => x.type === query.type)
            .filter(x => x.method === 'add' || x.method === 'edit')
            .filter(x => (x.data as any).id === (query.data as any).id)
            .each((deferredQuery, key) => {

              // Si on modifie après un ajout, on change directement l'ajout et on n'ajoutera pas cet DQ de modification
              if (deferredQuery.method === 'add') {

                deferredQuery.data = query.data;
                this.idb.deferredQueries.put(deferredQuery).then().catch(error => console.error(error));
                stillAddQuery = false;

              } else if (deferredQuery.method === 'edit') {

                deferredQueriesIdToDelete.push(key.primaryKey);

              }
            }).then(() => {
              // On supprime les requêtes inutiles
              this.idb.deferredQueries.bulkDelete(deferredQueriesIdToDelete);

              // Si l'objet était déjà en base avant d'être en HL, il faut quand même le modifier à la reconnexion
              if (stillAddQuery) {
                // On ajoute une requête différée pour modifier l'enregistrement dans la base plus tard
                this.idb.deferredQueries.add(query);
              }
            });

        });
        break;

      default:
        // On ajoute une requête différée pour mettre à jour la base plus tard
        this.idb.deferredQueries.add(query);
        break;
    }
  }

  // Utilise le contenu d'une DQ pour en faire un call d'API en Observable
  getApiCall(query: DeferredQuery): Observable<any> {
    // Exemple : this.caracteristique.add(query.data)
    return eval(`this.${query.type}.${query.method}(query.data)`);
  }

  // Execute toutes les DQ et renvoie une promise une fois que c'est bon
  executeAll(): Promise<void> {
    // On crée un tableau qui contiendra tous les calls d'API
    const apiCalls: Observable<any>[] = [];

    return new Promise(rslv => {

      // On ouvre manuellement une transaction en écriture
      this.idb.transaction('rw', this.idb.deferredQueries, () => {

        // On boucle sur toutes les DQ
        this.idb.deferredQueries.each((deferredQuery: DeferredQuery, cursor) => {

          // On ajoute le call d'api à la liste
          apiCalls.push(this.getApiCall(deferredQuery));

          // Une fois le call ajouté on supprime la DQ
          this.idb.deferredQueries.delete(cursor.primaryKey);
        }).then(() => {

          // On transforme le Observable<any>[] en Observable<any[]> avec forkJoin
          // puis on subscribe dessus pour savoir quand tous les calls d'API ont été faits, puis on retourne la Promise
          forkJoin(apiCalls).subscribe(() => rslv());
        });
      });
    });

  }
}
