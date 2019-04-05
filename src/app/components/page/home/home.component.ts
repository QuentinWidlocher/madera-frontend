import { Component, OnInit } from '@angular/core';
import { Caracteristique } from 'src/app/classes/caracteristique';
import { CaracteristiqueSwService } from 'src/app/services/service-workers/caracteristique-sw.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  caracteristiques: Caracteristique[] = [];

  constructor(private caracteristiqueSw: CaracteristiqueSwService) { }

  ngOnInit() {
    this.caracteristiqueSw.getAll().then(caracteristiques => {
      console.log(caracteristiques);

      this.caracteristiques = caracteristiques;
    });
  }

}
