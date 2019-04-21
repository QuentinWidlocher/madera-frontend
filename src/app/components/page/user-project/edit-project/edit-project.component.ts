import { Component, OnInit, Input, Output, EventEmitter, Inject, ChangeDetectorRef, ApplicationRef, OnChanges } from '@angular/core';
import { Projet } from 'src/app/classes/projet';
import { ProjetSwService } from 'src/app/services/service-workers/projet-sw.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { Client } from 'src/app/classes/client';
import { ClientSwService } from 'src/app/services/service-workers/client-sw.service';
import { Utilisateur } from 'src/app/classes/utilisateur';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.scss']
})
export class EditProjectComponent implements OnInit {

  @Input() currentProjet: Projet;
  @Output() currentProjetChange: EventEmitter<Projet> = new EventEmitter<Projet>();

  // Retourne true si une modif a été faite, false sinon
  @Output() done: EventEmitter<string> = new EventEmitter<string>();

  @Input() createMode = false;

  selectedClientId: number;
  listClient: Client[] = [];

  projetForm: FormGroup;
  get form() { return this.projetForm.controls; }

  constructor(private projetSw: ProjetSwService, 
              private dialog: MatDialog,
              private clientSw: ClientSwService,
              private fb: FormBuilder) {
  }
  
  ngOnInit() {

    if (this.createMode) {
      this.currentProjet.creationDate = new Date(Date.now());
    }
    
    if (this.currentProjet.client !== undefined) {
      this.selectedClientId = this.currentProjet.client.id;
    }
    
    this.projetForm = this.fb.group({
      title: [this.currentProjet.title, [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      version: [this.currentProjet.version],
      client: [this.selectedClientId, [Validators.required]],
      creationDate: [this.currentProjet.creationDate]
    });
    
    this.clientSw.getAll().then(clients => {
      this.listClient = clients;
    });

  }
  
  // Met à jour this.currentProjet avec les infos du form
  formToProjet() {
    this.currentProjet = Object.assign(this.currentProjet, this.projetForm.value);
    this.selectedClientId = this.form.client.value;

    this.listClient.forEach((client, index) => {
      if (client.id === +this.selectedClientId) {
        this.currentProjet.client = client;
        return;
      }
    });
  }

  exit(action = 'cancel') {

    this.formToProjet();

    action = (this.createMode && action !== 'cancel' ? 'create' : action);

    this.currentProjet.utilisateur = Object.assign(Utilisateur.newEmpty(), { id: 1 });

    switch (action) {
      case 'save':
        this.projetSw.edit(this.currentProjet);
        this.isDone(action);
        break;

      case 'create':
        this.projetSw.add(this.currentProjet).then(projet => {
          this.currentProjet = projet;
          this.isDone(action);
        }).catch(error => console.error(error));
        break;

      case 'cancel':
        this.isDone(action);
        break;
    
      default:
        break;
    }
  }

  delete() {
    this.dialog.open(DeleteConfirmationDialog, {
      data: this.currentProjet.title
    }).afterClosed().subscribe(ok => {
      if (ok) {
        this.projetSw.delete(this.currentProjet.id);
        this.isDone('delete');
      }
    });
  }

  isDone(action = 'cancel') {
    this.currentProjetChange.emit(this.currentProjet);
    this.done.emit(action);
  }

}

@Component({
  selector: 'delete-confirmation-dialog',
  templateUrl: './delete-confirmation.dialog.html'
})
export class DeleteConfirmationDialog {

  constructor(public dialogRef: MatDialogRef<DeleteConfirmationDialog>,
              @Inject(MAT_DIALOG_DATA) public projectName: string) { }

}
