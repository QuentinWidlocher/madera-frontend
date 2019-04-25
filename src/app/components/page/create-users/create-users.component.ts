import { Component, OnInit, EventEmitter, Output, Inject } from '@angular/core';
import { Utilisateur } from 'src/app/classes/utilisateur';
import { UtilisateurSwService } from 'src/app/services/service-workers/utilisateur-sw.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ConnectivityService } from 'src/app/services/connectivity.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';

@Component({
  selector: 'app-create-users',
  templateUrl: './create-users.component.html',
  styleUrls: ['./create-users.component.scss']
})
export class CreateUsersComponent implements OnInit {
  
  @Output() onHamburger: EventEmitter<void> = new EventEmitter<void>();

  utilisateurs: Utilisateur[] = [];
  utilisateursOriginal: Utilisateur[] = [];
  currentUtilisateur: Utilisateur;

  utilisateurListLoading: boolean = true;
  utilisateurListIndex: number;

  createMode = false;

  searchTerms: string;

  passwordHide: boolean;

  utilisateurForm: FormGroup = undefined;
  get form() { return this.utilisateurForm.controls; }
  
  constructor(private utilisateurSw: UtilisateurSwService,
              private connectivity: ConnectivityService,
              private fb: FormBuilder,
              private dialog: MatDialog) { }

  ngOnInit() {
    this.currentUtilisateur = undefined;

    this.refresh();

    // On met à jours la liste quand on retrouve l'internet
    this.connectivity.event.subscribe(connected => {
      if (connected && !this.utilisateurForm.dirty) {
        this.refresh();
      }
    });
  }

  refresh() {
    this.utilisateurListLoading = true;
    this.utilisateurSw.getAll().then(utilisateurs => {
      this.utilisateurs = utilisateurs;
      this.utilisateurListLoading = false;
    })
  }

  refreshForm() {
    this.utilisateurForm = this.fb.group({
      username: [this.currentUtilisateur.username, [Validators.required, Validators.maxLength(20)]],
      password: [this.currentUtilisateur.password, [Validators.required, Validators.maxLength(20), Validators.minLength(6)]],
      admin: [this.currentUtilisateur.role === 'Admin'],
    });
  }

  formToUtilisateur() {
    this.currentUtilisateur = Object.assign(this.currentUtilisateur, this.utilisateurForm.value);
    this.currentUtilisateur.role = this.form.admin.value ? 'Admin' : 'User';
  }

  selectUtilisateur(utilisateur: Utilisateur, index: number) {
    if (this.utilisateurForm && this.utilisateurForm.dirty) {
      return;
    }

    this.currentUtilisateur = utilisateur;
    this.utilisateurListIndex = index;

    this.refreshForm();
  }

  addUtilisateur() {
    this.currentUtilisateur = Utilisateur.newEmpty();
    this.createMode = true;
    this.refreshForm();
  }

  exit(action = 'cancel') {
  
    action = (this.createMode && action !== 'cancel' ? 'create' : action);

    switch (action) {
      case 'save':
        this.formToUtilisateur();
        this.utilisateurSw.edit(this.currentUtilisateur).then(() => {
          this.refreshForm();
          this.createMode = false;
        });
        break;

      case 'create':
        this.formToUtilisateur();
        this.utilisateurSw.add(this.currentUtilisateur).then(utilisateur => {
          this.currentUtilisateur = Object.assign(Utilisateur.newEmpty(), utilisateur);

          this.utilisateurs.push(this.currentUtilisateur);

          this.refreshForm();
          this.createMode = false;
        }).catch(error => console.error(error));
        break;

      case 'cancel':
        if (this.createMode) {
          this.currentUtilisateur = undefined;
        }
        this.createMode = false;
        break;

      default:
        break;
    }

    this.refreshForm();
  }

  delete() {
    this.dialog.open(UtilisateurDeleteConfirmationDialog, {
      data: this.currentUtilisateur.username
    }).afterClosed().subscribe(ok => {
      if (ok) {
        this.utilisateurSw.delete(this.currentUtilisateur.id).then(() => {
          this.utilisateurs = this.utilisateurs.filter(utilisateur => {
            return utilisateur !== this.currentUtilisateur;
          });
          this.utilisateursOriginal = this.utilisateurs;
          this.currentUtilisateur = undefined;
        });
      }
    });
  }

  filter() {
    this.utilisateurs = this.utilisateursOriginal.filter(x => {
      let valid = true;

      if (this.searchTerms !== '') {
        valid = valid && x.username.match(new RegExp(this.searchTerms, 'i')) ? true : false;
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
export class UtilisateurDeleteConfirmationDialog {

  constructor(public dialogRef: MatDialogRef<UtilisateurDeleteConfirmationDialog>,
    @Inject(MAT_DIALOG_DATA) public utilisateurName: string) { }

}


