import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Utilisateur } from 'src/app/classes/utilisateur';

@Component({
  selector: 'app-create-users',
  templateUrl: './create-users.component.html',
  styleUrls: ['./create-users.component.scss']
})
export class CreateUsersComponent implements OnInit {

  utilisateurs: Utilisateur[] = [];
  currentUtilisateur: Utilisateur;

  utilisateurListLoading: boolean = true;
  utilisateurListIndex: number;

  passwordHide: boolean;

  @Output() onHamburger: EventEmitter<void> = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
  }

  selectUtilisateur(utilisateur: Utilisateur, index: number) {
    // if (this.utilisateurForm && this.utilisateurForm.dirty) {
    //   return;
    // }

    this.currentUtilisateur = utilisateur;
    this.utilisateurListIndex = index;

    // this.refreshForm();
  }

  createUtilisateur() {
    this.currentUtilisateur = Utilisateur.newEmpty();
    // this.changeEditMode(true, true);
  }

}

