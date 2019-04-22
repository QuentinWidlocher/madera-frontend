import { Component, OnInit } from '@angular/core';
import { Projet } from 'src/app/classes/projet';
import { ProjetSwService } from 'src/app/services/service-workers/projet-sw.service';
import { Client } from 'src/app/classes/client';
import { ClientSwService } from 'src/app/services/service-workers/client-sw.service';

@Component({
  selector: 'app-user-project',
  templateUrl: './user-project.component.html',
  styleUrls: ['./user-project.component.scss']
})
export class UserProjectComponent implements OnInit {

  projets: Projet[] = [];
  projetsOriginal: Projet[] = [];  
  currentProjet: Projet;

  projetListIndex: number;
  projetListLoading = true;

  searchTerms: string;
  filterMenu = false;
  selectedClientsIds: number[] = [];
  listClient: Client[] = [];

  editMode = false;
  createMode = false;

  constructor(private projetSw: ProjetSwService,
              private clientSw: ClientSwService) {
  }

  ngOnInit() {
    this.refresh();
  }

  refresh() {
    this.currentProjet = undefined;
    this.projetListLoading = true;
    this.projetSw.getAll().then(projets => {
      this.projets = projets;
      this.projetsOriginal = projets;
      this.projetListLoading = false;

      if (this.projetListIndex > 0) {
        this.currentProjet = this.projetsOriginal[this.projetListIndex];
      }
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
