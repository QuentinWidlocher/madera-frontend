import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/classes/client';
import { ClientSwService } from 'src/app/services/service-workers/client-sw.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {

  clients: Client[] = [];
  clientsOriginal : Client[] = [];
  currentClient: Client;

  clientListLoading = true;
  clientListIndex: number;

  constructor(private clientSw: ClientSwService) { 
  }

  ngOnInit() {
    this.refresh();
  }

  refresh() {
    this.currentClient = undefined;
    this.clientListLoading = true;
    this.clientSw.getAll().then(clients => {
      this.clients = clients;
      this.clientsOriginal = clients;
      this.clientListLoading = false;
    });
  }

  selectClient(client: Client, index: number) {
    this.currentClient = client;
    this.clientListIndex = index;
  }

}
