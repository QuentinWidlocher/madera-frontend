import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {

  projets: Object[] = [];

  constructor() { 
    for (let i = 0; i < 15; i++) {
      this.projets.push({ name: "Robert LANGLOIS", description: "18/06/2018 - Projet n°1"})
    }
  }

  ngOnInit() {
  }

}
