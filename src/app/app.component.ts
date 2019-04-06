import { Component } from '@angular/core';
import { IndexedDbService } from './services/indexed-db.service';
import 'hammerjs/hammer.min';
import { ConnectivityService } from './services/service-workers/connectivity.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  // On instancie certains services au démarrage de l'appli
  constructor(private idb: IndexedDbService,
              private connectivity: ConnectivityService) {}

}
