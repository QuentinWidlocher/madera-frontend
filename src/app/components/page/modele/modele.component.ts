import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { Modele } from 'src/app/classes/modele';
import { DossierTechnique } from 'src/app/classes/dossier-technique';
import { Produit } from 'src/app/classes/produit';
import { ProduitSwService } from 'src/app/services/service-workers/produit-sw.service';
import { ModeleSwService } from 'src/app/services/service-workers/modele-sw.service';
import { ActivatedRoute } from '@angular/router';
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

  allProduits: Produit[];

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
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.refresh();
  }

  refresh() {
    this.produitListLoading = true;

    // On charge tous les produits
    this.produitSw.getAll().then(produits => {

      // On les stock pour pouvoir les afficher plus tard
      this.allProduits = produits

      // On trouve le modèle et on charge ses valeurs
      this.route.params.subscribe(params => {
        if (params) {
          this.modeleSw.get(+params['id']).then(modele => {

            this.modele = modele;


            modele.modeleProduit.forEach(mp => {
              let produit = produits.find(produit => produit.id === mp.produitId)
              this.produits.push(produit);

            });

            this.produitsOriginal = this.produits;
            this.produitListLoading = false;
          });
        }
      });
    });

  }

  selectProduit(produit: Produit, index: number) {
    this.currentProduit = produit;
    this.produitListIndex = index;

    let lignes: LigneFormat[] = [];
    let promises: Promise<any>[] = [];
    if (this.currentProduit.produitModule) {
      // Pour chaque modules du produit, on crée une ligne d'info
      produit.produitModule.forEach(pm => {

        promises.push(new Promise(rslv => {

          this.moduleSw.get(pm.moduleId).then(module => {
            lignes.push({
              module: module,
              infoButton: '',
              deleteButton: '',
              composants: module.moduleBase.composantModule.map(cm => cm.composant),
              caracteristiques: module.caracteristiques
            });

            rslv();
          });

        }));

      });
    }
    // Quand toutes les lignes ont été créée, on instancie la dataSource du tableau
    Promise.all(promises).then(() => {
      this.dataSource = new MatTableDataSource(lignes);

    });

  }

  addProduit() {
    this.dialog.open(AddProduitDialog).afterClosed().subscribe((produit: Produit) => {
      if (produit) {
        this.produits.push(produit);
      }
    });

  }

  addModule() {
    this.dialog.open(AddModuleDialog).afterClosed().subscribe((module: Module) => {
      if (module) {

        ///L'ajout du MODULE EST BON
        console.log(module);
        var produitModule = ProduitModule.newEmpty();
        produitModule.produit = this.currentProduit;
        produitModule.produitId = this.currentProduit.id;
        produitModule.module = module;
        this.currentProduit.produitModule.push(produitModule);
        
      }
    });

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
      this.module.caracteristiques.push(new Caracteristique(undefined, 'Longueur', this.longueur, undefined, undefined, new Unite(1, 'm', 'metre', undefined),1));
    } else {
      this.module.caracteristiques[0].value = this.longueur;
    }

    if (!this.module.caracteristiques[1]) {
      this.module.caracteristiques.push(new Caracteristique(undefined, 'Hauteur', this.hauteur, undefined, undefined, new Unite(1, 'm', 'metre', undefined),1));
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
  caracteristiques: Caracteristique[]= [];
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
        console.log(c.composant);

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

    this.caracteristique = new Caracteristique(undefined, 'Longueur', this.longueur, undefined, undefined, new Unite(1, 'm', 'metre', undefined), 1);
    this.caracteristiques.push(this.caracteristique);
    this.caracteristique = new Caracteristique(undefined, 'Hauteur', this.hauteur, undefined, undefined, new Unite(1, 'm', 'metre', undefined), 1);
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
