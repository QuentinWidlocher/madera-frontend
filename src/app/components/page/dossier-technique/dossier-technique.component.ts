import { Component, OnInit } from '@angular/core';
import { Composant } from '../../../classes/composant';
import { DossierTechnique } from '../../../classes/dossier-technique';
import { Modele } from '../../../classes/modele';
import { ModeleProduit } from '../../../classes/modeleProduit';
import { Module } from '../../../classes/module';
import { Produit } from '../../../classes/produit';
import { ProduitModule } from '../../../classes/produitModule';
import { Projet } from 'src/app/classes/projet';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { DossierTechniqueSwService } from 'src/app/services/service-workers/dossier-technique-sw.service';
import { ModuleSwService } from 'src/app/services/service-workers/module-sw.service';
import { ComposantSwService } from 'src/app/services/service-workers/composant-sw.service';
import { ProjetSwService } from 'src/app/services/service-workers/projet-sw.service';
import { ModeleSwService } from 'src/app/services/service-workers/modele-sw.service';
import { ProduitSwService } from 'src/app/services/service-workers/produit-sw.service';
import { MatTableDataSource } from '@angular/material';
import { trigger, state, style, transition, animate } from '@angular/animations';

export interface LigneFormat {
  produit: string;
  modulesSize: number;
  modules: Module[];
  gamme: string;
}

@Component({
  selector: 'app-dossier-technique',
  templateUrl: './dossier-technique.component.html',
  styleUrls: ['./dossier-technique.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', display: 'none', opacity: 0 })),
      state('expanded', style({ height: '*', opacity: 1 })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class DossierTechniqueComponent implements OnInit {

  projet: Projet;
  dossierTechnique: DossierTechnique;
  currentModele: Modele;

  modeles: Modele[] = [];
  modeleListLoading = true;

  displayedColumns: string[] = ['produit', 'modules', 'gamme'];
  expandedLine: LigneFormat | null;
  dataSource;

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
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.modeleListLoading = true;
    this.modeleSw.getAll().then(modeles => {
      this.modeles = modeles;
      this.modeleListLoading = false;
    });

    this.route.params.subscribe(params => {
      if (params['id']) {
        this.loadDossier(+params['id']);
      }
    });

    // Met à jour le temps estimé quand on quitte la page
    this.router.events.subscribe(e => {
      if (e instanceof NavigationEnd) {
        this.dossierSw.edit(this.dossierTechnique);
      }
    });
  }

  loadDossier(idProjet: number) {

    // On charge le projet
    this.projetSw.get(idProjet).then((projet: Projet) => {

      this.projet = projet;

      this.dossierTechnique = DossierTechnique.newEmpty();

      // on rempli le dossier
      this.dossierSw.get(projet.dossierTechnique.id).then((dossierTechnique: DossierTechnique) => {
        this.dossierTechnique = dossierTechnique;

        // on rempli le modele
        this.modeleSw.get(this.dossierTechnique.modele.id).then((modele: Modele) => {
          this.dossierTechnique.modele = modele;
          this.currentModele = modele;

          let lignes: LigneFormat[] = [];

          // on rempli les produits pour chaque modeleProduit
          this.dossierTechnique.modele.modeleProduit.forEach(m => {

            this.produitSw.get(m.produit.id).then((produit: Produit) => {
              m.produit = produit;

              lignes.push({
                produit: produit.description,
                modulesSize: produit.produitModule.length,
                modules: produit.produitModule.map(pm => pm.module),
                gamme: produit.gamme.code
              });

              // on rempli les modules pour chaque ProduitModule
              m.produit.produitModule.forEach(p => {
                this.moduleSw.get(p.module.id).then((module: Module) => {
                  p.module = module;

                  // on rempli les composants pour chaque ComposantModule
                  p.module.moduleBase.composantModule.forEach(c => {
                    this.composantSw.get(c.composant.id).then((composant: Composant) => {
                      c.composant = composant;
                    });

                  });

                });

              });

              this.dataSource = new MatTableDataSource(lignes);

            });

          });

        });

      });

    });

  }

  selectModele(modele: Modele) {
    this.currentModele = modele;
    this.dossierTechnique.modele = modele;

    let lignes: LigneFormat[] = [];

    this.modeleSw.get(modele.id).then(modele => {
      // on rempli les produits pour chaque modeleProduit
      modele.modeleProduit.forEach(m => {

        this.produitSw.get(m.produit.id).then((produit: Produit) => {
          m.produit = produit;

          lignes.push({
            produit: produit.description,
            modulesSize: produit.produitModule.length,
            modules: produit.produitModule.map(pm => pm.module),
            gamme: produit.gamme.code
          });

          // on rempli les modules pour chaque ProduitModule
          m.produit.produitModule.forEach(p => {
            this.moduleSw.get(p.module.id).then((module: Module) => {
              p.module = module;

              // on rempli les composants pour chaque ComposantModule
              p.module.moduleBase.composantModule.forEach(c => {
                this.composantSw.get(c.composant.id).then((composant: Composant) => {
                  c.composant = composant;
                });

              });

            });

          });

          this.dataSource = new MatTableDataSource(lignes);
        });
      });
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