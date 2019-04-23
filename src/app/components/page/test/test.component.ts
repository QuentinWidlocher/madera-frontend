import { Component, OnInit } from '@angular/core';
import { Caracteristique } from 'src/app/classes/caracteristique';
import { CaracteristiqueSwService } from 'src/app/services/service-workers/caracteristique-sw.service';
import { ConnectivityService } from 'src/app/services/connectivity.service';
import { Client } from 'src/app/classes/client';
import { ClientSwService } from 'src/app/services/service-workers/client-sw.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  listClient: Client[];
  currentClient: Client = Client.newEmpty();

  constructor(private clientSw: ClientSwService) {
  }
  
  ngOnInit() {
    this.clientSw.getAll().then(clients => {
      this.listClient = clients;
    }).then(() => {
      console.log(this.listClient);
    });
  }

  addClient() {
    this.clientSw.add(this.currentClient).then(() => {
      this.listClient.push(this.currentClient);
      this.currentClient = Client.newEmpty();
    });
  }

}
