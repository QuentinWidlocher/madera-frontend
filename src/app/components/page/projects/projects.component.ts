import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Location } from '@angular/common';
import { Projet } from 'src/app/classes/projet';
import { ProjetSwService } from 'src/app/services/service-workers/projet-sw.service';
import { Client } from 'src/app/classes/client';
import { ClientSwService } from 'src/app/services/service-workers/client-sw.service';
import { ConnectivityService } from 'src/app/services/connectivity.service';
import { DevisSwService } from 'src/app/services/service-workers/devis-sw.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  @Output() onHamburger: EventEmitter<void> = new EventEmitter<void>();

  projets: Projet[] = [];
  projetsOriginal: Projet[] = [];  
  currentProjet: Projet;

  projetListIndex: number;
  projetListLoading = true;

  totalTTC: number = 0;

  searchTerms: string;
  filterMenu = false;
  selectedClientsIds: number[] = [];
  listClient: Client[] = [];

  editMode = false;
  createMode = false;

  constructor(private projetSw: ProjetSwService,
              private clientSw: ClientSwService,
              private devisSw: DevisSwService,
              private connectivity: ConnectivityService,
              private location: Location,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.currentProjet = undefined;
    this.refresh();

    // On met à jours la liste quand on retrouve l'internet
    this.connectivity.event.subscribe(connected => {
      if (connected && !this.editMode) {
        this.refresh();
      }
    });
  }

  refresh() {
    this.projetListLoading = true;
    this.projetSw.getAll().then(projets => {
      this.projets = projets;
      this.projetsOriginal = projets;
      this.projetListLoading = false;

      if (this.projetListIndex > 0) {
        this.currentProjet = this.projetsOriginal[this.projetListIndex];        
      }

      this.route.params.subscribe(params => {
        if (params) {
          let projet = this.projets.find((projet) => projet.id === +params['id']);
          let index = this.projets.indexOf(projet);

          if (projet) {
            this.selectProjet(projet, index);
          }
        }
      });
    });

    this.clientSw.getAll().then(clients => {
      this.listClient = clients;
    });
  }

  selectProjet(projet: Projet, index: number) {
    if (this.editMode) {
      return;
    }
    this.currentProjet = projet;
    this.projetListIndex = index;

    this.location.replaceState('/projects/' + projet.id);

    if (projet.devis) {
      this.devisSw.get(projet.devis.id).then(devis => {
        if (devis.lignes && devis.lignes.length > 0) {  
          this.totalTTC = devis.lignes.map(item => item.unitPriceTax).reduce((prev, next) => prev + next);
          console.log('%c ' + this.totalTTC, 'color: #2196f3');
        } else {
          this.totalTTC = 0;
        }
      });
    } else {
      this.totalTTC = 0;
    }
  }

  filter() {
    this.projets = this.projetsOriginal.filter(x => {
      let valid = true;

      if (this.searchTerms !== '') {
        valid = valid && x.title.match(new RegExp(this.searchTerms, 'i')) ? true : false;
      } else {
        valid = valid && true;
      }

      if (this.selectedClientsIds.length > 0) {
        valid = valid && this.selectedClientsIds.includes(x.client.id);
      }

      return valid;
    });
  }


  createProjet() {
    this.currentProjet = Projet.newEmpty();
    this.changeEditMode(true, true);
  }

  changeEditMode(state = !this.editMode, createMode = false) {
    if (!this.currentProjet) {
      return;
    }

    this.createMode = createMode;
    this.editMode = state;
  }

  exitedEditMode(action: string) {
    this.editMode = false;

    switch (action) {

      case 'delete':
        this.projets = this.projets.filter(projet => {
          return projet !== this.currentProjet;
        });
        this.projetsOriginal = this.projets;
        this.currentProjet = undefined;
        break;
    
      case 'create':
        this.projets.push(this.currentProjet);
        this.projetsOriginal = this.projets;
        break;

      case 'cancel':
        if (this.createMode) {
          this.currentProjet = undefined;
        }
        break;
    }
  }

}
