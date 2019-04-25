import { Component, OnInit, OnDestroy, Inject, Output, EventEmitter } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Observable, Subscription } from "rxjs";
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit, OnDestroy {

  @Output() closed: EventEmitter<void> = new EventEmitter<void>();

  status: boolean;
  subscription: Subscription;
  userName: string;
  isAdmin: boolean
  constructor(private userService: UserService, private dialog: MatDialog,) { }

  ngOnInit() {
    this.subscription = this.userService.authNavStatus$.subscribe(status => {
      this.status = status;
      if (this.status) {
        this.userName = this.userService.getUserName();
        this.isAdmin = this.userService.getRole() === 'Admin'
      }
    });
    
    
  }

  logout() {
    this.dialog.open(LogoutConfirmationDialog, {
    }).afterClosed().subscribe(ok => {
      if (ok) {
        this.userService.logout();
      }
    });
  }

  ngOnDestroy() {
    // prevent memory leak when component is destroyed
    this.subscription.unsubscribe();
  }
}

@Component({
  selector: 'logout-confirmation-dialog',
  templateUrl: './logout-confirmation.dialog.html'
})
export class LogoutConfirmationDialog {

  constructor(public dialogRef: MatDialogRef<LogoutConfirmationDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any ) { }

}
