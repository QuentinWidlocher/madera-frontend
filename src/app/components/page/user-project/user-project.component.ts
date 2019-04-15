import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-project',
  templateUrl: './user-project.component.html',
  styleUrls: ['./user-project.component.scss']
})
export class UserProjectComponent implements OnInit {

  projets: Object[] = [];

  constructor() { 
    for (let i = 0; i < 15; i++) {
      this.projets.push({ name: "Robert LANGLOIS", description: "18/06/2018 - Projet n°1"})
    }
  }

  ngOnInit() {
  }

}
