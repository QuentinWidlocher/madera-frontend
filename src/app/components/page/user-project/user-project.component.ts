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
  currentProjet: Projet;

  projetListIndex: number;

  constructor(private projetSw: ProjetSwService) {
    projetSw.getAll().then(projets => {
      this.projets = projets;
    });
  }

  ngOnInit() {
  }

  selectProjet(projet: Projet, index: number) {
    this.currentProjet = projet;
    this.projetListIndex = index;
  }

}
