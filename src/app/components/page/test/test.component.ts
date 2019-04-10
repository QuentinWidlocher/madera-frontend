import { Component, OnInit } from '@angular/core';
import { Caracteristique } from 'src/app/classes/caracteristique';
import { CaracteristiqueSwService } from 'src/app/services/service-workers/caracteristique-sw.service';
import { DeferredQueriesService } from 'src/app/services/deferred-queries.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  caracteristiques: Caracteristique[];

  newCaracteristique: string;

  constructor(private caracteristiqueSw: CaracteristiqueSwService) { }

  ngOnInit() {
    this.refreshList();
  }

  refreshList() {
    this.caracteristiqueSw.getAll().then(caracteristiques => {
      this.caracteristiques = caracteristiques;
    });
  }

  addCaracteristique() {
    const newCaracteristique = new Caracteristique(undefined, this.newCaracteristique, 0, undefined, undefined);
    this.caracteristiqueSw.add(newCaracteristique).then(() => {
      this.caracteristiques.push(newCaracteristique);
      this.newCaracteristique = '';
    });
  }

  deleteCaracteristique(caracteristique: Caracteristique) {
    this.caracteristiqueSw.delete(caracteristique.id).then(() => {
      this.caracteristiques.splice(this.caracteristiques.indexOf(caracteristique), 1);
    });
  }

}
