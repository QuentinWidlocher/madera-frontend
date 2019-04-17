import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Projet } from 'src/app/classes/projet';
import { ProjetSwService } from 'src/app/services/service-workers/projet-sw.service';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.scss']
})
export class EditProjectComponent implements OnInit {

  @Input() @Output() currentProjet: Projet;
  projetOriginal: Projet;

  // Retourne true si une modif a été faite, false sinon
  @Output() done: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private projetSw: ProjetSwService) { 
  }
  
  ngOnInit() {
    // On crée une copie DIFFERENTE du projet, on assigne les valeurs à un NOUVEL objet
    this.projetOriginal = Object.assign(Projet.newEmpty(), this.currentProjet);
  }

  exit(save = false) {
    if (save) {
      this.projetSw.edit(this.currentProjet);
    } else {
      // On réassigne les valeurs originale à l'objet lié
      Object.assign(this.currentProjet, this.projetOriginal);
    }

    this.isDone(save);
  }

  isDone(changed = false) {
    this.done.emit(changed);
  }

}
