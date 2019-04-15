import { Component, OnInit } from '@angular/core';
import { Caracteristique } from 'src/app/classes/caracteristique';
import { CaracteristiqueSwService } from 'src/app/services/service-workers/caracteristique-sw.service';
import { ConnectivityService } from 'src/app/services/connectivity.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  caracteristiques: Caracteristique[];

  newCaracteristique: string;

  currentCaracteristique: Caracteristique = undefined;
  selectedListIndex: number;

  constructor(private caracteristiqueSw: CaracteristiqueSwService, private connectivityService: ConnectivityService) {
    connectivityService.event.subscribe(val => {
      if (val) {
        this.refreshList();
      }
    });
   }

  ngOnInit() {
    this.refreshList();
  }

  refreshList() {
    this.caracteristiques = undefined;
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
    console.log(this.currentCaracteristique.id);
    this.caracteristiqueSw.delete(this.currentCaracteristique.id).then(() => {

      // On boucle sur la liste et on supprime l'objet avec le bon ID
      this.caracteristiques.forEach((caracteristique, index) => {
        if (caracteristique.id === this.currentCaracteristique.id) {
          this.caracteristiques.splice(index, 1);
        }
      });

      // On remet à zéro l'objet en cours
      this.currentCaracteristique = undefined;
    });
  }

  editCaracteristique() {
    this.caracteristiqueSw.edit(this.currentCaracteristique).then(() => {
      this.caracteristiques[this.selectedListIndex] = this.currentCaracteristique;
    });
  }

  selectCaracteristique(caracteristique: Caracteristique, index: number) {
    this.currentCaracteristique = Object.assign(Caracteristique.newEmpty(), caracteristique);
    this.selectedListIndex = index;
  }

}
