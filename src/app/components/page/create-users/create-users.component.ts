import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-create-users',
  templateUrl: './create-users.component.html',
  styleUrls: ['./create-users.component.scss']
})
export class CreateUsersComponent implements OnInit {

  events: string[] = [];
  opened: boolean;

  @Output() onHamburger: EventEmitter<void> = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
  }

}

