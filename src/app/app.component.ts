import { Component, OnInit } from '@angular/core';
import { IndexedDbService } from './services/indexed-db.service';
import 'hammerjs/hammer.min';
import { ConnectivityService } from './services/connectivity.service';
import { ProjetSwService } from './services/service-workers/projet-sw.service';
import { Projet } from './classes/projet';
import { ClientSwService } from './services/service-workers/client-sw.service';
import { Client } from './classes/client';
import { Observable, Subscription } from "rxjs";
import { UserService } from './services/user.service';
import { LoginComponent } from './components/page/login/login.component';
import { DevisComponent } from './components/page/devis/devis.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {


  status: boolean;
  subscription: Subscription;
  hamburgerOpened: boolean;

  // On instancie certains services au démarrage de l'appli
  constructor(private idb: IndexedDbService,
              private connectivity: ConnectivityService,
              private projets: ProjetSwService,
              private clients: ClientSwService,
              private userService: UserService) {
    // this.populate();
  }  

  ngOnInit() {
    this.subscription = this.userService.authNavStatus$.subscribe(status => this.status = status);
  }

  getComponent(component: any) {
    if (component.onHamburger) {

      if (component instanceof LoginComponent) {
        component.onHamburger.subscribe(() => this.hamburgerOpened = false);
      } else {
        component.onHamburger.subscribe(() => this.hamburgerOpened = !this.hamburgerOpened);
      }
     
    }
  }

}
