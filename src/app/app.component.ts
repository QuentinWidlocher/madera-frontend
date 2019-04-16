import { Component } from '@angular/core';
import { IndexedDbService } from './services/indexed-db.service';
import 'hammerjs/hammer.min';
import { ConnectivityService } from './services/connectivity.service';
import { DevisSwService } from './services/service-workers/DEVIS-sw.service';
import { Devis } from './classes/devis';
import { ProjetSwService } from './services/service-workers/projet-sw.service';
import { Projet } from './classes/projet';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  // On instancie certains services au démarrage de l'appli
  constructor(private idb: IndexedDbService,
              private connectivity: ConnectivityService,
              private projets: ProjetSwService) {

    projets.count().then(count => {
      if (count < 15) {
        for (let i = 1; i < 15; i++) {
          projets.add(new Projet(undefined, 'Projet ' + i, new Date(Date.now()), new Date(Date.now()), '1', undefined, undefined, undefined));
        }
      }
    })
                
  }

}
