import { Component, OnInit } from '@angular/core';
import { DossierTechniqueSwService } from 'src/app/services/service-workers/dossier-technique-sw.service';
import { ActivatedRoute } from '@angular/router';
import { DossierTechnique } from 'src/app/classes/dossier-technique';
import { ProjetSwService } from 'src/app/services/service-workers/projet-sw.service';
import { Projet } from 'src/app/classes/projet';
import { ModeleSwService } from 'src/app/services/service-workers/modele-sw.service';
import { ProduitSwService } from 'src/app/services/service-workers/produit-sw.service';
import { ModuleSwService } from 'src/app/services/service-workers/module-sw.service';
import { ComposantSwService } from 'src/app/services/service-workers/composant-sw.service';
import { Modele } from 'src/app/classes/modele';
import { Produit } from 'src/app/classes/produit';
import { Module } from 'src/app/classes/module';
import { Composant } from 'src/app/classes/composant';
import { MatTableDataSource } from '@angular/material';
import { ProduitModule } from 'src/app/classes/produitModule';
import { ComposantModule } from 'src/app/classes/composantModule';

export interface LigneFormat {
}

@Component({
  selector: 'app-dossier-technique-tab',
  templateUrl: './dossier-technique-tab.component.html',
  styleUrls: ['./dossier-technique-tab.component.scss']
})
export class DossierTechniqueTabComponent implements OnInit {

  projet: Projet;
  dossierTechnique: DossierTechnique;

  totalsModule: number[][] = new Array<Array<number>>();
  totalsProduit: number[][] = new Array<Array<number>>();

  ready: boolean = false;
  printMode: boolean = true;

  constructor(
    private dossierSw: DossierTechniqueSwService,
    private projetSw: ProjetSwService,
    private modeleSw: ModeleSwService,
    private produitSw: ProduitSwService,
    private moduleSw: ModuleSwService,
    private composantSw: ComposantSwService,
    private route: ActivatedRoute
    ) { }

  ngOnInit() {
    this.print();

    this.route.params.subscribe(params => {
      if (params['id']) {
        const id = +params['id'];
        this.loadDossier(id);
      }
    });
  }

  loadDossier(idProjet: number) {

    // On charge le projet
    this.projetSw.get(idProjet).then((projet: Projet) => {

      this.projet = projet;

      this.dossierTechnique = DossierTechnique.newEmpty();
      this.dossierTechnique.projet = projet;
      this.dossierTechnique.projetId = projet.id;

      // on rempli le dossier
      this.dossierSw.get(projet.dossierTechnique.id).then((dossierTechnique: DossierTechnique) => {
        this.dossierTechnique = dossierTechnique;
        this.dossierTechnique.projet = projet;

        this.projet.dossierTechnique = this.dossierTechnique;

        // on rempli le modele
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

                  this.totalsModule[produit.id+''+module.id] = [];
                  this.totalsModule[produit.id+''+module.id]['quantity'] = 0;
                  this.totalsModule[produit.id+''+module.id]['puht']     = 0;
                  this.totalsModule[produit.id+''+module.id]['puttc']    = 0;
                  this.totalsModule[produit.id+''+module.id]['total']    = 0;

                  // on rempli les composants pour chaque ComposantModule
                  p.module.moduleBase.composantModule.forEach(cm => {
                    this.composantSw.get(cm.composant.id).then((composant: Composant) => {
                      cm.composant = composant;
                      
                      this.totalsModule[produit.id+''+module.id]['quantity']  += cm.quantity;
                      this.totalsModule[produit.id+''+module.id]['puht']      += cm.composant.unitPriceNoTax;
                      this.totalsModule[produit.id+''+module.id]['puttc']     += cm.composant.unitPriceTax;
                      this.totalsModule[produit.id+''+module.id]['total']  
                    });
                    this.ready = true;
                  });
                  
                });

              });

            });

          });

        });

      });

    });


  }

  print() {
    document.body.className = 'print-mode';

    for (let i = 0; i < document.getElementsByClassName('page').length; i++) {
      const element = document.getElementsByClassName('page')[i];
      
      element.classList.add('print-mode');
    }

    document.getElementById('nav-bar').className = 'print-mode';
  }

}
