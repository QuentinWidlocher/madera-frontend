import { Component, OnInit } from '@angular/core';
import { Caracteristique } from 'src/app/classes/caracteristique';
import { CaracteristiqueSwService } from 'src/app/services/service-workers/caracteristique-sw.service';
import { DeferredQueriesService } from 'src/app/services/deferred-queries.service';
import { Unite } from 'src/app/classes/unite';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  caracteristiques: Caracteristique[];

  newCaracteristique: string;

  currentCaracteristique: Caracteristique = undefined;//Caracteristique.newEmpty();
  selectedListIndex: number;

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
    const newCaracteristique = { description: this.newCaracteristique, value: 1, uniteId: 1 } as Caracteristique;
    this.caracteristiqueSw.add(newCaracteristique).then((addedCaracteristique) => {
      this.caracteristiques.push(addedCaracteristique);
      this.newCaracteristique = '';
    });
  }

  deleteCaracteristique() {
    this.caracteristiqueSw.delete(this.currentCaracteristique.id).then(() => {
      this.caracteristiques.splice(this.caracteristiques.indexOf(this.currentCaracteristique), 1);
      this.currentCaracteristique = undefined;
    });
  }

  editCaracteristique() {
    this.caracteristiqueSw.edit(this.currentCaracteristique).then(() => {
      this.caracteristiques[this.selectedListIndex] = this.currentCaracteristique;
    });
  }

  selectCaracteristique(caracteristique: Caracteristique, index: number) {
    console.table(caracteristique);
    this.currentCaracteristique = Object.assign(Caracteristique.newEmpty(), caracteristique);
    this.selectedListIndex = index;
  }

}
