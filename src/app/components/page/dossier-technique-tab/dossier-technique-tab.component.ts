import {
  Component,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import {
  DossierTechniqueSwService
} from 'src/app/services/service-workers/dossier-technique-sw.service';
import {
  ActivatedRoute
} from '@angular/router';
import {
  DossierTechnique
} from 'src/app/classes/dossier-technique';
import {
  ProjetSwService
} from 'src/app/services/service-workers/projet-sw.service';
import {
  Projet
} from 'src/app/classes/projet';
import {
  ModeleSwService
} from 'src/app/services/service-workers/modele-sw.service';
import {
  ProduitSwService
} from 'src/app/services/service-workers/produit-sw.service';
import {
  ModuleSwService
} from 'src/app/services/service-workers/module-sw.service';
import {
  ComposantSwService
} from 'src/app/services/service-workers/composant-sw.service';
import {
  Modele
} from 'src/app/classes/modele';
import {
  Produit
} from 'src/app/classes/produit';
import {
  Module
} from 'src/app/classes/module';
import {
  Composant
} from 'src/app/classes/composant';

export interface LigneFormat {}

@Component({
  selector: 'app-dossier-technique-tab',
  templateUrl: './dossier-technique-tab.component.html',
  styleUrls: ['./dossier-technique-tab.component.scss']
})
export class DossierTechniqueTabComponent implements OnInit {

  projet: Projet;
  dossierTechnique: DossierTechnique;

  totalsModule: number[][] = new Array < Array < number >> ();
  totalsProduit: number[][] = new Array < Array < number >> ();

  ready: boolean = false;
  printMode: boolean = false;

  constructor(
    private dossierSw: DossierTechniqueSwService,
    private projetSw: ProjetSwService,
    private modeleSw: ModeleSwService,
    private produitSw: ProduitSwService,
    private moduleSw: ModuleSwService,
    private composantSw: ComposantSwService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {

    this.route.params.subscribe(params => {
      if (params['id']) {
        const id = +params['id'];
        this.loadDossier(id);
      }
    });
  }

  loadDossier(idProjet: number) {

    new Promise((rslv) => {
      // On charge le projet
      this.projetSw.get(idProjet).then((projet: Projet) => {

        this.projet = projet;

        this.dossierTechnique = DossierTechnique.newEmpty();
        this.dossierTechnique.projet = projet;
        this.dossierTechnique.projetId = projet.id;

        rslv(projet)
      });

    }).then((projet: Projet) => {

      return new Promise(rslv => {
        // on rempli le dossier
        this.dossierSw.get(projet.dossierTechniqueId).then((dossierTechnique: DossierTechnique) => {
          this.dossierTechnique = dossierTechnique;
          this.dossierTechnique.projet = projet;

          this.projet.dossierTechnique = this.dossierTechnique;

          if (!this.dossierTechnique.modele.id) {
            this.ready = true;
            return;
          }

          rslv();
        });
      });

    }).then(() => {

      return new Promise(rslv => {

        // on rempli le modele
        this.modeleSw.get(this.dossierTechnique.modeleId).then((modele: Modele) => {
          this.dossierTechnique.modele = modele;

          rslv();
        });

      });

    }).then(() => {

      const promises: Promise < void > [] = [];

      // on rempli les produits pour chaque modeleProduit
      this.dossierTechnique.modele.modeleProduit.forEach(m => {

        promises.push(new Promise(rslv => {

          this.produitSw.get(m.produit.id).then((produit: Produit) => {
            m.produit = produit;

            rslv();
          }); // produitSw

        })); // promises push

      }); // foreach modeleproduit

      return Promise.all(promises);

    }).then(() => {
      const promises2: Promise<void>[] = [];

      this.dossierTechnique.modele.modeleProduit.forEach(m => {

        // on rempli les modules pour chaque ProduitModule
        m.produit.produitModule.forEach(p => {

          promises2.push(new Promise(rslv => {
            this.moduleSw.get(p.module.id).then((module: Module) => {
              p.module = module;

              this.totalsModule[m.produit.id + '-' + module.id] = [];
              this.totalsModule[m.produit.id + '-' + module.id]['quantity'] = 0;
              this.totalsModule[m.produit.id + '-' + module.id]['puht'] = 0;
              this.totalsModule[m.produit.id + '-' + module.id]['puttc'] = 0;
              this.totalsModule[m.produit.id + '-' + module.id]['total'] = 0;
              rslv();
            });
          }));
        }); // foreach produitmodule
      });

      return Promise.all(promises2);

    }).then(() => {

      const promises3: Promise<void>[] = [];

      this.dossierTechnique.modele.modeleProduit.forEach(m => {

        // on rempli les modules pour chaque ProduitModule
        m.produit.produitModule.forEach(p => {

          // on rempli les composants pour chaque ComposantModule
          p.module.moduleBase.composantModule.forEach(cm => {

            promises3.push(new Promise(rslv => {
              this.composantSw.get(cm.composant.id).then((composant: Composant) => {

                cm.composant = composant;
                this.totalsModule[m.produit.id + '-' + p.module.id]['quantity'] += cm.quantity;
                this.totalsModule[m.produit.id + '-' + p.module.id]['puht'] += cm.composant.unitPriceNoTax;
                this.totalsModule[m.produit.id + '-' + p.module.id]['puttc'] += cm.composant.unitPriceTax;
                this.totalsModule[m.produit.id + '-' + p.module.id]['total']
                rslv();
              });
            }));

          }); // foreach composantmodule

        });

      });

      return Promise.all(promises3);
    }).then(() => {
      this.ready = true;
    });
  }

  print() {
    this.printMode = true;

    document.body.className = 'print-mode';

    document.getElementById('tableau-dossier').className = 'mat-table'

    for (let i = 0; i < document.getElementsByClassName('page').length; i++) {
      const element = document.getElementsByClassName('page')[i];

      element.classList.add('print-mode');
    }

    // const navbarClasses = document.getElementById('nav-bar').className;
    // document.getElementById('nav-bar').className = 'print-mode';

    setTimeout(() => {
      window.print();

      this.printMode = false;

      document.body.className = '';

      document.getElementById('tableau-dossier').className = 'mat-table m-4 p-2 mat-elevation-z2'

      for (let i = 0; i < document.getElementsByClassName('page print-mode').length; i++) {
        const element = document.getElementsByClassName('page print-mode')[i];

        element.classList.remove('print-mode');
      }

      // document.getElementById('nav-bar').className = navbarClasses;
    }, 500);
  }

}
