import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { Client } from 'src/app/classes/client';
import { ClientSwService } from 'src/app/services/service-workers/client-sw.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { ConnectivityService } from 'src/app/services/connectivity.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {
  
  @Output() onHamburger: EventEmitter<void> = new EventEmitter<void>();

  clients: Client[] = [];
  clientsOriginal : Client[] = [];
  currentClient: Client = undefined;

  clientListLoading = true;
  clientListIndex: number;
  createMode = false;
  searchTerms: string;

  clientForm: FormGroup = undefined;
  get form() { return this.clientForm.controls; }

  constructor(private clientSw: ClientSwService,
              private dialog: MatDialog,
              private fb: FormBuilder,
              private connectivity: ConnectivityService,
              private route: ActivatedRoute) { 
  }

  ngOnInit() {

    this.currentClient = undefined;
    this.refresh();

    // On met à jours la liste quand on retrouve l'internet
    this.connectivity.event.subscribe(connected => {
      if (connected && !this.clientForm.dirty) {
        this.refresh();
      }
    });
  }

  refresh() {
    this.clientListLoading = true;
    this.clientSw.getAll().then(clients => {
      this.clients = clients;
      this.clientsOriginal = clients;
      this.clientListLoading = false;

      this.route.params.subscribe(params => {
        if (params.length > 0)
        {
          this.currentClient = this.clients.find(client => client.id === +params['id']);
          this.refreshForm();
        }
      })
    });
  }

  refreshForm() {
    this.clientForm = this.fb.group({
      firstName: [this.currentClient.firstName, [Validators.required, Validators.maxLength(20)]],
      lastName: [this.currentClient.lastName, [Validators.required, Validators.maxLength(20)]],
      email: [this.currentClient.email, [Validators.email]],
      phone: [this.currentClient.phone], //[Validators.pattern(/^(?:(?:\+|00)33[\s.-]{0,3}(?:\(0\)[\s.-]{0,3})?|0)[1-9](?:(?:[\s.-]?\d{2}){4}|\d{2}(?:[\s.-]?\d{3}){2})$/g)]],
      mobile: [this.currentClient.mobile], //[Validators.pattern(/^(?:(?:\+|00)33[\s.-]{0,3}(?:\(0\)[\s.-]{0,3})?|0)[1-9](?:(?:[\s.-]?\d{2}){4}|\d{2}(?:[\s.-]?\d{3}){2})$/g)]]
    });
  }

  formToClient() {
    this.currentClient = Object.assign(this.currentClient, this.clientForm.value);
  }

  selectClient(client: Client, index: number) {
    if (this.clientForm && this.clientForm.dirty) {
      return;
    }

    this.currentClient = client;
    this.clientListIndex = index;

    this.refreshForm();
  }

  addClient() {
    this.currentClient = Client.newEmpty();
    this.createMode = true;
    this.refreshForm();
  }

  exit(action = 'cancel') {
    action = (this.createMode && action !== 'cancel' ? 'create' : action);

    switch (action) {
      case 'save':
        this.formToClient();
        this.clientSw.edit(this.currentClient).then(() => {
          this.refreshForm();
          this.createMode = false;
        });
        break;

      case 'create':
        this.formToClient();
        this.clientSw.add(this.currentClient).then(client => {
          this.currentClient = Object.assign(Client.newEmpty(), client);

          this.clients.push(this.currentClient);

          this.refreshForm();
          this.createMode = false;
        }).catch(error => console.error(error));
        break;

      case 'cancel':
      if (this.createMode) {
        this.currentClient = undefined;
      }
      this.createMode = false;
      break;
      
      default:
      break;
    }

    this.refreshForm();
  }

  delete() {
    this.dialog.open(ClientDeleteConfirmationDialog, {
      data: this.currentClient.fullName
    }).afterClosed().subscribe(ok => {
      if (ok) {
        this.clientSw.delete(this.currentClient.id).then(() => {
          this.clients = this.clients.filter(client => {
            return client !== this.currentClient;
          });
          this.clientsOriginal = this.clients;
          this.currentClient = undefined;
        });
      }
    });
  }

  filter() {
    this.clients = this.clientsOriginal.filter(x => {
      let valid = true;

      if (this.searchTerms !== '') {
        valid = valid && x.fullName.match(new RegExp(this.searchTerms, 'i')) ? true : false;
      } else {
        valid = valid && true;
      }

      return valid;
    });
  }

}


@Component({
  selector: 'delete-confirmation-dialog',
  templateUrl: './delete-confirmation.dialog.html'
})
export class ClientDeleteConfirmationDialog {

  constructor(public dialogRef: MatDialogRef<ClientDeleteConfirmationDialog>,
    @Inject(MAT_DIALOG_DATA) public clientName: string) { }

}
