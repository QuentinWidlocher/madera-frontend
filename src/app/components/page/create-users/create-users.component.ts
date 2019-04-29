import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Utilisateur } from 'src/app/classes/utilisateur';
import { ConnectivityService } from '../../../services/connectivity.service';
import { UtilisateurSwService } from '../../../services/service-workers/utilisateur-sw.service';
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms";

@Component({
  selector: 'app-create-users',
  templateUrl: './create-users.component.html',
  styleUrls: ['./create-users.component.scss']
})
export class CreateUsersComponent implements OnInit {

  utilisateurs: Utilisateur[] = [];
  currentUtilisateur: Utilisateur;
  userForm: FormGroup;
  isRequesting: boolean;
  submitted: boolean = false;
  errors: string;
  utilisateurListLoading: boolean = true;
  utilisateurListIndex: number;

  passwordHide: boolean;

  editMode: boolean = false;

  @Output() onHamburger: EventEmitter<void> = new EventEmitter<void>();
  get form() { return this.userForm.controls; }
  constructor(
    private utilisateurSw: UtilisateurSwService,
    private connectivity: ConnectivityService,
    private fb: FormBuilder) {
    this.createForm();
  }

  ngOnInit() {
    this.currentUtilisateur = Utilisateur.newEmpty();
    this.refresh();

    // On met à jours la liste quand on retrouve l'internet
    this.connectivity.event.subscribe(connected => {
      if (connected) {
        this.refresh();
      }
    });
    this.userForm.setValue({
      username: "",
      password: "",
      role: false
    });
  }
  createForm() {
    this.userForm = this.fb.group({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      role: new FormControl('')
    });
  }

  refresh() {
    this.utilisateurListLoading = true;
    this.utilisateurSw.getAll().then(utilisateurs => {
      this.utilisateurs = utilisateurs;
      this.utilisateurListLoading = false;

      if (this.utilisateurListIndex > 0) {
        this.currentUtilisateur = this.utilisateurs[this.utilisateurListIndex];
      }
    });
  }
  createUtilisateur() {
    this.editMode = false;
    this.userForm.setValue({
      username: "",
      password: "",
      role: false
    });

  }

  selectUtilisateur(utilisateur: Utilisateur, index: number) {
    this.editMode = true;
    this.currentUtilisateur = utilisateur;
    this.utilisateurListIndex = index;
    this.utilisateurSw.get(this.currentUtilisateur.id).then(user => {
      console.log(this.currentUtilisateur.id);
      if (user.role == "Admin") {
        this.userForm.setValue({
          username: this.currentUtilisateur.username,
          password: "",
          role: true
        });
      } else {
        this.userForm.setValue({
          username: this.currentUtilisateur.username,
          password: "",
          role: false
        });
      }
    }).catch(error => this.errors = error);
  }

  user({ value, valid }: { value: Utilisateur, valid: boolean }) {

    this.submitted = true;
    this.isRequesting = true;
    this.errors = '';
    if (valid) {
      if (value.role) {
        value.role = "Admin";
      } else {
        value.role = "User";
      }

      if (this.editMode) {
        value.id = this.currentUtilisateur.id;
        value.identityId = this.currentUtilisateur.identityId;
        this.utilisateurSw.edit(value)
          .then(user => {
            this.editMode = false;
            this.ngOnInit();
          }).catch(error => this.errors = error);
      } else {
        this.utilisateurSw.add(value)
          .then(user => {
            this.ngOnInit();
          }).catch(error => this.errors = error);

      }
    }

  }

  delete() {
    this.utilisateurSw.delete(this.currentUtilisateur.id)
      .then(user => {
        this.editMode = false;
        this.ngOnInit();
      }).catch(error => this.errors = error);
  }





}

