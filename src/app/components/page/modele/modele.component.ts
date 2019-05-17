import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { Modele } from 'src/app/classes/modele';
import { DossierTechnique } from 'src/app/classes/dossier-technique';
import { Produit } from 'src/app/classes/produit';
import { ProduitSwService } from 'src/app/services/service-workers/produit-sw.service';
import { ModeleSwService } from 'src/app/services/service-workers/modele-sw.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ComposantSwService } from 'src/app/services/service-workers/composant-sw.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Caracteristique } from 'src/app/classes/caracteristique';
import { Composant } from 'src/app/classes/composant';
import { MatTableDataSource, MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { ModuleSwService } from 'src/app/services/service-workers/module-sw.service';
import { ProjetDeleteConfirmationDialog } from '../projects/edit-project/edit-project.component';
import { Module } from 'src/app/classes/module';
import { Unite } from 'src/app/classes/unite';
import { FamilleGammeSwService } from '../../../services/service-workers/famille-gamme-sw.service';
import { GammeSwService } from '../../../services/service-workers/gamme-sw.service';
import { FamilleGamme } from '../../../classes/famille-gamme';
import { Gamme } from '../../../classes/gamme';
import { CoupeDePrincipeSwService } from '../../../services/service-workers/coupe-de-principe-sw.service';
import { CoupeDePrincipe } from '../../../classes/coupe-de-principe';
import { ModuleBase } from '../../../classes/moduleBase';
import { ModuleBaseSwService } from '../../../services/service-workers/module-base-sw.service';
import { ProduitModule } from '../../../classes/produitModule';
import { Location } from '@angular/common';
import { ModeleProduit } from '../../../classes/modeleProduit';
import { CaracteristiqueSwService } from '../../../services/service-workers/caracteristique-sw.service';
import { DossierTechniqueSwService } from 'src/app/services/service-workers/dossier-technique-sw.service';

export interface LigneFormat {
  module: Module;
  infoButton: string;
  deleteButton: string;
  caracteristiques: Caracteristique[];
  composants: Composant[];
}

export interface LigneFormatComposant {
  name: string;
  quantite: number;
  famille: string;
  gamme: string;
}

@Component({
  selector: 'app-modele',
  templateUrl: './modele.component.html',
  styleUrls: ['./modele.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', display: 'none', opacity: 0 })),
      state('expanded', style({ height: '*', opacity: 1 })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class ModeleComponent implements OnInit {

  @Output() onHamburger: EventEmitter<void> = new EventEmitter<void>();

  produits: Produit[] = [];
  produitsOriginal: Produit[] = [];
  currentProduit: Produit;
  produitListIndex: number;
  produitListLoading: boolean = true;
  produit: Produit;
  idModele: number;

  displayedColumns: string[] = ['module', 'infoButton', 'deleteButton'];
  expandedLine: LigneFormat | null;
  dataSource;

  displayedColumnsComposant: string[] = ['name', 'quantite', 'famille', 'gamme'];
  dataSourceComposant;

  sourcePage: string;
  sourceId: number;

  modele: Modele;
  dossier: DossierTechnique;

  constructor(
    private produitSw: ProduitSwService,
    private modeleSw: ModeleSwService,
    private moduleSw: ModuleSwService,
    private composantSw: ComposantSwService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private location: Location,
    private caracSw: CaracteristiqueSwService,
    private dossierSw: DossierTechniqueSwService,
  ) {
    this.route.params.subscribe(params => {
      if (params) {
        if (params.id) {
          this.idModele = +params['id'];
        }
        if (params.dossier) {
          this.dossier = Object.assign(DossierTechnique.newEmpty(), JSON.parse(params.dossier));

          this.sourcePage = 'dossier';
          this.sourceId = this.dossier.projet.id;


        }
        this.location.replaceState('modele/' + +params['id']);
      }
    });
  }

  ngOnInit() {

    this.produitListLoading = true;


    this.modeleSw.get(this.idModele).then(modele => {


      this.modele = modele;
      this.modele.oldModele = modele.id;
      this.modele.fakeModele = false;


      modele.modeleProduit.forEach(mp => {

        this.produitSw.get(mp.produitId).then(p => {


          var produitTmp = Object.assign(Produit.newEmpty(), p);
          produitTmp.produitModule = [];



          p.produitModule.forEach(pm => {

            this.moduleSw.get(pm.moduleId).then(m => {

              m.moduleBase.composantModule.forEach(cm => {

                this.composantSw.get(cm.composantId).then(c => {

                  cm.composant = c;

                });

              });
              produitTmp.produitModule.push(new ProduitModule(pm.moduleId, undefined, m, undefined));

            });

          });

          this.produits.push(produitTmp);

        });
      });

      this.produitsOriginal = this.produits;
      this.produitListLoading = false;
    });
    console.log(this.produits);

  }



  selectProduit(produit: Produit, index: number) {
    this.currentProduit = produit;
    this.produitListIndex = index;

    let lignes: LigneFormat[] = [];
    if (this.currentProduit.produitModule) {
      // Pour chaque modules du produit, on crée une ligne d'info
      produit.produitModule.forEach(pm => {
        lignes.push({
          module: pm.module,
          infoButton: '',
          deleteButton: '',
          composants: pm.module.moduleBase.composantModule.map(cm => cm.composant),
          caracteristiques: pm.module.caracteristiques
        });
      });
    }

    this.dataSource = new MatTableDataSource(lignes);
  }

  addProduit() {
    this.dialog.open(AddProduitDialog).afterClosed().subscribe((produit: Produit) => {
      if (produit) {
        produit.produitModule = [];
        this.produits.push(produit);
      }
    });

  }

  addModule() {
    this.dialog.open(AddModuleDialog).afterClosed().subscribe((module: Module) => {
      if (module) {

        var produitModule = ProduitModule.newEmpty();
        produitModule.produit = this.currentProduit;
        produitModule.produitId = this.currentProduit.id;
        produitModule.module = module;
        var index = this.produits.indexOf(this.currentProduit);
        this.produits[index].produitModule.push(produitModule);
        this.selectProduit(this.produits[index], index);
      }
    });

  }

  post() {

    let promisesProduit: Promise<any>[] = [];
    let modele = Object.assign(Modele.newEmpty(), this.modele);
    let produitIds: number[] = [];
    modele.modeleProduit = [];

    if (this.produits) {
      this.produits.forEach(p => {
        promisesProduit.push(new Promise(rslv => {

          let promisesModuleCarac: Promise<any>[] = [];
          let moduleIds: number[] = [];
          let produit = Object.assign(Produit.newEmpty(), p);
          p.id = undefined;
          p.cctp = undefined;
          p.produitModule = [];
          if (produit.produitModule) {

            produit.produitModule.forEach(pm => {

              promisesModuleCarac.push(new Promise(rslv1 => {

                let module = Object.assign(Module.newEmpty(), pm.module);
                module.id = undefined;
                module.labourCosts = module.moduleBase.labourCosts;


                this.moduleSw.add(module).then(m => {

                  pm.module.caracteristiques.forEach(c => {

                    promisesModuleCarac.push(new Promise(rslv2 => {

                      let caracteristique = Object.assign(Caracteristique.newEmpty(), c);
                      caracteristique.id = undefined;
                      caracteristique.composantId = undefined;
                      caracteristique.moduleId = m.id;

                      this.caracSw.add(caracteristique).then(carac => {
                        rslv2();
                      });

                    }));

                  })
                  moduleIds.push(m.id);
                  rslv1();
                });
              }));

            });
          }


          Promise.all(promisesModuleCarac).then(() => {
            moduleIds.forEach(id => {
              p.produitModule.push(new ProduitModule(id, undefined, undefined, undefined));
            });

            this.produitSw.add(p).then(prod => {
              produitIds.push(prod.id);
              rslv();
            });

          });

        }));
      });
    }

    Promise.all(promisesProduit).then(() => {

      produitIds.forEach(id => {
        modele.modeleProduit.push(new ModeleProduit(undefined, id, undefined, undefined));
      });
      modele.currentDossier = this.dossier.id;
      modele.user = undefined;
      this.modeleSw.add(modele).then(mod => {

        this.dossier.modeleId = mod.id;


        this.router.navigate(['/' + this.sourcePage, this.sourceId])



      }).catch(function (error) {
        console.log(error);
      });

    });


  }
  deleteModule(ligne: LigneFormat) {
    let produit : Produit;
    this.produits.forEach(p => {

      p.produitModule.forEach(pm => {

        if (Object.is(pm.module, ligne.module)) {
          var index = p.produitModule.indexOf(pm);
          p.produitModule.splice(index, 1);
         produit=p;
        }
      });
      
    });
    this.selectProduit(produit, this.produitListIndex);
  }

  deleteProduit(produit :Produit) {
    var index = this.produits.indexOf(this.currentProduit);
    this.produits.splice(index, 1);
    this.currentProduit = undefined;
  }

  expandLine(ligne: LigneFormat) {

    if (!ligne) {
      this.dataSourceComposant = null;
      return;
    }

    let lignes: LigneFormatComposant[] = [];
    let promises: Promise<any>[] = [];

    ligne.composants.forEach(composant => {
      promises.push(new Promise(rslv => {

        this.composantSw.get(composant.id).then(composantFull => {

          let ligneExistante = lignes.find((c) => c.name === composantFull.name);

          if (!ligneExistante) {
            lignes.push({
              name: composantFull.name,
              quantite: 1,
              famille: composantFull.familleComposant.nature,
              gamme: composantFull.gammeComposant.code
            });
          } else {
            lignes[lignes.indexOf(ligneExistante)].quantite += 1;
          }

          rslv();

        });

      }));
    });

    Promise.all(promises).then(() => {
      this.dataSourceComposant = new MatTableDataSource(lignes);
    });
  }

  showSizesDialog(ligne: LigneFormat) {
    this.dialog.open(ModuleSizesDialog, {
      data: ligne.module
    }).afterClosed().subscribe(module => {
      if (module) {
        this.moduleSw.edit(module);
      }
    });
  }

}

@Component({
  selector: 'sizes-dialog',
  templateUrl: './sizes.dialog.html'
})
export class ModuleSizesDialog {

  longueur: number = 0;
  hauteur: number = 0;

  constructor(public dialogRef: MatDialogRef<ModuleSizesDialog>,
    @Inject(MAT_DIALOG_DATA) public module: Module) {
    this.longueur = module.caracteristiques[0] ? module.caracteristiques[0].value : 0
    this.hauteur = module.caracteristiques[1] ? module.caracteristiques[1].value : 0
  }

  onOkClick() {

    if (this.longueur === 0 || this.hauteur === 0) {
      return;
    }

    if (!this.module.caracteristiques[0]) {
      this.module.caracteristiques.push(new Caracteristique(undefined, 'Longueur', this.longueur, undefined, undefined, new Unite(1, 'm', 'metre', undefined), 1, undefined, undefined));
    } else {
      this.module.caracteristiques[0].value = this.longueur;
    }

    if (!this.module.caracteristiques[1]) {
      this.module.caracteristiques.push(new Caracteristique(undefined, 'Hauteur', this.hauteur, undefined, undefined, new Unite(1, 'm', 'metre', undefined), 1, undefined, undefined));
    } else {
      this.module.caracteristiques[1].value = this.hauteur;
    }

    this.dialogRef.close(this.module);
  }

  onCancelClick() {
    this.dialogRef.close(null);
  }
}

@Component({
  selector: 'add-produit',
  templateUrl: './addProduit.dialog.html'
})
export class AddProduitDialog implements OnInit {


  newProduit: Produit;
  famillesGamme: FamilleGamme[];
  gammes: Gamme[];
  coupesDePrincipe: CoupeDePrincipe[];
  familleSelected: boolean = false;
  famille: FamilleGamme;
  gamme: Gamme;
  coupe: CoupeDePrincipe;
  name: string;

  constructor(public dialogRef: MatDialogRef<AddProduitDialog>,
    private familleGammeSw: FamilleGammeSwService,
    private coupeDePrincipeSw: CoupeDePrincipeSwService) {
  }

  ngOnInit() {

    this.coupeDePrincipeSw.getAll().then((coupesDePrincipe: CoupeDePrincipe[]) => {
      this.coupesDePrincipe = coupesDePrincipe;
    }
    );

    this.familleGammeSw.getAll().then((famillesGamme: FamilleGamme[]) => {
      this.famillesGamme = famillesGamme;
    }
    );

  }

  familleGammeSelected() {
    this.gamme = null;
    this.gammes = this.famille.gammes;
    this.familleSelected = true;

  }


  onOkClick() {
    this.newProduit = Produit.newEmpty();
    this.newProduit.description = this.name;
    this.newProduit.coupeDePrincipe = this.coupe;
    this.newProduit.coupeDePrincipeId = this.coupe.id;
    this.newProduit.gammeId = this.gamme.id;
    this.newProduit.gamme = this.gamme;
    this.newProduit.creationDate = new Date(Date.now());
    this.newProduit.editionDate = new Date(Date.now());


    this.dialogRef.close(this.newProduit);
  }

  onCancelClick() {
    this.dialogRef.close(null);
  }
}


@Component({
  selector: 'add-module',
  templateUrl: './addModule.dialog.html'
})
export class AddModuleDialog implements OnInit {


  newModule: Module;
  modulesBase: ModuleBase[];
  moduleBase: ModuleBase;
  composants: Composant[] = [];
  longueur: number = 0;
  hauteur: number = 0;
  caracteristiques: Caracteristique[] = [];
  caracteristique: Caracteristique;
  moduleSelected: boolean = false;

  description: string;

  constructor(public dialogRef: MatDialogRef<AddModuleDialog>,
    private moduleBaseSw: ModuleBaseSwService,
    private composantSw: ComposantSwService) {
  }

  ngOnInit() {

    this.moduleBaseSw.getAll().then((modulesBase: ModuleBase[]) => {
      this.modulesBase = modulesBase;
    }
    );

  }

  moduleBaseSelected() {
    this.composants = [];
    this.description = '';
    this.longueur = 0;
    this.hauteur = 0;
    this.caracteristiques = [];

    this.moduleBase.composantModule.forEach(c => {

      this.composantSw.get(c.composantId).then((composant: Composant) => {
        composant.quantite = c.quantity;
        this.composants.push(composant);
        this.description = this.moduleBase.description;
        this.moduleSelected = true;
      }
      );
    });



  }


  onOkClick() {
    this.newModule = Module.newEmpty();

    this.caracteristique = new Caracteristique(undefined, 'Longueur', this.longueur, undefined, undefined, new Unite(1, 'm', 'metre', undefined), 1, undefined, undefined);
    this.caracteristiques.push(this.caracteristique);
    this.caracteristique = new Caracteristique(undefined, 'Hauteur', this.hauteur, undefined, undefined, new Unite(1, 'm', 'metre', undefined), 1, undefined, undefined);
    this.caracteristiques.push(this.caracteristique);

    this.newModule.description = this.description;
    this.newModule.moduleBase = this.moduleBase;
    this.newModule.moduleBaseId = this.moduleBase.id;
    this.newModule.creationDate = new Date(Date.now());
    this.newModule.editionDate = new Date(Date.now());
    this.newModule.labourCosts = this.moduleBase.labourCosts;
    this.newModule.caracteristiques = this.caracteristiques;


    this.dialogRef.close(this.newModule);
  }

  onCancelClick() {
    this.dialogRef.close(null);
  }
}
