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

  execute(query: DeferredQuery) {
    const type = query.type.toLowerCase();
    const method = query.method.toLowerCase();

    eval(`this.${type}.${method}(query.data).subscribe();`);
  }

  executeAll() {
    this.idb.transaction('rw', this.idb.deferredQueries, () => {
      this.idb.deferredQueries.each((deferredQuery: DeferredQuery, cursor) => {
        this.execute(deferredQuery);
        this.idb.deferredQueries.delete(cursor.primaryKey);
      });
    });

  }
}
