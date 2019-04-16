import { Component, OnInit } from '@angular/core';
import { Projet } from 'src/app/classes/projet';
import { ProjetSwService } from 'src/app/services/service-workers/projet-sw.service';

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
  locked = true;

  constructor(private projetSw: ProjetSwService) {
    this.projetListLoading = true;
    projetSw.getAll().then(projets => {
      this.projets = projets;
      this.projetsOriginal = projets;
      this.projetListLoading = false;
    });
  }

  ngOnInit() {
  }

  selectProjet(projet: Projet, index: number) {
    console.log(projet);
    this.currentProjet = projet;
    this.projetListIndex = index;
  }

  searchProjet() {
    if (this.searchTerms === '') {
      this.projets = this.projetsOriginal;
      return;
    }

    this.projets = this.projetsOriginal.filter(x => {      
      return x.title.match(new RegExp(this.searchTerms, 'i'));
    });
  }

}
