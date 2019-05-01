import { Component, OnInit } from '@angular/core';
import { Composant } from '../../../classes/composant';
import { DossierTechnique } from '../../../classes/dossier-technique';
import { Modele } from '../../../classes/modele';
import { ModeleProduit } from '../../../classes/modeleProduit';
import { Module } from '../../../classes/module';
import { Produit } from '../../../classes/produit';
import { ProduitModule } from '../../../classes/produitModule';
import { Projet } from 'src/app/classes/projet';
import { ActivatedRoute } from '@angular/router';
import { DossierTechniqueSwService } from 'src/app/services/service-workers/dossier-technique-sw.service';
import { ModuleSwService } from 'src/app/services/service-workers/module-sw.service';
import { ComposantSwService } from 'src/app/services/service-workers/composant-sw.service';
import { ProjetSwService } from 'src/app/services/service-workers/projet-sw.service';
import { ModeleSwService } from 'src/app/services/service-workers/modele-sw.service';
import { ProduitSwService } from 'src/app/services/service-workers/produit-sw.service';

@Component({
  selector: 'app-dossier-technique',
  templateUrl: './dossier-technique.component.html',
  styleUrls: ['./dossier-technique.component.scss']
})
export class DossierTechniqueComponent implements OnInit {

  projet: Projet;
  dossierTechnique: DossierTechnique;
  produitPost1: Produit;
  produitPost2: Produit;
  dossierTechniquePost: DossierTechnique;
  loadComplete: boolean = false;

  constructor(private dossierSw: DossierTechniqueSwService, 
              private modeleSw: ModeleSwService,
              private produitSw: ProduitSwService,
              private moduleSw: ModuleSwService, 
              private composantSw: ComposantSwService,
              private projetSw: ProjetSwService,
              private route: ActivatedRoute
              ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.loadDossier(+params['id']);
      }
    });
  }

  loadDossier(idProjet: number) {
    this.loadComplete = false;
    
    this.projetSw.get(idProjet).then((projet: Projet) => {

      this.projet = projet;

      this.dossierTechnique = DossierTechnique.newEmpty();

      // on rempli le dossier
      this.dossierSw.get(projet.dossierTechnique.id).then((dossierTechnique: DossierTechnique) => {
        this.dossierTechnique = dossierTechnique;

        // on rempli le model

        this.modeleSw.get(this.dossierTechnique.modele.id).then((modele: Modele) => {
          this.dossierTechnique.modele = modele;

          // on rempli les produits pour chaque modeleProduit
          this.dossierTechnique.modele.modeleProduit.forEach(m => {

            this.produitSw.get(m.produit.id).then((produit: Produit) => {
              m.produit = produit;

              // on rempli les modules pour chaque ProduitModule
              m.produit.produitModule.forEach(p => {
                this.moduleSw.get(p.module.id).then((module: Module) => {
                  p.module = module;

                  // on rempli les composants pour chaque ComposantModule
                  p.module.moduleBase.composantModule.forEach(c => {
                    this.composantSw.get(c.composant.id).then((composant: Composant) => {
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
    });

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
