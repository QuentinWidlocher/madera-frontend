import { Component, OnInit, Input } from '@angular/core';
import { Projet } from 'src/app/classes/projet';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.scss']
})
export class EditProjectComponent implements OnInit {

  @Input() currentProjet: Projet;

  constructor() { }

  ngOnInit() {
  }

}
