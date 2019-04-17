import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { Projet } from 'src/app/classes/projet';
import { ProjetSwService } from 'src/app/services/service-workers/projet-sw.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.scss']
})
export class EditProjectComponent implements OnInit {

  @Input() @Output() currentProjet: Projet;
  projetOriginal: Projet;

  // Retourne true si une modif a été faite, false sinon
  @Output() done: EventEmitter<string> = new EventEmitter<string>();

  constructor(private projetSw: ProjetSwService, private dialog: MatDialog) { 
  }
  
  ngOnInit() {
    // On crée une copie DIFFERENTE du projet, on assigne les valeurs à un NOUVEL objet
    this.projetOriginal = Object.assign(Projet.newEmpty(), this.currentProjet);
  }

  exit(action = 'cancel') {
    if (action === 'save') {
      this.projetSw.edit(this.currentProjet);
    } else {
      // On réassigne les valeurs originale à l'objet lié
      Object.assign(this.currentProjet, this.projetOriginal);
    }

    this.isDone(action);
  }

  delete() {
    this.dialog.open(DeleteConfirmationDialog, {
      data: this.projetOriginal.title
    }).afterClosed().subscribe(ok => {
      if (ok) {
        this.projetSw.delete(this.currentProjet.id);
        this.isDone('delete');
      }
    });
  }

  isDone(action = 'cancel') {
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
