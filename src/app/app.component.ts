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
    component.onHamburger.subscribe(() => this.hamburgerOpened = !this.hamburgerOpened);
  }

  populate() {
    const clientList: Client[] = [];

    this.clients.count().then(count => {
      if (count < 15) {
        for (let i = 1; i < 15; i++) {
          this.clients.add(Object.assign(Client.newEmpty(), { 
            code: 'CLIENT' + i,
            firstName: 'Client',
            lastName: i,
            email: 'client' + i + '@test.com'
          })).then(client => clientList.push(client));
        }
      }
    }).then(() => {
      
      this.projets.count().then(count => {
        if (count < 15) {
          for (let i = 1; i < 15; i++) {
            this.projets.add(Object.assign(Projet.newEmpty(), {
              title: 'Projet ' +i,
              creationDate: new Date(Date.now()),
              editionDate: new Date(Date.now()),
              version: '1',
              client: clientList[i]
            }));
          }
        }
      });

    });


  }

}
