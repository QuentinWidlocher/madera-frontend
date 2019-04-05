import { Injectable } from '@angular/core';
import { Caracteristique } from 'src/app/classes/caracteristique';
import { ConnectivityService } from './connectivity.service';
import { CaracteristiqueApiService } from '../api/caracteristique-api.service';
import { IndexedDbService } from '../indexed-db.service';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CaracteristiqueSwService {

  constructor(private connectivity: ConnectivityService, private caracteristiqueApi: CaracteristiqueApiService,
              private idb: IndexedDbService) { }

  getAll(): Promise<Caracteristique[]> {

    if (this.connectivity.isConnected) {

      // Si on peux toucher l'API, on la call, on remplace la base locale par les nouvelles données
      return new Promise(rslv => {
        this.caracteristiqueApi.getAll().subscribe((caracteristiques: Caracteristique[]) => {

          console.log(caracteristiques);

          // On vide la base locale
          this.idb.caracteristiques.clear();

          // On ajoute à l'IDB les données obtenue
          caracteristiques.forEach(caracteristique => {
            this.idb.caracteristiques.add(caracteristique);
          });

          rslv(caracteristiques);
        });
      });
    } else {

      // Si on ne peux pas toucher l'API, on call simplement l'IDB
      return this.idb.caracteristiques.toArray();
    }
}


}
