import { Component, OnInit } from '@angular/core';
import { Composant } from '../../../classes/composant';
import { DossierTechnique } from '../../../classes/dossier-technique';
import { Modele } from '../../../classes/modele';
import { ModeleProduit } from '../../../classes/modeleProduit';
import { Module } from '../../../classes/module';
import { Produit } from '../../../classes/produit';
import { ProduitModule } from '../../../classes/produitModule';
import { ComposantApiService } from '../../../services/api/composant-api.service';
import { DossierTechniqueApiService } from '../../../services/api/dossier-technique-api.service';
import { ModeleApiService } from '../../../services/api/modele-api.service';
import { ModuleApiService } from '../../../services/api/module-api.service';
import { ProduitApiService } from '../../../services/api/produit-api.service';

@Component({
  selector: 'app-dossier-technique',
  templateUrl: './dossier-technique.component.html',
  styleUrls: ['./dossier-technique.component.scss']
})
export class DossierTechniqueComponent implements OnInit {

  dossierTechnique: DossierTechnique;
  produitPost1: Produit;
  produitPost2: Produit;
  dossierTechniquePost: DossierTechnique;
  loadComplete: boolean = false;

  constructor(private dossierApi: DossierTechniqueApiService, private modeleApi: ModeleApiService,
    private produitApi: ProduitApiService, private moduleApi: ModuleApiService, private composantApi: ComposantApiService
  ) { }

  ngOnInit() {
    this.loadComplete = false;
    this.dossierTechnique = DossierTechnique.newEmpty();

    // on rempli le dossier
    this.dossierApi.get(1).subscribe((dossierTechnique: DossierTechnique) => {
      this.dossierTechnique = dossierTechnique;

      // on rempli le model

      this.modeleApi.get(this.dossierTechnique.modele.id).subscribe((modele: Modele) => {
        this.dossierTechnique.modele = modele;

        // on rempli les produits pour chaque modeleProduit
        this.dossierTechnique.modele.modeleProduit.forEach(m => {

          this.produitApi.get(m.produit.id).subscribe((produit: Produit) => {
            m.produit = produit;

            // on rempli les modules pour chaque ProduitModule
            m.produit.produitModule.forEach(p => {
              this.moduleApi.get(p.module.id).subscribe((module: Module) => {
                p.module = module;

                // on rempli les composants pour chaque ComposantModule
                p.module.moduleBase.composantModule.forEach(c => {
                  this.composantApi.get(c.composant.id).subscribe((composant: Composant) => {
                    c.composant = composant;
                    this.loadComplete = true;
                    console.log(this.dossierTechnique);
                  }

                    , err => { console.log(err) });
                }
                );

              }

                , err => { console.log(err) });
            }
            );
          }
            , err => { console.log(err) });
        }
        );
      }
        , err => { console.log(err) });
    }
      , err => { console.log(err) });

  }

  post() {
    //création dossier
    this.dossierTechniquePost.creationDate = new Date();
    this.dossierTechniquePost.editionDate = new Date();
    //création modele avec assignation a un user
    this.dossierTechnique.modele.description = "prout";
    this.dossierTechniquePost.modele.creationDate = new Date();
    this.dossierTechniquePost.modele.editionDate = new Date();
    this.dossierTechniquePost.modele.userId = 1;

    //création de deux produitavec assignation a des gammes etc
    this.produitPost1.cctpId = 1;
    this.produitPost1.coupeDePrincipeId = 1;
    this.produitPost1.gammeId = 1;
    this.produitPost1.creationDate = new Date();
    this.produitPost1.editionDate = new Date();
    this.produitPost1.description = "prout";
    this.produitPost1.produitModule.push(new ProduitModule(1, null, null, null))
    ///////////////////////////////////////
    this.produitPost2.cctpId = 1;
    this.produitPost2.coupeDePrincipeId = 1;
    this.produitPost2.gammeId = 1;
    this.produitPost2.creationDate = new Date();
    this.produitPost2.editionDate = new Date();
    this.produitPost2.description = "prout2";
    this.produitPost2.produitModule.push(new ProduitModule(1, null, null, null))



    //push des produit dans modeleProduit
    this.dossierTechniquePost.modele.modeleProduit.push(new ModeleProduit(null, null, null, this.produitPost1));
    this.dossierTechniquePost.modele.modeleProduit.push(new ModeleProduit(null, null, null, this.produitPost2));
  }

}
